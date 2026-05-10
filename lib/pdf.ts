/**
 * Server-side PDF text extraction using pdf-parse.
 * This file must NEVER be imported from client components.
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import to ensure this stays server-side
  const pdfParseModule = await import("pdf-parse");
  const pdfParse = (pdfParseModule as any).default || pdfParseModule;
  const data = await (pdfParse as any)(buffer);
  const text = data.text.trim();
  if (!text || text.length < 50) {
    throw new Error(
      "Could not extract readable text from the PDF. Please try a text-based PDF or paste your resume text directly."
    );
  }
  return text;
}
