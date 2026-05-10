import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIReviewResult } from "@/types/review";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are a senior resume coach and ATS optimization specialist with 15+ years of experience. Analyze resumes objectively and return structured JSON feedback only. Never include markdown, explanation, or code fences in your response.`;

const JSON_SHAPE = `{
  "score": <number>,
  "sections": {
    "summary":    { "score": <0-100>, "feedback": "<2-3 actionable sentences>" },
    "experience": { "score": <0-100>, "feedback": "<2-3 actionable sentences>" },
    "skills":     { "score": <0-100>, "feedback": "<2-3 actionable sentences>" },
    "education":  { "score": <0-100>, "feedback": "<2-3 actionable sentences>" }
  },
  "strengths":    ["", "", ""],
  "improvements": ["", "", ""],
  "ats_keywords": ["","","","","","","",""]
}`;

export async function analyzeResume(resumeText: string): Promise<AIReviewResult> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const prompt = `Analyze the resume below and return ONLY a valid JSON object with this exact shape — no markdown, no code fences, no explanation:\n${JSON_SHAPE}\n\nResume:\n${resumeText}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  // Strip any accidental markdown fences
  const cleaned = raw.replace(/```(?:json)?|```/g, "").trim();

  try {
    return JSON.parse(cleaned) as AIReviewResult;
  } catch {
    throw new Error(`Failed to parse Gemini response: ${cleaned.slice(0, 200)}`);
  }
}
