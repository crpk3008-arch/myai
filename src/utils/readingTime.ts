export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Estimates reading time in whole minutes for technical/archival prose.
 * Uses 180 words per minute (technical editorial pace) with a minimum of 1 minute
 * whenever text is non-empty.
 */
export function estimateReadingTimeMinutes(text: string, wordsPerMinute: number = 180): number {
  const words = countWords(text);
  if (words === 0) return 0;
  const safeWpm = wordsPerMinute > 0 ? wordsPerMinute : 180;
  return Math.max(1, Math.ceil(words / safeWpm));
}

export function formatReadingTime(minutes: number): string {
  const clamped = Math.max(1, Math.round(minutes));
  return `${clamped} min read`;
}
