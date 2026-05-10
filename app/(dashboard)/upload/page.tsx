"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { FileUp, Type, AlertCircle, ArrowRight, Loader2, Check } from "lucide-react";
import UploadBox from "@/components/UploadBox";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = ["Reading resume...", "Analyzing sections...", "Generating feedback...", "Finalizing results..."];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((s) => (s + 1) % steps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = async (resumeText: string, file?: string | null) => {
    if (resumeText.length < 100) {
      setError("Resume text is too short. Please provide at least 100 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          resumeText,
          fileName: file ?? undefined
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      router.push(`/review/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl w-full px-6 py-20 animate-fade-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-4">Analyze Your Resume</h1>
        <p className="text-text-muted text-lg">Choose a method to start your AI-powered review.</p>
      </div>

      <div className="bg-surface border border-bg-border rounded-[32px] overflow-hidden shadow-2xl relative">
        <Tabs.Root defaultValue="upload" className="flex flex-col w-full">
          <Tabs.List className="flex p-2 bg-base/50 gap-1" aria-label="Upload method">
            <Tabs.Trigger
              value="upload"
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold rounded-2xl transition-all outline-none",
                "text-text-muted hover:text-text-primary",
                "data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-lg shadow-accent/20"
              )}
            >
              <FileUp className="h-4 w-4" />
              Upload PDF
            </Tabs.Trigger>
            <Tabs.Trigger
              value="paste"
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold rounded-2xl transition-all outline-none",
                "text-text-muted hover:text-text-primary",
                "data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-lg shadow-accent/20"
              )}
            >
              <Type className="h-4 w-4" />
              Paste Text
            </Tabs.Trigger>
          </Tabs.List>

          <div className="p-8">
            <Tabs.Content value="upload" className="outline-none animate-fade-up">
              <UploadBox 
                onFileAccepted={(extractedText, name) => {
                  setText(extractedText);
                  setFileName(name);
                }} 
              />
              
              {fileName && (
                <div className="mt-6 flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-xl animate-fade-up">
                  <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">{fileName}</p>
                    <p className="text-xs text-success font-medium">Ready for analysis</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleSubmit(text, fileName)}
                disabled={!text || loading}
                className="w-full mt-8 group flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-lg font-bold text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-accent/20 active:scale-[0.98]"
              >
                Start Analysis
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Tabs.Content>

            <Tabs.Content value="paste" className="outline-none space-y-4 animate-fade-up">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your professional experience here..."
                  className="w-full h-[320px] rounded-2xl border border-bg-border bg-base/50 p-6 text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none outline-none transition-all font-sans text-base leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 bg-surface/80 backdrop-blur border border-bg-border rounded-full shadow-sm">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", text.length >= 100 ? "text-success" : "text-text-muted")}>
                    {text.length} chars
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSubmit(text, null)}
                disabled={text.length < 100 || loading}
                className="w-full group flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-lg font-bold text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-accent/20 active:scale-[0.98]"
              >
                Start Analysis
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Tabs.Content>
          </div>
        </Tabs.Root>

        {error && (
          <div className="px-8 pb-8 animate-fade-up">
            <div className="flex items-start gap-3 rounded-2xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger font-medium">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-base/90 backdrop-blur-md">
          <div className="flex flex-col items-center gap-8 text-center max-w-xs animate-fade-up">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 rounded-full border-4 border-accent/10" />
              <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">Analyzing Resume</h3>
              <p className="text-accent font-bold tracking-tight animate-pulse uppercase text-xs">{steps[loadingStep]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
