"use client";

import React from "react";

export default function AppMockup() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.1)] border border-bg-border bg-surface">
      {/* Browser Chrome */}
      <div className="bg-surface border-b border-bg-border px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-danger/20" />
          <div className="w-3 h-3 rounded-full bg-warning/20" />
          <div className="w-3 h-3 rounded-full bg-success/20" />
        </div>
        <div className="flex-1 max-w-md mx-auto h-7 bg-base rounded-lg border border-bg-border flex items-center px-3 text-[10px] text-text-muted font-medium">
          resume-ai-ten-gamma.vercel.app/review/8d2f...
        </div>
      </div>

      {/* App Content Mock */}
      <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-10 items-center">
        {/* Left: Score */}
        <div className="shrink-0 relative">
          <svg width="180" height="180" viewBox="0 0 120 120" className="-rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
            <circle 
              cx="60" cy="60" r="54" fill="none" 
              stroke="#22c55e" strokeWidth="10" 
              strokeDasharray="339.3" strokeDashoffset="44.1" 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-success">87</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-text-muted mt-1">Percent</span>
          </div>
        </div>

        {/* Right: Section Scores */}
        <div className="flex-1 w-full space-y-4">
          {[
            { label: "Professional Summary", score: 82, color: "bg-success" },
            { label: "Work Experience", score: 88, color: "bg-success" },
            { label: "Skills & Expertise", score: 79, color: "bg-warning" }
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-bg-border bg-base/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-text-primary">{s.label}</span>
                <span className="text-xs font-black text-text-primary">{s.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-base rounded-full overflow-hidden">
                <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Mock */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-bg-border to-transparent" />
      <div className="p-6 bg-surface/50 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent animate-pulse">
          Claude AI Analysis Complete ✦
        </p>
      </div>
    </div>
  );
}
