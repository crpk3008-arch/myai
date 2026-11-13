import { processAstronautChatRequest } from '../../src/utils/astronautChatServer.ts';

interface PagesEnv {
  GEMINI_API_KEY?: string;
}

interface PagesRequestContext {
  request: Request;
  env: PagesEnv;
}

const JSON_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

export async function onRequestPost(context: PagesRequestContext): Promise<Response> {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return new Response(
      JSON.stringify({
        error: 'Invalid mission transmission format. Please try sending your question again.',
      }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  const result = await processAstronautChatRequest({
    body,
    apiKey: context.env.GEMINI_API_KEY,
  });

  return new Response(JSON.stringify(result.payload), {
    status: result.status,
    headers: JSON_HEADERS,
  });
}
