import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import type { ReviewSections } from "@/types/review";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) {
    return Response.json({ error: "Review not found" }, { status: 404 });
  }

  if (review.userId !== session.user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const responseData = {
    id: review.id,
    userId: review.userId,
    fileName: review.fileName,
    rawText: review.rawText,
    score: review.score,
    sections: review.sections as unknown as ReviewSections,
    strengths: review.strengths as unknown as string[],
    improvements: review.improvements as unknown as string[],
    atsKeywords: review.atsKeywords as unknown as string[],
    createdAt: review.createdAt,
  };

  return Response.json(responseData);
}
