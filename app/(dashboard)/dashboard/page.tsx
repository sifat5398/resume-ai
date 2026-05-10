import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReviewHistory from "@/components/ReviewHistory";
import { Activity, Star, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect("/login");
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

  const totalReviews = reviews.length;
  const avgScore = totalReviews > 0 
    ? Math.round(reviews.reduce((acc, r) => acc + r.score, 0) / totalReviews)
    : 0;
  const bestScore = totalReviews > 0 
    ? Math.max(...reviews.map(r => r.score))
    : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex items-center gap-6">
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={session.user.image} 
              alt={session.user.name || "User"} 
              className="h-20 w-20 rounded-3xl border-2 border-bg-border shadow-2xl"
            />
          ) : (
            <div className="h-20 w-20 rounded-3xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-black text-accent">
                {session.user.name?.[0] || session.user.email?.[0] || "U"}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-black text-text-primary tracking-tight">
              {greeting}, {session.user.name?.split(" ")[0] || "User"}
            </h1>
            <p className="text-text-muted font-medium mt-1">You've performed {totalReviews} resume audits so far.</p>
          </div>
        </div>

        <Link
          href="/upload"
          className="flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-bold text-white hover:brightness-110 shadow-xl shadow-accent/20 active:scale-95 transition-all"
        >
          <Plus className="h-5 w-5" />
          New Audit
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid gap-6 sm:grid-cols-3 mb-16">
        {[
          { label: "Total Reviews", value: totalReviews, icon: FileText, color: "text-accent", border: "border-t-accent" },
          { label: "Average Score", value: avgScore || "-", icon: Activity, color: "text-warning", border: "border-t-warning" },
          { label: "Personal Best", value: bestScore || "-", icon: Star, color: "text-success", border: "border-t-success" }
        ].map((s, i) => (
          <div key={i} className={cn("rounded-3xl border border-bg-border bg-surface p-8 shadow-xl transition-all hover:-translate-y-1 border-t-4", s.border)}>
            <div className="flex items-center justify-between mb-6">
              <div className={cn("h-10 w-10 rounded-xl bg-base flex items-center justify-center border border-bg-border", s.color)}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-2">{s.label}</p>
              <p className="text-4xl font-black text-text-primary tabular-nums tracking-tighter">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted px-1">Recent History</h2>
      </div>
      
      <div className="rounded-3xl border border-bg-border bg-surface overflow-hidden shadow-2xl">
        <ReviewHistory reviews={reviews} />
      </div>
    </div>
  );
}
