# Embedsy

**Drop a multilingual RAG chatbot into any React or Next.js app — powered by your own docs.**

Embedsy is an open, developer-first toolkit for building documentation-aware AI chatbots that actually speak your users' language. Upload your docs, get a project ID, and embed a fully functional RAG-powered chat widget directly inside your React or Next.js app. No vendor lock-in, no black-box platform — just a clean pipeline you can read, fork, and extend.

What makes Embedsy different from the dozen other "chat with your docs" tools: **multilingual support is built into the RAG pipeline itself**, not bolted on as a post-processing afterthought. The LLM always reasons in English for consistency and accuracy, then [Lingo.dev](https://lingo.dev) translates the final answer into the user's chosen language — so your German users get German answers from your English docs, automatically.

---

## Table of Contents

1. [Why Embedsy](#why-embedsy)
2. [Architecture](#architecture)
3. [How the RAG Pipeline Works](#how-the-rag-pipeline-works)
4. [Project Structure](#project-structure)
5. [Tech Stack](#tech-stack)
6. [Prerequisites](#prerequisites)
7. [Environment Variables](#environment-variables)
8. [Local Development Setup](#local-development-setup)
9. [Database Setup (Supabase)](#database-setup-supabase)
10. [API Reference](#api-reference)
11. [React & Next.js Integration](#react--nextjs-integration)
12. [Widget Configuration Options](#widget-configuration-options)
13. [Multilingual Support (Lingo.dev)](#multilingual-support-lingodev)
14. [Deployment](#deployment)
15. [Known Limitations & Design Decisions](#known-limitations--design-decisions)

---

## Why Embedsy

Most "chat with your docs" tools are closed platforms — you upload your docs to their servers, pay per query, and get a chat bubble you have no control over. Embedsy is built for developers who want the opposite:

- **Own your pipeline.** Every step — parsing, chunking, embedding, retrieval, generation, translation — is code you can read and modify in `backend/src/services/`.
- **Embed natively in React/Next.js.** The widget is a React component. It lives inside your app's component tree, inherits your styling system, and responds to your state. No iframes, no third-party scripts injected into your DOM.
- **Multilingual by design.** Most RAG tools are English-only or require you to maintain translated copies of your docs. Embedsy's pipeline handles translation at the response layer — one doc corpus, every language.
- **Runs on free-tier infrastructure.** Supabase (Postgres + pgvector), Groq (LLaMA 3.3 70B), and Lingo.dev all have generous free tiers. You can run this for a real project at zero cost.

---

## Architecture

![Embedsy Architecture](./architecture.png)

The flow has two distinct phases:

**Ingestion (once per document upload)**
Dashboard → Backend → Document Parser → Chunking Service → Embedding Service → Supabase/pgvector

**Query (every user message)**
React component → `POST /api/chat` → RAG Pipeline (embed → vector search → context → Groq LLaMA 3.3 → Lingo.dev translate) → response

The dashboard (React + Vite) handles project management and document uploads using Supabase JWT auth. Your React/Next.js app talks only to `/api/chat` — a public endpoint that validates the project API key inline.

---

## How the RAG Pipeline Works

### Document Ingestion

When a file is uploaded via the dashboard:

**1. Parse** — `pdf-parse` extracts raw text from PDFs. `.txt` and `.md` files are decoded as UTF-8. Supported types: `application/pdf`, `text/plain`, `text/markdown` (max 10 MB).

**2. Clean** — Collapses excess whitespace, normalizes newlines, strips PDF extraction artifacts.

**3. Chunk** — Text is split sentence-by-sentence on `[.!?]+`. Sentences are assembled into chunks up to **1,000 characters**, with a **200-character overlap** carried forward from the trailing sentences of the previous chunk. This overlap prevents answers from being severed at chunk boundaries.

```js
// backend/src/config/constants.js
export const CHUNK_SIZE = 1000;
export const CHUNK_OVERLAP = 200;
export const EMBEDDING_DIMENSION = 384;
export const LLM_MODEL = 'llama-3.3-70b-versatile';
export const TOP_K_RESULTS = 5;
```

**4. Embed** — Each chunk is run through a custom deterministic hash-based embedding function (see the design note below). Output is a 384-dimensional L2-normalized float vector.

**5. Store** — Chunks and their embedding vectors are inserted into the Supabase `embeddings` table. A `match_embeddings` Postgres RPC function handles cosine similarity retrieval at query time.

### Query Processing

When a user sends a message from your React component:

**1. Embed the query** using the same hash function used during ingestion — this is critical for cosine similarity to be meaningful.

**2. Vector search** — `match_embeddings(query_embedding, threshold=0.0, count=5, project_id)` returns the top-5 most similar stored chunks ranked by cosine similarity.

**3. Build context** — Retrieved chunks are numbered and joined:
```
[1] chunk text...

[2] chunk text...
```

**4. Generate answer (English)** — Context + user question go to Groq's `llama-3.3-70b-versatile` with `temperature: 0.3`, `max_tokens: 500`. The system prompt instructs the model to answer strictly from provided context.

**5. Translate** — If the user has selected a non-English language, the English answer is passed through `lingoEngine.localizeText(answer, { sourceLocale: 'en', targetLocale: targetLanguage })`. If translation fails, the English answer is returned as a fallback — no error is surfaced.

**6. Return** — The API returns `{ answer, sources[], confidence }` where `confidence` is the mean cosine similarity of retrieved chunks as a 0–100 integer.

### Why the LLM reasons in English first

Keeping the LLM in English and translating the output — rather than translating the question into English first, or prompting in the target language — gives three advantages: the model performs best in English, your doc corpus doesn't need translated copies, and Lingo.dev's translation is more accurate on a clean English output than on a multilingual prompt chain.

### Embedding implementation note

The current embedding function is a **custom TF-IDF-style hash function** — not a neural sentence encoder. Words are lowercased, hashed to positions in a 384-dim vector with inverse-square-root positional weighting, then L2-normalized. This is fast, zero-cost, and requires no external API. The tradeoff: no semantic understanding — paraphrase and synonym matching will be weak. Keyword-heavy docs (API references, changelogs, FAQs) work well. To upgrade, replace `backend/src/services/embedding.js` with an OpenAI `text-embedding-3-small` call or a local `@xenova/transformers` model — the rest of the pipeline is unchanged.

---

## Project Structure

```
Embedsy/
├── backend/                        # Express.js API — the brain
│   └── src/
│       ├── config/
│       │   ├── constants.js        # CHUNK_SIZE, LLM_MODEL, EMBEDDING_DIMENSION
│       │   └── database.js         # Supabase public + admin (service role) clients
│       ├── middleware/
│       │   ├── auth.js             # requireAuth (JWT) + validateApiKey
│       │   ├── cors.js
│       │   └── error-handler.js
│       ├── routes/
│       │   ├── chat.js             # POST /api/chat — public, your React app calls this
│       │   ├── documents.js        # Upload/list/delete docs — auth required
│       │   └── projects.js         # Project CRUD + /widget-config public endpoint
│       └── services/
│           ├── chunking.js         # Sentence-aware chunking with overlap
│           ├── document-parser.js  # pdf-parse + plaintext
│           ├── embedding.js        # Hash-based 384-dim vector generation
│           ├── lingo.js            # Lingo.dev translation wrapper
│           ├── llm.js              # Groq SDK — LLaMA 3.3 70B
│           ├── rag.js              # RAG orchestrator — the main pipeline
│           └── vectordb.js         # Supabase insert + match_embeddings RPC
│
├── frontend/                       # React dashboard (Vite + TailwindCSS)
│   └── src/
│       ├── context/AuthContext.jsx # Supabase Auth session
│       ├── hooks/                  # useProjects, useDocuments, useApi
│       └── pages/
│           ├── Dashboard.jsx       # Project list + stats
│           ├── ProjectDetail.jsx
│           ├── Upload.jsx          # Document upload UI
│           └── Embed.jsx           # Embed code generator + live preview
│
├── widget/                         # The embeddable React component
│   └── src/
│       ├── index.jsx               # Bootstrap + window.Embedsy.init
│       ├── App.jsx                 # Root — language state, open/close, messages
│       ├── components/
│       │   ├── ChatBubble.jsx
│       │   ├── ChatWindow.jsx
│       │   ├── Message.jsx
│       │   ├── SourceCitation.jsx  # Shows how many doc chunks backed the answer
│       │   └── TypingIndicator.jsx
│       ├── hooks/
│       │   ├── useChat.js          # Sends messages, loading/error state
│       │   └── useMessages.js      # Message history + localStorage (24hr TTL)
│       └── utils/storage.js        # localStorage persistence helpers
│
├── examples/
│   ├── react-app/                  # Vite React integration example
│   ├── nextjs-app/                 # Next.js App Router integration example
│   ├── vue-app/
│   └── vanilla-html/
│
└── packages/react/                 # (WIP) publishable React component wrapper
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js (ESM), Express 4 |
| LLM | Groq SDK → `llama-3.3-70b-versatile` |
| Vector DB | Supabase (Postgres + pgvector) |
| Auth | Supabase Auth (JWT) |
| Translation | Lingo.dev SDK (`lingo.dev/sdk`) |
| Document parsing | `pdf-parse`, UTF-8 plaintext/markdown |
| Dashboard | React 18, Vite 5, TailwindCSS 3, React Router v6 |
| Widget build | Vite lib mode → IIFE (`widget.js`) for non-React sites |
| File uploads | Multer (memory storage, 10 MB limit) |

---

## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A **Supabase** project — [supabase.com](https://supabase.com) (free tier works)
- A **Groq** API key — [console.groq.com](https://console.groq.com) (free tier works)
- A **Lingo.dev** API key — [lingo.dev](https://lingo.dev) (optional, required only for multilingual responses)

---

## Environment Variables

### Backend (`backend/.env`)

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-role-key

# Groq
GROQ_API_KEY=your-groq-api-key

# Lingo.dev — omit to disable translation, English responses always work without it
LINGODOTDEV_API_KEY=your-lingo-api-key

# Server
PORT=3000
```

`SUPABASE_SERVICE_KEY` is the service role key. It bypasses Supabase RLS and is used **only** server-side inside the backend. Never expose it to the client.

### Frontend (`frontend/.env`)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:3000/api
```

### Widget (`widget/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

In production, `VITE_API_URL` must point to your deployed backend before running `npm run build`. The URL is baked into the compiled bundle at build time.

---

## Local Development Setup

```bash
git clone https://github.com/your-org/embedsy.git
cd embedsy
```

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your credentials
npm run dev            # nodemon — restarts on file changes
```

```bash
curl http://localhost:3000/health
# { "status": "ok", "version": "1.0.0" }
```

### 2. Dashboard

```bash
cd frontend
npm install
cp .env.example .env
npm run dev            # http://localhost:5174
```

### 3. Widget dev server

```bash
cd widget
npm install
cp .env.example .env
npm run dev            # http://localhost:5173
```

To test the production IIFE bundle:

```bash
cd widget && npm run build
# dist/widget.js — single-file compiled bundle for non-React sites
```

---

## Database Setup (Supabase)

### Enable pgvector

Run this in your Supabase SQL editor first:

```sql
create extension if not exists vector;
```

### Table: `projects`

```sql
create table projects (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  api_key      text not null unique,
  widget_title text,
  theme_color  text default '#00FF87',
  user_id      uuid references auth.users(id) on delete cascade,
  created_at   timestamptz default now()
);
```

### Table: `embeddings`

```sql
create table embeddings (
  id          bigserial primary key,
  project_id  uuid references projects(id) on delete cascade,
  chunk_text  text not null,
  embedding   vector(384),
  metadata    jsonb,
  created_at  timestamptz default now()
);

-- IVFFlat index for approximate nearest-neighbor search
create index on embeddings using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);
```

### RPC: `match_embeddings`

This function is called on every query. Create it in the Supabase SQL editor:

```sql
create or replace function match_embeddings(
  query_embedding  text,
  match_threshold  float,
  match_count      int,
  project_id       uuid
)
returns table (
  id          bigint,
  chunk_text  text,
  metadata    jsonb,
  similarity  float
)
language sql stable
as $$
  select
    e.id,
    e.chunk_text,
    e.metadata,
    1 - (e.embedding <=> query_embedding::vector) as similarity
  from embeddings e
  where e.project_id = match_embeddings.project_id
    and 1 - (e.embedding <=> query_embedding::vector) > match_threshold
  order by e.embedding <=> query_embedding::vector
  limit match_count;
$$;
```

### Row Level Security

```sql
alter table projects enable row level security;
alter table embeddings enable row level security;

create policy "Users see own projects"
  on projects for all
  using (user_id = auth.uid());
```

The backend uses the service role key (bypasses RLS) — these policies protect against direct Supabase client access.

---

## API Reference

All endpoints prefixed `/api`. Base URL is your deployed backend in production.

---

### `GET /health`

Public. Returns server status.

```json
{ "status": "ok", "timestamp": "2025-01-01T00:00:00.000Z", "version": "1.0.0" }
```

---

### `POST /api/chat`

**Public.** The endpoint your React component calls on every user message.

**Request body**
```json
{
  "projectId": "uuid",
  "message": "How do I reset my password?",
  "apiKey": "embedsy_abc123...",
  "targetLanguage": "de"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `projectId` | string (UUID) | ✅ | The project whose doc corpus to query |
| `message` | string | ✅ | The user's question |
| `apiKey` | string | ✅ | Project API key (`embedsy_...`) |
| `targetLanguage` | string | ❌ | BCP 47 locale code — `"de"`, `"fr"`, `"ja"`, etc. Defaults to `"en"`. Triggers Lingo.dev translation when non-English. |

**Response**
```json
{
  "success": true,
  "answer": "Um Ihr Passwort zurückzusetzen, navigieren Sie zur Anmeldeseite...",
  "sources": [
    { "id": 1, "text": "Navigate to the login page and click 'Forgot password'...", "similarity": 87 },
    { "id": 2, "text": "An email will be sent to your registered address...", "similarity": 74 }
  ],
  "confidence": 80,
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

`confidence` is average cosine similarity of retrieved chunks as a 0–100 integer. `sources` always contains the original English chunk text.

---

### `GET /api/projects/:id/widget-config`

**Public.** Resolves project metadata from just a project ID. Called by the widget on mount.

```json
{
  "success": true,
  "projectId": "uuid",
  "apiKey": "embedsy_abc123...",
  "title": "Ask our docs",
  "themeColor": "#00FF87"
}
```

---

### `POST /api/projects`

**Auth required** (`Authorization: Bearer <supabase-jwt>`)

```json
// request
{ "name": "My Docs Bot", "widgetTitle": "Ask our docs", "themeColor": "#6366f1" }

// response 201
{ "success": true, "project": { "id": "uuid", "name": "My Docs Bot", "api_key": "embedsy_...", ... } }
```

---

### `GET /api/projects` · `GET /api/projects/:id` · `DELETE /api/projects/:id`

**Auth required.** Standard CRUD. List includes chunk counts per project.

---

### `POST /api/projects/:projectId/upload`

**Auth required.** `Content-Type: multipart/form-data`

| Field | Description |
|---|---|
| `file` | `application/pdf`, `text/plain`, or `text/markdown`. Max 10 MB. |

```json
{
  "success": true,
  "stats": { "filename": "guide.pdf", "fileSize": 204800, "chunks": 47, "textLength": 42301 }
}
```

---

### `GET /api/projects/:projectId/documents`

**Auth required.** Documents grouped by filename with chunk counts.

---

### `DELETE /api/projects/:projectId/documents/:filename`

**Auth required.** Deletes all embedding chunks for the given filename (URL-encoded).

---

## React & Next.js Integration

This is the primary way to use Embedsy. The widget is a React component — embed it natively in your app's component tree, no iframes, no foreign scripts.

### React (Vite / CRA)

Copy `widget/src/` into your project or point your imports at it directly. Then compose the hooks and components however fits your app:

```jsx
// src/components/DocsChat.jsx
import { useState } from 'react';
import ChatWindow from '../embedsy/components/ChatWindow';
import { useMessages } from '../embedsy/hooks/useMessages';
import { useChat } from '../embedsy/hooks/useChat';

const PROJECT_ID = import.meta.env.VITE_EMBEDSY_PROJECT_ID;
const API_KEY = import.meta.env.VITE_EMBEDSY_API_KEY;

export default function DocsChat() {
  const [language, setLanguage] = useState('en');
  const { messages, addMessage, clearAllMessages } = useMessages(PROJECT_ID);

  const { send, isLoading, error } = useChat(
    PROJECT_ID,
    API_KEY,
    language,
    (response) => addMessage({
      role: 'bot',
      content: response.answer,
      sources: response.sources,
      confidence: response.confidence,
    })
  );

  const handleSend = async (message) => {
    addMessage({ role: 'user', content: message });
    await send(message);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSend={handleSend}
        onClear={clearAllMessages}
        title="Ask our docs"
        selectedLanguage={language}
        onLanguageChange={(lang) => { setLanguage(lang); clearAllMessages(); }}
      />
    </div>
  );
}
```

```env
# .env
VITE_EMBEDSY_PROJECT_ID=your-project-uuid
VITE_EMBEDSY_API_KEY=embedsy_abc123...
VITE_API_URL=https://api.yourdomain.com/api
```

---

### Next.js (App Router)

Mark the component `'use client'` — everything else is identical to React. The chat hook uses browser APIs (`localStorage`, `fetch`) so it must run client-side.

```tsx
// app/components/DocsChat.tsx
'use client';

import { useState } from 'react';
import { useMessages } from '@/embedsy/hooks/useMessages';
import { useChat } from '@/embedsy/hooks/useChat';
import ChatWindow from '@/embedsy/components/ChatWindow';

const PROJECT_ID = process.env.NEXT_PUBLIC_EMBEDSY_PROJECT_ID!;
const API_KEY = process.env.NEXT_PUBLIC_EMBEDSY_API_KEY!;

export default function DocsChat() {
  const [language, setLanguage] = useState('en');
  const { messages, addMessage, clearAllMessages } = useMessages(PROJECT_ID);

  const { send, isLoading, error } = useChat(
    PROJECT_ID,
    API_KEY,
    language,
    (res) => addMessage({
      role: 'bot',
      content: res.answer,
      sources: res.sources,
      confidence: res.confidence,
    })
  );

  const handleSend = async (msg: string) => {
    addMessage({ role: 'user', content: msg });
    await send(msg);
  };

  return (
    <ChatWindow
      messages={messages}
      isLoading={isLoading}
      error={error}
      onSend={handleSend}
      onClear={clearAllMessages}
      title="Ask our docs"
      selectedLanguage={language}
      onLanguageChange={(lang) => { setLanguage(lang); clearAllMessages(); }}
    />
  );
}
```

Add it to your root layout so it appears globally across all pages:

```tsx
// app/layout.tsx
import DocsChat from './components/DocsChat';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <DocsChat />
      </body>
    </html>
  );
}
```

```env
# .env.local
NEXT_PUBLIC_EMBEDSY_PROJECT_ID=your-project-uuid
NEXT_PUBLIC_EMBEDSY_API_KEY=embedsy_abc123...
NEXT_PUBLIC_EMBEDSY_API_URL=https://api.yourdomain.com/api
```

`NEXT_PUBLIC_` prefix is required — these values are read in a client component, so they must be exposed to the browser bundle.

---

### Calling the API directly (bring your own UI)

If you want to build your own chat interface entirely, just call the endpoint:

```ts
// lib/embedsy.ts
export async function askDocs(question: string, language = 'en') {
  const res = await fetch(`${process.env.NEXT_PUBLIC_EMBEDSY_API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      projectId: process.env.NEXT_PUBLIC_EMBEDSY_PROJECT_ID,
      message: question,
      apiKey: process.env.NEXT_PUBLIC_EMBEDSY_API_KEY,
      targetLanguage: language,
    }),
  });

  if (!res.ok) throw new Error('Chat request failed');
  return res.json() as Promise<{ answer: string; sources: Source[]; confidence: number }>;
}
```

---

## Widget Configuration Options

Whether you use the React component source directly or the compiled `widget.js`, the same props/options apply:

| Prop | Type | Default | Description |
|---|---|---|---|
| `projectId` | string | — | **Required.** Your project UUID from the dashboard. |
| `apiKey` | string | — | **Required.** Your project API key (`embedsy_...`). |
| `title` | string | Project name | Header text inside the chat window. |
| `position` | `bottom-right` \| `bottom-left` | `bottom-right` | Position of the floating bubble. |
| `themeColor` | hex string | `#00FF87` | Accent color — set as `--embedsy-theme` CSS custom property on the widget root. Controls bubble, send button, and highlights. |

### Chat window features

- **Language picker** — Built into the chat header. Users pick their language; all subsequent responses arrive translated. Switching language clears the conversation intentionally, to avoid mixed-language context.
- **Message persistence** — Conversation saved to `localStorage` as `embedsy_messages_{projectId}`. Expires after 24 hours automatically.
- **Source citations** — Each bot message shows how many documentation chunks were used.
- **Typing indicator** — Displayed while awaiting the backend.
- **Error + retry** — On failure, an inline error message with a retry button replays the last user message.

---

## Multilingual Support (Lingo.dev)

Multilingual RAG is the core differentiator in Embedsy. Here's exactly how the pipeline handles it:

```
User types in German
        │
        ▼
POST /api/chat  →  { message: "Wie setze ich mein Passwort zurück?", targetLanguage: "de" }
        │
        ▼
Embed message as-is  (hash embeddings are language-agnostic)
        │
        ▼
Vector search retrieves top-5 chunks from English documentation
        │
        ▼
Groq LLaMA 3.3 generates answer in English  ←  consistent, high quality
        │
        ▼
Lingo.dev: localizeText(englishAnswer, { sourceLocale: 'en', targetLocale: 'de' })
        │
        ▼
"Um Ihr Passwort zurückzusetzen, navigieren Sie zur Anmeldeseite..."  →  returned to widget
```

**Why not translate the question to English first?** Translating the query introduces a second point of failure and a round-trip before you even touch your docs. Embedsy's hash-based embeddings are language-agnostic (character-level word hashes), so the query embedding works regardless of input language. The LLM is kept in English for quality, and translation only happens at the very end on the clean English output.

**Graceful degradation:** If `LINGODOTDEV_API_KEY` is missing or if Lingo.dev fails, the English answer is returned transparently — no error thrown, no user-facing failure. Setting up Lingo.dev is genuinely optional for getting started.

**Supported locales:** Any BCP 47 locale supported by Lingo.dev — `fr`, `de`, `es`, `pt`, `it`, `ja`, `zh`, `ko`, `ar`, `hi`, and many more.

---

## Deployment

Each of the three components deploys independently.

| Component | Recommended platform | Notes |
|---|---|---|
| Backend | Railway / Render / Fly.io | Set all env vars on the platform. Start command: `node src/index.js` |
| Dashboard | Vercel / Netlify | Set `VITE_*` build vars. Deploy the `frontend/` directory. |
| Widget (compiled) | Vercel / Cloudflare / S3 + CDN | Build with `VITE_API_URL` baked in, host `dist/widget.js`. Only needed for non-React sites. |

For React/Next.js apps, you don't need to deploy the widget separately — use the component source directly in your project.

### Backend

```bash
cd backend
npm start   # configure env vars on your platform's dashboard
```

### Dashboard

```bash
cd frontend
VITE_API_URL=https://api.yourdomain.com/api npm run build
# deploy dist/ to Vercel or Netlify
```

> **CORS:** The backend must allow cross-origin requests from your React/Next.js app's domain. Review `backend/src/middleware/cors.js` before deploying to production.

---

## Known Limitations & Design Decisions

**Hash embeddings have no semantic understanding.** Two sentences that mean the same thing but use different words will not produce similar vectors. This is a deliberate starting point — no API cost, no cold start, no external dependency. Swapping `backend/src/services/embedding.js` for `text-embedding-3-small` or a local `@xenova/transformers` model is a well-defined one-file change.

**Embeddings stored as serialized text.** Vectors are inserted as `[0.1,0.2,...]` strings and cast to `vector` inside the `match_embeddings` RPC. This is functional but not as efficient as native pgvector input. A future version should use pgvector's native binding.

**No streaming.** `/api/chat` waits for the full Groq completion before responding. Groq's SDK supports streaming — adding it cuts perceived latency significantly for longer answers and is a clean addition to `llm.js` and the chat route.

**Chat endpoint API key not enforced.** `validateApiKey` middleware exists in `auth.js` but is not currently wired to the chat route. Any caller with a valid `projectId` can query any project's corpus. Wiring this middleware is a one-line fix in `chat.js`.

**Widget bundle size for non-React sites.** The IIFE build inlines React and ReactDOM (~150–200 KB gzipped). For React/Next.js apps this is entirely unnecessary — use the component source directly to share your host app's React instance.