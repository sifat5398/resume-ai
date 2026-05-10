import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { analyzeResume } from "@/lib/ai";
import { z } from "zod";
import type { NextRequest } from "next/server";

const schema = z.object({
  resumeText: z.string().min(100).max(15000),
  fileName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { resumeText, fileName } = parsed.data;
  const userId = session.user.id;

  // Rate limit: max 5 reviews per hour per user
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentCount = await prisma.review.count({
    where: {
      userId,
      createdAt: { gte: oneHourAgo },
    },
  });

  if (recentCount >= 5) {
    return Response.json(
      { error: "Rate limit exceeded. You can submit up to 5 reviews per hour." },
      { status: 429 }
    );
  }

  let aiResult;
  try {
    aiResult = await analyzeResume(resumeText);
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI analysis failed";
    return Response.json({ error: message }, { status: 500 });
  }

  const review = await prisma.review.create({
    data: {
      userId,
      fileName: fileName ?? null,
      rawText: resumeText,
      score: aiResult.score,
      sections: aiResult.sections as any,
      strengths: aiResult.strengths as any,
      improvements: aiResult.improvements as any,
      atsKeywords: aiResult.ats_keywords as any,
    },
  });

  const responseData = {
    id: review.id,
    userId: review.userId,
    fileName: review.fileName,
    score: review.score,
    sections: aiResult.sections,
    strengths: aiResult.strengths,
    improvements: aiResult.improvements,
    atsKeywords: aiResult.ats_keywords,
    createdAt: review.createdAt,
  };

  return Response.json(responseData, { status: 201 });
}
