import Hero from "@/components/Hero";
import Link from "next/link";
import { CheckCircle2, Shield, Target, Zap, FileText, Search, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-32 bg-surface relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text-primary sm:text-5xl mb-6">Everything you need to succeed</h2>
            <p className="mx-auto max-w-2xl text-xl text-text-muted">Our AI analyzes every aspect of your resume to ensure it stands out to both humans and machines.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "ATS Optimization",
                desc: "Discover missing keywords and optimize your resume to pass through Applicant Tracking Systems with ease.",
                color: "accent"
              },
              {
                icon: Sparkles,
                title: "Instant AI Feedback",
                desc: "Get actionable, high-level feedback in seconds. No more waiting days for human reviews or expensive coaches.",
                color: "purple-500"
              },
              {
                icon: Target,
                title: "Expert Scoring",
                desc: "Understand exactly where you stand with our industry-standard scoring system for each core resume section.",
                color: "success"
              }
            ].map((f, i) => (
              <div key={i} className="group rounded-3xl border border-bg-border bg-base p-10 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-surface border border-bg-border mb-8 group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">{f.title}</h3>
                <p className="text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 bg-base relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text-primary sm:text-5xl mb-6">How it works</h2>
            <p className="mx-auto max-w-2xl text-xl text-text-muted">Three simple steps to a world-class resume.</p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 relative">
            {/* Dashed connector line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px border-t border-dashed border-bg-border z-0" />
            
            {[
              { step: "1", title: "Upload Resume", desc: "Upload your PDF or paste your resume text securely into our platform." },
              { step: "2", title: "AI Analysis", desc: "Claude-3-Sonnet performs a deep audit of your formatting and experience." },
              { step: "3", title: "Get Results", desc: "Review your comprehensive score and apply targeted improvements immediately." }
            ].map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center z-10 group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface border border-bg-border text-2xl font-bold text-text-primary mb-8 group-hover:border-accent group-hover:text-accent transition-all duration-300 shadow-xl shadow-black/50">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">{s.title}</h3>
                <p className="text-text-muted max-w-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bg-border bg-base py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-accent fill-accent" />
              <span className="text-xl font-bold text-text-primary tracking-tight">Resume<span className="text-accent">AI</span></span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-text-muted">
              <Link href="#" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-text-primary transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-text-muted">© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
