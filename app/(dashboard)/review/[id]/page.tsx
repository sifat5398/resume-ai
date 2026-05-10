"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Plus, FileText, Check, LayoutDashboard, Share2 } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";
import FeedbackSection from "@/components/FeedbackSection";
import { ReviewPageSkeleton } from "@/components/LoadingSkeleton";
import type { ReviewRecord } from "@/types/review";
import { format } from "date-fns";

export default function ReviewResultPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  
  const params = useParams();
  const id = params.id as string;

  const [review, setReview] = useState<ReviewRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id || status !== "authenticated") return;

    fetch(`/api/review/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Review not found or access denied");
        return res.json();
      })
      .then((data) => {
        setReview(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, status]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-6xl w-full px-6 py-20">
        <ReviewPageSkeleton />
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6">
        <div className="h-20 w-20 rounded-3xl bg-danger/10 border border-danger/20 flex items-center justify-center mb-6">
          <FileText className="h-10 w-10 text-danger" />
        </div>
        <h2 className="text-2xl font-black text-text-primary mb-3">Audit Not Found</h2>
        <p className="text-text-muted mb-10 max-w-sm mx-auto">{error || "This review doesn't exist or you don't have permission to view it."}</p>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-2xl bg-surface border border-bg-border px-8 py-4 text-sm font-bold text-text-primary hover:bg-bg-border transition-all shadow-xl"
        >
          <LayoutDashboard className="h-4 w-4" />
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl w-full px-6 py-20 animate-fade-up">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
        <div className="shrink-0 w-full lg:w-auto flex justify-center lg:block">
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-full group-hover:bg-accent/30 transition-all duration-500" />
            <div className="relative rounded-[40px] bg-surface border border-bg-border p-10 shadow-2xl backdrop-blur-xl">
              <ScoreCard score={review.score} size={140} />
            </div>
          </div>
        </div>
        
        <div className="flex-1 text-center lg:text-left pt-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-bg-border bg-surface px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-text-muted mb-8 shadow-sm">
            <FileText className="h-3.5 w-3.5 text-accent" />
            {review.fileName || "Manual Text Analysis"}
            <span className="text-bg-border">•</span>
            {format(new Date(review.createdAt), "MMM d, yyyy")}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tighter mb-6 leading-[1.1]">
            {review.score >= 80 
              ? "Your resume is in the top tier." 
              : review.score >= 60 
              ? "Solid foundation, but needs polish." 
              : "Let's focus on critical improvements."}
          </h1>
          
          <p className="text-text-muted text-xl font-medium mb-10 max-w-2xl leading-relaxed">
            Claude-3 has analyzed your professional profile against industry standards. 
            Review the breakdown below to optimize for ATS and recruiters.
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              href="/upload"
              className="flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-bold text-white hover:brightness-110 shadow-xl shadow-accent/20 active:scale-[0.98] transition-all"
            >
              <Plus className="h-5 w-5" />
              Perform New Audit
            </Link>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 rounded-2xl border border-bg-border bg-surface px-8 py-4 text-sm font-bold text-text-primary hover:bg-bg-border active:scale-[0.98] transition-all"
            >
              {copied ? <Check className="h-5 w-5 text-success" /> : <Share2 className="h-5 w-5" />}
              {copied ? "Link Copied" : "Share Results"}
            </button>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-bg-border to-transparent mb-16" />

      {/* Feedback Section */}
      <FeedbackSection
        sections={review.sections}
        strengths={review.strengths}
        improvements={review.improvements}
        atsKeywords={review.atsKeywords}
      />
    </div>
  );
}
