import { extractTextFromPDF } from "@/lib/pdf";
import { z } from "zod";
import type { NextRequest } from "next/server";

const schema = z.object({
  base64: z.string().min(1),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Missing base64 field" }, { status: 422 });
  }

  try {
    const buffer = Buffer.from(parsed.data.base64, "base64");
    const text = await extractTextFromPDF(buffer);
    return Response.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PDF extraction failed";
    return Response.json({ error: message }, { status: 422 });
  }
}
