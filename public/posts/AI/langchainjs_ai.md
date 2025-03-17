---
title: use langchianjs with Vercel @ai-sdk
date: 2025-03-12 11:08:01
tags: AI
---

### why use langchainjs

1. free to switch and custom LLM provider
2. chain llm instructions

### how to use langchainjs with vercel/ai

1. use _LangChainAdapter_ serve side

```typescript
import { NextRequest } from "next/server";
import LLMProvider from "@/utils/llms_provider";
import { LangChainAdapter, Message } from "ai";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { model, messages, book } = body;

  const [provider, modelName] = model.split("/")!;
  const llm = LLMProvider.getModel(provider, {
    model: modelName,
    temperature: 0,
    maxRetries: 2,
  });

  const eventStream = await llm.stream(
    messages.map((message: Message) => {
      let messageData;
      switch (message.role) {
        case "user":
          messageData = new HumanMessage(message.content);
          break;
        case "assistant":
          messageData = new AIMessage(message.content);
          break;
        case "system":
          messageData = new SystemMessage(message.content);
          break;
        default:
          break;
      }
      return messageData;
    })
  );

  return LangChainAdapter.toDataStreamResponse(eventStream);
}
```

2. client side

```typescript
const { messages, status, append, reload, setMessages } = useChat({
  id: chat.id,
  api: "/api/chat",
  initialMessages: chat.messages as Message[],
  body: {
    model: chat.model,
    chatId: chat.id,
  },
  async onFinish(message, options) {
    (await createMessage(chat.id, message)) as Message;
    router.refresh();
  },
});
```

### disadvantage of llm.stream
1. can't return StructuredOutput to frontend

### disadvantage of langchainjs with vercel/ai

1. it's hard to use langchainjs _streamEvents_ (I want to do message persistence) with @ai-sdk _LangChainAdapter_ I can only use _@microsoft/fetch-event-source_ with langchainjs _streamEvents_ like this

```typescript
await fetchEventSource("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  },
  body: JSON.stringify({
    model: message.model,
    chatId: chat.id,
    book: chat,
    messages,
    messageId: message.id,
  }),
  onmessage: (message) => {
    if (message.event !== "data") return;
    const eventSourceMessage = JSON.parse(message.data);

    if (!eventSourceMessage.data.chunk) return;

    if (eventSourceMessage.event === "on_chat_model_stream") {
      if (aiMessage) {
        aiMessage = aiMessage.concat(
          new AIMessageChunk(eventSourceMessage.data.chunk.kwargs)
        );
      } else {
        aiMessage = new AIMessageChunk(eventSourceMessage.data.chunk.kwargs);
      }
      setMessages((prevState) => [
        ...(prevState.at(-1)?.role === "user"
          ? prevState
          : prevState.slice(0, -1)),
        {
          id: messageId,
          role: "assistant",
          content: aiMessage?.content as string,
        },
      ]);
    }
    if (eventSourceMessage.event === "on_chat_model_end") {
      aiMessage = new AIMessageChunk(eventSourceMessage.data.chunk.kwargs);
      createMessage(chat.id, {
        id: messageId,
        role: "assistant",
        content: aiMessage?.content as string,
      });
    }
  },
  onerror: (err) => {
    console.log(err);
  },
});
```
