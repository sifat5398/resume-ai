import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeAI — Instant AI Resume Review & ATS Score",
  description: "Get your resume reviewed by AI in 30 seconds. ResumeAI analyzes your resume section-by-section, gives you an ATS score, highlights strengths, and tells you exactly what to improve — free to use.",
  keywords: ["resume review", "ATS score", "AI resume checker", "resume feedback", "job application", "resume analyzer"],
  openGraph: {
    title: "ResumeAI — Instant AI Resume Review & ATS Score",
    description: "Get your resume reviewed by AI in 30 seconds. ResumeAI analyzes your resume section-by-section, gives you an ATS score, highlights strengths, and tells you exactly what to improve — free to use.",
    url: "https://resume-ai-ten-gamma.vercel.app",
    siteName: "ResumeAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAI — Instant AI Resume Review & ATS Score",
    description: "Get your resume reviewed by AI in 30 seconds. ResumeAI analyzes your resume section-by-section, gives you an ATS score, highlights strengths, and tells you exactly what to improve — free to use.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-950 text-gray-100 antialiased selection:bg-indigo-500/30 flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
