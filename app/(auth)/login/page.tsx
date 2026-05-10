"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Zap } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
  </svg>
);

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("email", { email, redirect: false });
      setSent(true);
    } catch (error) {
      console.error("Email sign in error", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 bg-base overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full gradient-mesh opacity-50" />
      
      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="mb-10 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-surface border border-bg-border mb-6 shadow-2xl">
            <Zap className="h-8 w-8 text-accent fill-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">ResumeAI</h1>
          <p className="mt-2 text-text-muted">Sign in to your account</p>
        </div>

        <div className="rounded-3xl border border-bg-border bg-surface/50 p-8 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-4 py-4 font-bold text-gray-900 hover:bg-gray-100 active:scale-[0.98] transition-all"
          >
            <GithubIcon className="h-5 w-5" />
            Continue with GitHub
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-bg-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-text-muted">
              <span className="bg-surface px-4">or</span>
            </div>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-success/20 bg-success/5 p-6 text-center animate-fade-up">
              <CheckCircle2 className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-lg font-bold text-text-primary mb-2">Check your email</h3>
              <p className="text-sm text-text-muted">We sent a magic link to <br/><span className="text-text-primary font-medium">{email}</span></p>
            </div>
          ) : (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2 ml-1">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-text-muted" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="block w-full rounded-2xl border border-bg-border bg-base/50 pl-12 pr-4 py-4 text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !email}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-4 font-bold text-white hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Send Magic Link
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
        
        <p className="mt-8 text-center text-sm text-text-muted">
          No account needed. Just sign in to start.
        </p>
      </div>
    </div>
  );
}
