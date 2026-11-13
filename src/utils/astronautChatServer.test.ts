import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ASTRONAUT_MODEL_ID,
  AstronautGeminiClient,
  processAstronautChatRequest,
} from './astronautChatServer';

test('processAstronautChatRequest returns 503 when GEMINI_API_KEY is missing', async () => {
  let called = false;
  const client: AstronautGeminiClient = {
    async generateReply() {
      called = true;
      return 'Should not be called';
    },
  };

  const result = await processAstronautChatRequest(
    {
      body: { messages: [{ role: 'user', text: 'Why leave the buggies?' }], readingMode: 'junior' },
      apiKey: undefined,
    },
    client
  );

  assert.equal(called, false);
  assert.equal(result.status, 503);
  assert.ok('error' in result.payload);
});

test('processAstronautChatRequest returns 400 for empty or invalid chat history', async () => {
  const result = await processAstronautChatRequest({
    body: { messages: [{ role: 'model', text: 'Greeting only' }], readingMode: 'all' },
    apiKey: 'secret-test-key',
  });

  assert.equal(result.status, 400);
  assert.ok('error' in result.payload);
});

test('processAstronautChatRequest calls Gemini with sanitized history and trims reply', async () => {
  let capturedModel = '';
  let capturedApiKey = '';
  let capturedInstruction = '';
  let capturedMessage = '';
  let capturedHistoryLen = -1;

  const mockClient: AstronautGeminiClient = {
    async generateReply(params) {
      capturedModel = params.model;
      capturedApiKey = params.apiKey;
      capturedInstruction = params.systemInstruction;
      capturedMessage = params.latestUserMessage;
      capturedHistoryLen = params.history.length;
      return '  Hello from lunar orbit!  ';
    },
  };

  const result = await processAstronautChatRequest(
    {
      body: {
        readingMode: 'junior',
        messages: [
          { role: 'model', text: 'Initial orbital greeting' },
          { role: 'user', text: 'How fast was LRV-003?' },
          { role: 'model', text: 'About 18 km/h!' },
          { role: 'user', text: 'And why wire tires?' },
        ],
      },
      apiKey: 'secret-test-key',
    },
    mockClient
  );

  assert.equal(result.status, 200);
  assert.deepEqual(result.payload, { reply: 'Hello from lunar orbit!' });
  assert.equal(capturedModel, ASTRONAUT_MODEL_ID);
  assert.equal(capturedApiKey, 'secret-test-key');
  assert.ok(capturedInstruction.includes('ages 7–11'));
  assert.equal(capturedHistoryLen, 2);
  assert.equal(capturedMessage, 'And why wire tires?');
});

test('processAstronautChatRequest does not leak API key when Gemini fails', async () => {
  const secret = 'AIzaSyFakeSecretNeverLeak12345';
  const originalConsoleError = console.error;
  console.error = () => undefined;

  try {
    const failingClient: AstronautGeminiClient = {
      async generateReply() {
        throw new Error(`Upstream failure with key ${secret}`);
      },
    };

    const result = await processAstronautChatRequest(
      {
        body: {
          messages: [{ role: 'user', text: 'Tell me about Voyager 1' }],
        },
        apiKey: secret,
      },
      failingClient
    );

    assert.equal(result.status, 500);
    assert.ok('error' in result.payload);
    assert.equal(JSON.stringify(result.payload).includes(secret), false);
  } finally {
    console.error = originalConsoleError;
  }
});
