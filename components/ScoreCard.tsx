"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  score: number;
  label?: string;
  size?: number;
}

export default function ScoreCard({ score, label = "Overall Score", size = 120 }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const animationRef = useRef<number | null>(null);

  const radius = 52;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start: number | null = null;
    const duration = 1500;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quartic
      setDisplayScore(Math.round(eased * score));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [score]);

  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  
  const getColors = (s: number) => {
    if (s >= 80) return { stroke: "#22c55e", text: "text-success", bg: "bg-success/10", shadow: "shadow-success/20", glow: "rgba(34, 197, 94, 0.4)" };
    if (s >= 60) return { stroke: "#f59e0b", text: "text-warning", bg: "bg-warning/10", shadow: "shadow-warning/20", glow: "rgba(245, 158, 11, 0.4)" };
    return { stroke: "#ef4444", text: "text-danger", bg: "bg-danger/10", shadow: "shadow-danger/20", glow: "rgba(239, 68, 68, 0.4)" };
  };

  const colors = getColors(score);
  const statusLabel = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-6 group animate-fade-up">
      <div className="relative">
        <svg
          viewBox="0 0 120 120"
          width={size * 1.5}
          height={size * 1.5}
          className="-rotate-90 drop-shadow-2xl"
        >
          {/* Background track */}
          <circle
            cx={60}
            cy={60}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth={strokeWidth}
          />
          {/* Animated score arc */}
          <circle
            cx={60}
            cy={60}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: `drop-shadow(0 0 12px ${colors.glow})`,
              transition: "stroke 0.5s ease",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-0.5">
            <span className={cn("text-5xl font-black tracking-tighter tabular-nums", colors.text)}>
              {displayScore}
            </span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mt-1">Percent</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[0.15em] text-text-muted mb-1">{label}</p>
        <div className={cn("px-4 py-1.5 rounded-full text-sm font-bold shadow-lg", colors.bg, colors.text, colors.shadow)}>
          {statusLabel}
        </div>
      </div>
    </div>
  );
}
