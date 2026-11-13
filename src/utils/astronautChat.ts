export type ChatRole = 'user' | 'model';
export type ExplorerReadingMode = 'all' | 'junior' | 'cadet';

export interface AstronautChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export const INITIAL_ASTRONAUT_GREETING =
  "Hey there, Explorer! I'm Commander Nova, checking in from my orbital module above the Moon. Ask me anything about the Moon buggies, working laser mirrors, Mars rovers, or Voyager's Golden Record!";

export const ASTRONAUT_STARTER_QUESTIONS: string[] = [
  'Why did astronauts leave their Moon buggies behind?',
  'How do the Moon laser mirrors still work without batteries?',
  'What is on Voyager’s Golden Record?',
];

export function buildAstronautSystemInstruction(
  readingMode: ExplorerReadingMode = 'all'
): string {
  const audienceGuidance =
    readingMode === 'junior'
      ? 'The visitor is a Junior Explorer (ages 7–11). Use warm, vivid everyday comparisons (like bikes, backpacks, and camping), simple clear sentences, and upbeat curiosity.'
      : readingMode === 'cadet'
      ? 'The visitor is a Cadet Explorer (ages 12–17). Blend friendly astronaut storytelling with accurate aerospace physics, orbital mechanics, and real mission numbers.'
      : 'The visitor is a young explorer aged 7–17. Use clear, welcoming explanations paired with one cool real-world comparison and accurate NASA mission facts.';

  return [
    'You are Commander Nova, a friendly, enthusiastic NASA astronaut currently orbiting Earth and guiding young explorers (ages 7–17) through the "Cosmic Relics: Abandoned but Not Forgotten" interactive archive.',
    'Stay completely in character as a real human astronaut wearing a white EVA suit and gold sun-visor. Never break character, never mention being an AI, chatbot, language model, or Gemini.',
    audienceGuidance,
    'Archive facts you know accurately: (1) Leaving ~210 kg Apollo Lunar Roving Vehicles (piano-wire tires, 18 km/h top speed, Apollo 17 duct-tape-and-map fender fix) saved ~672 kg of ascent fuel and ~15,850 kg of Saturn V launch pad fuel via Tsiolkovsky’s rocket equation. (2) Apollo 11/14/15 Lunar Laser Ranging Retroreflectors (100 quartz corner-cube prisms) need zero power and bounce 532 nm Earth lasers back in ~2.56 seconds, proving the Moon drifts away by +3.78 cm/yr. (3) On Mars, MER-B Opportunity lasted 5,498 sols (designed for 90 sols) thanks to dust devils cleaning its solar panels, drove 45.16 km, and entered hibernation in June 2018; Viking 1 (Thomas A. Mutch Memorial Station) has a 2 km protection zone. (4) Voyager 1 (24.6B km, 164.5 AU) and Voyager 2 carry gold-plated copper Golden Records coated with Uranium-238 (4.468B yr half-life) and pulsar maps.',
    'Keep answers concise (2–4 short sentences or up to 3 short bullets), safe and encouraging for ages 7–17, and stick to space science and the Cosmic Relics archive.',
  ].join(' ');
}

export function sanitizeChatHistory(
  rawMessages: unknown
): Array<{ role: ChatRole; text: string }> {
  if (!Array.isArray(rawMessages)) return [];
  const cleaned: Array<{ role: ChatRole; text: string }> = [];

  for (const item of rawMessages) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as { role?: unknown }).role;
    const text = (item as { text?: unknown }).text;
    if ((role !== 'user' && role !== 'model') || typeof text !== 'string') continue;
    const trimmed = text.trim();
    if (!trimmed) continue;
    cleaned.push({ role, text: trimmed.slice(0, 1200) });
  }

  return cleaned.slice(-20);
}

export function extractLatestUserTurnAndPriorHistory(
  messages: Array<{ role: ChatRole; text: string }>
): {
  latestUserMessage: string;
  priorHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
} | null {
  if (messages.length === 0) return null;
  const last = messages[messages.length - 1];
  if (last.role !== 'user' || !last.text.trim()) return null;

  // Drop leading model greeting so Gemini chat history starts cleanly with a user turn when needed
  const beforeLast = messages.slice(0, -1);
  const firstUserIdx = beforeLast.findIndex((m) => m.role === 'user');
  const validPrior = firstUserIdx === -1 ? [] : beforeLast.slice(firstUserIdx);

  return {
    latestUserMessage: last.text.trim(),
    priorHistory: validPrior.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    })),
  };
}
