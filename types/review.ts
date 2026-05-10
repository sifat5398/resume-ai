export interface SectionScore {
  score: number;
  feedback: string;
}

export interface ReviewSections {
  summary: SectionScore;
  experience: SectionScore;
  skills: SectionScore;
  education: SectionScore;
}

export interface AIReviewResult {
  score: number;
  sections: ReviewSections;
  strengths: string[];
  improvements: string[];
  ats_keywords: string[];
}

export interface ReviewRecord {
  id: string;
  userId: string;
  fileName: string | null;
  rawText: string;
  score: number;
  sections: ReviewSections;
  strengths: string[];
  improvements: string[];
  atsKeywords: string[];
  createdAt: Date;
}

export interface ReviewListItem {
  id: string;
  score: number;
  fileName: string | null;
  createdAt: Date;
}
