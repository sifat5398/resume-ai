"use client";

import Link from "next/link";
import { Eye, FileText, ChevronRight, Plus } from "lucide-react";
import type { ReviewListItem } from "@/types/review";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface ReviewHistoryProps {
  reviews: ReviewListItem[];
}

export default function ReviewHistory({ reviews }: ReviewHistoryProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto h-20 w-20 rounded-3xl bg-surface border border-bg-border flex items-center justify-center mb-6 shadow-xl">
          <FileText className="h-10 w-10 text-text-muted" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">No audits yet</h3>
        <p className="text-text-muted mb-8 max-w-xs mx-auto">Upload your first resume to get an AI-powered breakdown of your skills.</p>
        <Link
          href="/upload"
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-bold text-white hover:brightness-110 shadow-xl shadow-accent/20 transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Perform First Audit
        </Link>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success bg-success/10 border-success/20";
    if (score >= 60) return "text-warning bg-warning/10 border-warning/20";
    return "text-danger bg-danger/5 border-danger/10";
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-bg-border bg-surface/50">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Document</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted text-center">Score</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Timestamp</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-border">
            {reviews.map((review) => (
              <tr 
                key={review.id} 
                className="group hover:bg-surface transition-colors cursor-pointer"
                onClick={() => window.location.href = `/review/${review.id}`}
              >
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-base border border-bg-border flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
                      <FileText className="h-5 w-5 text-text-muted group-hover:text-accent transition-colors" />
                    </div>
                    <span className="font-bold text-text-primary truncate max-w-[200px]">
                      {review.fileName ?? "Manual Input Analysis"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex justify-center">
                    <div className={cn("px-3 py-1 rounded-full text-xs font-black tabular-nums border", getScoreColor(review.score))}>
                      {review.score}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-sm font-medium text-text-muted">
                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-text-muted group-hover:text-accent group-hover:bg-accent/10 transition-all">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
