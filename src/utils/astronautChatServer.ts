import { GoogleGenAI } from '@google/genai';
import {
  ExplorerReadingMode,
  buildAstronautSystemInstruction,
  extractLatestUserTurnAndPriorHistory,
  sanitizeChatHistory,
} from './astronautChat.ts';

export const ASTRONAUT_MODEL_ID = 'gemini-4-hydrogen';

export interface AstronautChatRequestBody {
  messages?: unknown;
  readingMode?: unknown;
}

export interface AstronautChatResult {
  status: number;
  payload: { reply: string } | { error: string };
}

export interface AstronautGeminiClient {
  generateReply: (params: {
    apiKey: string;
    model: string;
    history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
    systemInstruction: string;
    latestUserMessage: string;
  }) => Promise<string | undefined>;
}

const defaultGeminiClient: AstronautGeminiClient = {
  async generateReply({ apiKey, model, history, systemInstruction, latestUserMessage }) {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const chat = ai.chats.create({
      model,
      history,
      config: {
        systemInstruction,
      },
    });

    const response = await chat.sendMessage({
      message: latestUserMessage,
    });

    return response.text;
  },
};

export async function processAstronautChatRequest(
  params: {
    body: unknown;
    apiKey: string | undefined;
  },
  client: AstronautGeminiClient = defaultGeminiClient
): Promise<AstronautChatResult> {
  const apiKey = typeof params.apiKey === 'string' ? params.apiKey.trim() : '';
  if (!apiKey) {
    return {
      status: 503,
      payload: {
        error: 'Mission radio link is currently offline. Please try again shortly.',
      },
    };
  }

  const body =
    params.body && typeof params.body === 'object'
      ? (params.body as AstronautChatRequestBody)
      : {};

  const sanitized = sanitizeChatHistory(body.messages);
  const extracted = extractLatestUserTurnAndPriorHistory(sanitized);
  if (!extracted) {
    return {
      status: 400,
      payload: {
        error: 'Please enter a question for Commander Nova before transmitting.',
      },
    };
  }

  const readingMode: ExplorerReadingMode =
    body.readingMode === 'junior' || body.readingMode === 'cadet' ? body.readingMode : 'all';

  try {
    const rawReply = await client.generateReply({
      apiKey,
      model: ASTRONAUT_MODEL_ID,
      history: extracted.priorHistory,
      systemInstruction: buildAstronautSystemInstruction(readingMode),
      latestUserMessage: extracted.latestUserMessage,
    });

    const replyText = rawReply?.trim();
    if (!replyText) {
      return {
        status: 502,
        payload: {
          error: 'Static interference on the orbital radio. Please ask again!',
        },
      };
    }

    return {
      status: 200,
      payload: { reply: replyText },
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : 'Unknown transmission error';
    console.error('Astronaut chat route error:', errMessage);
    return {
      status: 500,
      payload: {
        error: 'Signal interference interrupted Commander Nova’s transmission. Try sending again.',
      },
    };
  }
}
