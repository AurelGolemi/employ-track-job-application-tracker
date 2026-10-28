"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

const storageKey = "employtrack-copilot-chats";
const emptyResponseMessage =
  "The Copilot could not generate a response. Check the AI provider configuration and try again.";
const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});
const conversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(messageSchema),
});
const savedChatsSchema = z.object({
  activeChatId: z.string().nullable(),
  chats: z.array(conversationSchema),
});

const quickPrompts = [
  "Rewrite my intro for a senior product role",
  "Summarize the gaps in my resume against this JD",
  "Draft a follow-up message after the final round",
  "Suggest 3 better ways to position my portfolio",
];

function createConversation(): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "New chat",
    messages: [],
  };
}

function getErrorMessage(body: string, status: number) {
  try {
    const payload: unknown = JSON.parse(body);
    if (
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof payload.error === "string"
    ) {
      return payload.error;
    }
  } catch {
    return body.trim() || `The Copilot request failed (${status}).`;
  }
  return body.trim() || `The Copilot request failed (${status}).`;
}

function getConversationTitle(prompt: string) {
  const title = prompt.trim().replace(/\s+/g, " ");
  return title.length > 36 ? `${title.slice(0, 36).trimEnd()}…` : title;
}

export function CopilotChat() {
  const [chats, setChats] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [chatErrors, setChatErrors] = useState<Record<string, string>>({});
  const [pendingChatIds, setPendingChatIds] = useState<Set<string>>(new Set());
  const [storageError, setStorageError] = useState<string | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const controllersRef = useRef(new Map<string, AbortController>());
  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const isPending = activeChatId !== null && pendingChatIds.has(activeChatId);

  useEffect(() => {
    let restoredChats: Conversation[] = [];
    let restoredActiveChatId: string | null = null;

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = savedChatsSchema.safeParse(JSON.parse(saved));
        if (parsed.success) {
          restoredChats = parsed.data.chats;
          restoredActiveChatId = parsed.data.activeChatId;
        } else {
          setStorageError("Saved chats could not be read. A new chat was started.");
        }
      }
    } catch {
      setStorageError("Saved chats could not be loaded in this browser.");
    }

    if (restoredChats.length === 0) {
      const initialChat = createConversation();
      restoredChats = [initialChat];
      restoredActiveChatId = initialChat.id;
    } else if (!restoredChats.some((chat) => chat.id === restoredActiveChatId)) {
      restoredActiveChatId = restoredChats[0]?.id ?? null;
    }

    setChats(restoredChats);
    setActiveChatId(restoredActiveChatId);
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({ activeChatId, chats }),
        );
        setStorageError(null);
      } catch {
        setStorageError("Chats could not be saved in this browser.");
      }
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [activeChatId, chats, storageReady]);

  function startNewChat() {
    const chat = createConversation();
    setChats((current) => [chat, ...current]);
    setActiveChatId(chat.id);
    setInput("");
  }

  function selectChat(chatId: string) {
    setActiveChatId(chatId);
    setInput("");
  }

  function deleteChat(chatId: string) {
    const remainingChats = chats.filter((chat) => chat.id !== chatId);
    const deletedIndex = chats.findIndex((chat) => chat.id === chatId);
    const nextChats =
      remainingChats.length > 0 ? remainingChats : [createConversation()];

    controllersRef.current.get(chatId)?.abort();
    setChats(nextChats);
    setChatErrors((current) => {
      const next = { ...current };
      delete next[chatId];
      return next;
    });

    if (activeChatId === chatId) {
      setActiveChatId(
        nextChats[Math.min(deletedIndex, nextChats.length - 1)]?.id ?? null,
      );
      setInput("");
    }
  }

  async function sendMessage(prompt: string) {
    const content = prompt.trim();
    const chat = chats.find((item) => item.id === activeChatId);
    if (!content || !chat || controllersRef.current.has(chat.id)) return;
    const chatId = chat.id;

    const history = chat.messages
      .filter((message) => message.content.trim())
      .slice(-23);
    const conversation: Message[] = [...history, { role: "user", content }];
    const assistantIndex = conversation.length;
    setChats((current) =>
      current.map((item) =>
        item.id === chatId
          ? {
              ...item,
              title:
                item.title === "New chat"
                  ? getConversationTitle(content)
                  : item.title,
              messages: [
                ...conversation,
                { role: "assistant", content: "" },
              ],
            }
          : item,
      ),
    );
    setInput("");
    setChatErrors((current) => {
      const next = { ...current };
      delete next[chatId];
      return next;
    });

    const controller = new AbortController();
    controllersRef.current.set(chatId, controller);
    setPendingChatIds((current) => new Set(current).add(chatId));

    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          getErrorMessage(await response.text(), response.status),
        );
      }
      if (!response.body) {
        throw new Error("The Copilot response did not include a stream.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let receivedText = "";

      function appendChunk(chunk: string) {
        if (!chunk) return;
        receivedText += chunk;
        setChats((current) =>
          current.map((item) =>
            item.id === chatId
              ? {
                  ...item,
                  messages: item.messages.map((message, index) =>
                    index === assistantIndex
                      ? { ...message, content: message.content + chunk }
                      : message,
                  ),
                }
              : item,
          ),
        );
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        appendChunk(decoder.decode(value, { stream: true }));
      }

      appendChunk(decoder.decode());
      if (!receivedText.trim()) {
        throw new Error(emptyResponseMessage);
      }
    } catch (caught) {
      if (controller.signal.aborted) {
        setChats((current) =>
          current.map((item) =>
            item.id === chatId
              ? {
                  ...item,
                  messages: item.messages.at(-1)?.content
                    ? item.messages
                    : item.messages.slice(0, -1),
                }
              : item,
          ),
        );
        return;
      }

      setChatErrors((current) => ({
        ...current,
        [chatId]:
          caught instanceof TypeError
            ? "The Copilot connection was interrupted. Please try again."
            : caught instanceof Error
              ? caught.message
              : emptyResponseMessage,
      }));
      setChats((current) =>
        current.map((item) =>
          item.id === chatId &&
          item.messages.at(-1)?.role === "assistant" &&
          !item.messages.at(-1)?.content
            ? { ...item, messages: item.messages.slice(0, -1) }
            : item,
        ),
      );
    } finally {
      controllersRef.current.delete(chatId);
      setPendingChatIds((current) => {
        const next = new Set(current);
        next.delete(chatId);
        return next;
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <main className="flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white lg:flex-row">
      <aside className="flex max-h-56 w-full shrink-0 flex-col bg-white/70 p-4 dark:bg-neutral-900/40 sm:p-5 lg:h-dvh lg:max-h-none lg:w-72">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-sm font-semibold">Chats</h1>
          <button
            type="button"
            onClick={startNewChat}
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus-visible:ring-white"
          >
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            New chat
          </button>
        </div>

        <nav
          aria-label="Chat history"
          className="flex min-h-0 flex-col gap-1 overflow-y-auto"
        >
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center rounded-lg transition-colors ${
                chat.id === activeChatId
                  ? "bg-neutral-100 dark:bg-neutral-800"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              <button
                type="button"
                aria-current={chat.id === activeChatId ? "page" : undefined}
                onClick={() => selectChat(chat.id)}
                className="min-w-0 flex-1 truncate rounded-l-lg px-3 py-2.5 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white"
              >
                {chat.title}
              </button>
              <button
                type="button"
                aria-label={`Delete ${chat.title}`}
                title={`Delete ${chat.title}`}
                onClick={() => deleteChat(chat.id)}
                className="mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 opacity-70 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus-visible:ring-white"
              >
                <span aria-hidden="true" className="text-lg leading-none">×</span>
              </button>
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col px-4 pb-4 sm:px-8 sm:pb-6 lg:h-dvh lg:px-12 lg:pb-8">
        <header className="flex shrink-0 items-center justify-between py-4 sm:py-5">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {activeChat?.title ?? "AI Copilot"}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {isPending
                ? "Generating a response…"
                : "Ask about your applications or next steps"}
            </p>
          </div>
          {isPending && activeChatId && (
            <button
              type="button"
              onClick={() => controllersRef.current.get(activeChatId)?.abort()}
              className="ml-4 shrink-0 rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus-visible:ring-white"
            >
              Stop
            </button>
          )}
        </header>

        <div
          aria-live="polite"
          aria-busy={isPending}
          className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto py-4 sm:py-6"
        >
          {storageError && (
            <p
              role="status"
              className="text-center text-sm text-amber-700 dark:text-amber-300"
            >
              {storageError}
            </p>
          )}

          {activeChat?.messages.length === 0 && (
            <div className="m-auto max-w-2xl py-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What would you like help with?
              </h2>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                Get practical guidance for your job search, applications, and
                interviews.
              </p>
            </div>
          )}

          {activeChat?.messages.map((message, index) => (
            <div
              key={`${activeChat.id}-${index}-${message.role}`}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] sm:px-5 ${
                  message.role === "user"
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                }`}
              >
                <p className="whitespace-pre-wrap">
                  {message.content ||
                    (isPending && activeChat.id === activeChatId
                      ? "Thinking…"
                      : "")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {activeChatId && chatErrors[activeChatId] && (
          <p
            role="alert"
            className="shrink-0 pb-2 text-sm text-red-700 dark:text-red-300"
          >
            {chatErrors[activeChatId]}
          </p>
        )}

        <div className="shrink-0 pt-3">
          {activeChat?.messages.length === 0 && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isPending}
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-full bg-neutral-100 px-3 py-2 text-xs text-neutral-700 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus-visible:ring-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-3 rounded-2xl bg-white p-3 shadow-sm focus-within:ring-2 focus-within:ring-neutral-300 dark:bg-neutral-900 dark:focus-within:ring-neutral-700"
          >
            <label htmlFor="copilot-prompt" className="sr-only">
              Ask AI Copilot
            </label>
            <textarea
              id="copilot-prompt"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  if (input.trim() && !isPending) void sendMessage(input);
                }
              }}
              maxLength={4000}
              rows={1}
              placeholder="Message AI Copilot…"
              className="max-h-32 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-white dark:placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isPending}
              className="shrink-0 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900"
            >
              Send
            </button>
          </form>
          <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </section>
    </main>
  );
}
