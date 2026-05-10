import Groq from "groq-sdk";
import type { AIReviewResult } from "@/types/review";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeResume(resumeText: string): Promise<AIReviewResult> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a senior resume coach and ATS specialist. Return structured JSON only. No markdown, no explanation, no code fences."
      },
      {
        role: "user",
        content: `Analyze this resume and return ONLY valid JSON:
{
  "score": <number>,
  "sections": {
    "summary": { "score": <0-100>, "feedback": "<2-3 sentences>" },
    "experience": { "score": <0-100>, "feedback": "<2-3 sentences>" },
    "skills": { "score": <0-100>, "feedback": "<2-3 sentences>" },
    "education": { "score": <0-100>, "feedback": "<2-3 sentences>" }
  },
  "strengths": ["str1","str2","str3"],
  "improvements": ["imp1","imp2","imp3"],
  "ats_keywords": ["kw1","kw2","kw3","kw4","kw5","kw6","kw7","kw8"]
}

Resume:
${resumeText}`
      }
    ],
    temperature: 0.3,
    max_tokens: 1024,
  });

  const raw = completion.choices[0]?.message?.content || "";
  const cleaned = raw.replace(/```(?:json)?|```/g, "").trim();

  try {
    return JSON.parse(cleaned) as AIReviewResult;
  } catch {
    throw new Error(`Failed to parse response: ${cleaned.slice(0, 200)}`);
  }
}
