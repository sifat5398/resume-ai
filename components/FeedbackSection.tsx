"use client";

import { CheckCircle2, AlertTriangle, Tag, FileText, Briefcase, GraduationCap, Target } from "lucide-react";
import type { ReviewSections } from "@/types/review";
import { cn } from "@/lib/utils";

interface FeedbackSectionProps {
  sections: ReviewSections;
  strengths: string[];
  improvements: string[];
  atsKeywords: string[];
}

const sectionInfo: Record<keyof ReviewSections, { label: string; icon: any }> = {
  summary: { label: "Professional Summary", icon: FileText },
  experience: { label: "Work Experience", icon: Briefcase },
  skills: { label: "Skills & Expertise", icon: Target },
  education: { label: "Education", icon: GraduationCap },
};

function SectionRow({
  label,
  score,
  feedback,
  icon: Icon
}: {
  label: string;
  score: number;
  feedback: string;
  icon: any;
}) {
  const isHigh = score >= 80;
  const isMid = score >= 60;
  
  const colors = isHigh 
    ? { text: "text-success", bar: "bg-success", border: "border-success/10", iconBg: "bg-success/5" }
    : isMid
    ? { text: "text-warning", bar: "bg-warning", border: "border-warning/10", iconBg: "bg-warning/5" }
    : { text: "text-danger", bar: "bg-danger", border: "border-danger/10", iconBg: "bg-danger/5" };

  return (
    <div className="rounded-2xl border border-bg-border bg-surface p-6 hover:border-accent/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border border-bg-border", colors.iconBg)}>
            <Icon className={cn("h-5 w-5", colors.text)} />
          </div>
          <h3 className="font-bold text-text-primary">{label}</h3>
        </div>
        <span className={cn("text-lg font-black tabular-nums", colors.text)}>{score}%</span>
      </div>
      
      {/* Animated progress bar */}
      <div className="h-2 w-full rounded-full bg-base mb-4 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.1)]", colors.bar)}
          style={{ width: `${score}%` }}
        />
      </div>
      
      <p className="text-sm text-text-muted leading-relaxed font-medium">{feedback}</p>
    </div>
  );
}

export default function FeedbackSection({
  sections,
  strengths,
  improvements,
  atsKeywords,
}: FeedbackSectionProps) {
  return (
    <div className="space-y-12 animate-fade-up [animation-delay:200ms]">
      {/* Section scores */}
      <div>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-6 px-1">Section Breakdown</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(Object.keys(sectionInfo) as (keyof ReviewSections)[]).map((key) => (
            <SectionRow
              key={key}
              label={sectionInfo[key].label}
              icon={sectionInfo[key].icon}
              score={sections[key].score}
              feedback={sections[key].feedback}
            />
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-3xl border-l-4 border-l-success border border-bg-border bg-surface p-8 shadow-xl">
          <h2 className="flex items-center gap-3 text-lg font-bold text-text-primary mb-6">
            <CheckCircle2 className="h-6 w-6 text-success" />
            Key Strengths
          </h2>
          <ul className="space-y-4">
            {strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-medium leading-relaxed">
                <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-success" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="rounded-3xl border-l-4 border-l-warning border border-bg-border bg-surface p-8 shadow-xl">
          <h2 className="flex items-center gap-3 text-lg font-bold text-text-primary mb-6">
            <AlertTriangle className="h-6 w-6 text-warning" />
            Room for Growth
          </h2>
          <ul className="space-y-4">
            {improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-medium leading-relaxed">
                <div className="h-5 w-5 rounded-full bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ATS Keywords */}
      <div className="rounded-3xl border border-bg-border bg-surface p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h2 className="flex items-center gap-3 text-lg font-bold text-text-primary">
            <Tag className="h-6 w-6 text-accent" />
            ATS Keyword Strategy
          </h2>
          <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-widest text-accent">
            {atsKeywords.length} suggested
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          {atsKeywords.map((kw, i) => (
            <span
              key={i}
              className="rounded-xl border border-bg-border bg-base px-4 py-2 text-sm font-bold text-text-primary hover:border-accent/50 hover:bg-surface transition-all cursor-default"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
