import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, SendHorizontal, X } from 'lucide-react';
import { ReadingMode } from '../data/relicsData';
import {
  ASTRONAUT_STARTER_QUESTIONS,
  AstronautChatMessage,
  INITIAL_ASTRONAUT_GREETING,
} from '../utils/astronautChat';

interface AstronautChatPanelProps {
  readingMode: ReadingMode;
}

const AstronautHelmetIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="astronautVisorGold" x1="8" y1="11" x2="28" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    {/* Comms Antenna */}
    <line x1="29" y1="7" x2="29" y2="14" stroke="#22D3EE" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="29" cy="6" r="1.6" fill="#22D3EE" />
    {/* Helmet Shell */}
    <rect x="5" y="6" width="24" height="23" rx="11" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.4" />
    {/* Gold Sun Visor */}
    <rect x="8.5" y="11" width="17" height="11.5" rx="5.5" fill="url(#astronautVisorGold)" stroke="#0F172A" strokeWidth="1.4" />
    {/* Visor Glint */}
    <path d="M11.5 14.5C12.8 13.1 15 12.6 17.5 12.8" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
    {/* Suit Neck Collar */}
    <rect x="9.5" y="27" width="15" height="4" rx="2" fill="#0E1420" stroke="#22D3EE" strokeWidth="1.2" />
  </svg>
);

export const AstronautChatPanel: React.FC<AstronautChatPanelProps> = ({ readingMode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<AstronautChatMessage[]>([
    {
      id: 'init-greeting',
      role: 'model',
      text: INITIAL_ASTRONAUT_GREETING,
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSending, isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  const sendMessageToAstronaut = async (rawQuestion: string, retryExistingHistory?: AstronautChatMessage[]) => {
    const trimmed = rawQuestion.trim();
    if (!trimmed || isSending) return;

    const nextMessages: AstronautChatMessage[] = retryExistingHistory
      ? retryExistingHistory
      : [
          ...messages,
          {
            id: `user-${Date.now()}`,
            role: 'user',
            text: trimmed,
          },
        ];

    if (!retryExistingHistory) {
      setMessages(nextMessages);
      setInputValue('');
    }
    setErrorMsg(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/astronaut-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, text: m.text })),
          readingMode,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !payload.reply) {
        throw new Error(
          payload.error || 'Static on the orbital radio! Please try sending your question again.'
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `astronaut-${Date.now()}`,
          role: 'model',
          text: payload.reply!,
        },
      ]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Signal interference interrupted the orbital link. Please try again.';
      setErrorMsg(msg);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessageToAstronaut(inputValue);
  };

  const handleRetryLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    void sendMessageToAstronaut(lastUser.text, messages);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'model',
        text: INITIAL_ASTRONAUT_GREETING,
      },
    ]);
    setErrorMsg(null);
    setInputValue('');
  };

  return (
    <aside
      aria-label="Ask Astronaut Commander Nova"
      className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2 max-w-[calc(100vw-2rem)]"
    >
      {/* Expanded Multi-Turn Astronaut Comms Drawer */}
      {isOpen && (
        <div
          id="astronaut-chat-drawer"
          data-testid="astronaut-chat-panel"
          className="w-[calc(100vw-2rem)] sm:w-[400px] max-h-[72vh] flex flex-col bg-[#0B101B]/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Drawer Header */}
          <div className="px-4 py-3 border-b border-slate-800/80 bg-[#070B13] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <AstronautHelmetIcon className="w-8 h-8 shrink-0 animate-space-float" />
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-50 truncate">Commander Nova</h2>
                <p className="text-[11px] font-mono text-cyan-300 truncate">
                  Orbital Astronaut Guide · Ages 7–17
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleResetChat}
                aria-label="Start new astronaut conversation"
                title="New conversation"
                className="p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close astronaut chat"
                className="p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable Multi-Turn Message Thread */}
          <div
            data-testid="astronaut-chat-messages"
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px]"
          >
            {messages.map((msg) => {
              const isAstronaut = msg.role === 'model';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAstronaut ? 'justify-start' : 'justify-end'}`}
                >
                  {isAstronaut && (
                    <AstronautHelmetIcon className="w-6 h-6 shrink-0 mt-0.5" />
                  )}
                  <div
                    className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                      isAstronaut
                        ? 'bg-[#0E1420] border border-slate-800 text-slate-200'
                        : 'bg-cyan-400/15 border border-cyan-400/40 text-cyan-50'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Starter Prompts when conversation hasn't started yet */}
            {messages.length === 1 && !isSending && (
              <div className="pt-1 space-y-1.5">
                <p className="text-[11px] font-mono text-slate-400">
                  Quick questions to ask Commander Nova:
                </p>
                <div className="flex flex-col gap-1.5">
                  {ASTRONAUT_STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void sendMessageToAstronaut(q)}
                      className="text-left px-3 py-2 rounded-lg bg-[#070B13] hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-400/50 text-xs text-cyan-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex items-start gap-2.5 justify-start">
                <AstronautHelmetIcon className="w-6 h-6 shrink-0 mt-0.5 animate-space-float" />
                <div className="rounded-xl px-3.5 py-2.5 bg-[#0E1420] border border-slate-800 text-xs font-mono text-cyan-300">
                  Commander Nova is transmitting from orbit…
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="rounded-lg bg-rose-950/35 border border-rose-500/40 px-3 py-2.5 flex items-center justify-between gap-2 text-xs text-rose-200"
              >
                <span>{errorMsg}</span>
                <button
                  type="button"
                  onClick={handleRetryLast}
                  className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-medium whitespace-nowrap shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={threadEndRef} />
          </div>

          {/* Question Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-slate-800/80 bg-[#070B13] flex items-center gap-2 shrink-0"
          >
            <label htmlFor="astronaut-chat-input" className="sr-only">
              Ask Commander Nova a space question
            </label>
            <input
              ref={inputRef}
              id="astronaut-chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Moon buggies, Mars, Voyager…"
              disabled={isSending}
              className="flex-1 min-w-0 bg-[#0E1420] border border-slate-700/80 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={isSending || !inputValue.trim()}
              aria-label="Send question to Commander Nova"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-45 disabled:hover:bg-cyan-400 text-slate-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <SendHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              Send
            </button>
          </form>
        </div>
      )}

      {/* Compact Floating Astronaut Trigger Dock */}
      <button
        type="button"
        data-testid="astronaut-chat-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="astronaut-chat-drawer"
        className="inline-flex items-center gap-2 px-3.5 h-11 rounded-lg bg-[#0B101B]/95 backdrop-blur-md border border-cyan-500/40 hover:border-cyan-400 text-xs font-semibold text-slate-100 shadow-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
      >
        <AstronautHelmetIcon className="w-5 h-5 shrink-0 animate-space-float" />
        <span>Ask Astronaut</span>
      </button>
    </aside>
  );
};
