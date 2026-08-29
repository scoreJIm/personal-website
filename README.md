# Personal Website

Personal developer portfolio for **Wei Wei** (Jimmy) — Software Engineer, Backend & AI/LLM.

A static single-page portfolio built for an overseas technical job search (Germany / Europe).

## Overview

- Single-page layout with anchor navigation: Home, About, Experience, Skills, Projects, Contact.
- All content is driven from a single typed data file — [`src/data/profile.ts`](src/data/profile.ts) — so copy changes don't require touching components.
- Responsive design (mobile + desktop).
- Basic SEO metadata and favicon.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Frontend | React 18 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS 4 |

## Local Development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (default `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

`npm run build` runs `tsc --noEmit` (type-check) followed by `vite build`.

## Projects Featured

| Project | Description | Repo |
| --- | --- | --- |
| **NeoPick** | Guitar lesson marketplace — hexagonal architecture, DDD, booking state machine | [scoreJIm/NeoPick](https://github.com/scoreJIm/NeoPick) |
| **AgentSaul** | AI agent with tool use — Spring AI, intent-based tool dispatch, SSE streaming | [scoreJIm/AgentSaul](https://github.com/scoreJIm/AgentSaul) |
