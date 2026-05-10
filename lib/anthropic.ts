import Anthropic from "@anthropic-ai/sdk";
import type { AIReviewResult } from "@/types/review";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeResume(text: string): Promise<AIReviewResult> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system:
      "You are a senior resume coach and ATS specialist. Return structured JSON feedback only. No markdown, no explanation, no code fences.",
    messages: [
      {
        role: "user",
        content: `Analyze the following resume and return ONLY a JSON object with this exact shape — no markdown, no code fences, no extra text:
{
  "score": <integer 0-100 overall quality>,
  "sections": {
    "summary":    { "score": <integer 0-100>, "feedback": "<string>" },
    "experience": { "score": <integer 0-100>, "feedback": "<string>" },
    "skills":     { "score": <integer 0-100>, "feedback": "<string>" },
    "education":  { "score": <integer 0-100>, "feedback": "<string>" }
  },
  "strengths":    ["<string>", "<string>", "<string>"],
  "improvements": ["<string>", "<string>", "<string>"],
  "ats_keywords": ["<string>", "<string>", "<string>", "<string>", "<string>", "<string>", "<string>", "<string>"]
}

Resume:
${text}`,
      },
    ],
  });

  const raw = message.content[0];
  if (raw.type !== "text") {
    throw new Error("Unexpected response type from Claude API");
  }

  // Strip any markdown fences if present
  const cleaned = raw.text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed: AIReviewResult;
  try {
    parsed = JSON.parse(cleaned) as AIReviewResult;
  } catch {
    throw new Error(
      `Failed to parse Claude response as JSON. Response was: ${cleaned.slice(0, 200)}`
    );
  }

  // Validate required fields
  if (
    typeof parsed.score !== "number" ||
    !parsed.sections ||
    !Array.isArray(parsed.strengths) ||
    !Array.isArray(parsed.improvements) ||
    !Array.isArray(parsed.ats_keywords)
  ) {
    throw new Error("Claude response missing required fields");
  }

  return parsed;
}
