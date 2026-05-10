"use client";

import Link from "next/link";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Premium Gradient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-accent/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] -left-[10%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          <Zap className="h-4 w-4 fill-accent" />
          <span>Powered by Claude AI ✦</span>
        </div>

        {/* Headline */}
        <h1 className="mb-8 animate-fade-up text-5xl font-bold tracking-tight text-text-primary sm:text-7xl lg:text-8xl [animation-delay:100ms]">
          Get Your Resume <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-accent via-purple-400 to-accent bg-clip-text text-transparent">
            Interview-Ready
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-12 animate-fade-up max-w-2xl text-lg text-text-muted leading-relaxed [animation-delay:200ms]">
          Upload your resume and get instant, expert-level feedback powered by
          state-of-the-art AI. Score your experience, identify missing keywords, 
          and stand out to top recruiters.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-up [animation-delay:300ms]">
          <Link
            href="/upload"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-10 py-4 text-lg font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-xl shadow-accent/20"
          >
            Analyze My Resume
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-bg-border bg-surface px-10 py-4 text-lg font-bold text-text-primary hover:bg-bg-border transition-all active:scale-95"
          >
            See How It Works
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-16 animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-text-muted [animation-delay:400ms]">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-base bg-surface flex items-center justify-center text-[10px] font-bold text-text-primary">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>500+ job seekers</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-bg-border" />
          <div className="flex items-center gap-2">
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="font-medium text-text-primary">4.9/5 satisfaction</span>
          </div>
        </div>
      </div>

      {/* Grid Pattern Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  );
}
