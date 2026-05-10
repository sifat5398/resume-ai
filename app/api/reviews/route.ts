import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reviews = await prisma.review.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      score: true,
      fileName: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(reviews);
}
