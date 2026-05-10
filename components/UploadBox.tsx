"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onFileAccepted: (text: string, fileName: string) => void;
}

export default function UploadBox({ onFileAccepted }: UploadBoxProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const file = accepted[0];
      if (!file) return;

      setError(null);
      setLoading(true);

      try {
        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
          const buffer = await file.arrayBuffer();
          const base64 = Buffer.from(buffer).toString("base64");

          const res = await fetch("/api/extract-pdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64 }),
          });

          if (!res.ok) {
            const data = (await res.json()) as { error?: string };
            throw new Error(data.error ?? "Failed to extract PDF text");
          }

          const data = (await res.json()) as { text: string };
          setFileName(file.name);
          onFileAccepted(data.text, file.name);
        } else {
          const text = await file.text();
          setFileName(file.name);
          onFileAccepted(text, file.name);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to read file");
      } finally {
        setLoading(false);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const clear = () => {
    setFileName(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-[24px] border-2 border-dashed p-12 text-center transition-all duration-300",
          isDragActive
            ? "border-accent bg-accent/5 scale-[1.02]"
            : fileName
            ? "border-success/50 bg-success/5"
            : "border-bg-border bg-base/30 hover:border-accent/40 hover:bg-accent/5"
        )}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-accent animate-spin" />
            <p className="text-sm font-bold text-text-muted animate-pulse uppercase tracking-widest">Reading File</p>
          </div>
        ) : fileName ? (
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-success/20 flex items-center justify-center">
              <Check className="h-8 w-8 text-success" />
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">{fileName}</p>
              <p className="text-sm text-success font-medium">Ready for AI review</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-surface border border-bg-border shadow-xl group-hover:border-accent transition-colors">
              <Upload className={cn("h-8 w-8 text-text-muted transition-transform", isDragActive ? "scale-125 text-accent" : "group-hover:text-accent")} />
            </div>
            <div>
              <p className="text-xl font-bold text-text-primary">
                {isDragActive ? "Release to drop" : "Drop your resume"}
              </p>
              <p className="text-sm text-text-muted mt-2 font-medium">
                PDF or TXT files up to 5MB
              </p>
              <div className="mt-4 text-xs font-bold text-accent uppercase tracking-widest hover:brightness-110 transition-all">
                Browse Files
              </div>
            </div>
          </div>
        )}
      </div>

      {fileName && !loading && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); clear(); }}
            className="text-sm font-bold text-text-muted hover:text-danger transition-colors flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Remove file
          </button>
        </div>
      )}
    </div>
  );
}
