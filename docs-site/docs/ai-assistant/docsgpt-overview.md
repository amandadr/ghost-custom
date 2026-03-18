---
sidebar_position: 0
---

# BottyGPT / DocsGPT overview

DocsGPT is the **open‑source AI assistant platform** that powers BottyGPT, the sitewide documentation chatbot for this project. It provides a single RAG backend (retrieval‑augmented generation) and an embeddable chat widget that can be reused across multiple sites.

This page summarizes how BottyGPT works, how it is deployed for this site, and how the rest of the AI assistant docs are structured.

## How the AI assistant docs are organized

The BottyGPT documentation is structured as a **narrative DevOps story** rather than a grab‑bag of how‑tos. It is grouped into four pillars:

1. **The blueprint** – mental model and high‑level architecture  
   - This page (overview of BottyGPT and DocsGPT).  
   - AI assistant product design and behaviour: [AI assistant design](design).  
2. **The stack** – what actually runs and where  
   - Architecture and infrastructure decisions: [BottyGPT architecture decisions](docsgpt-architecture-decisions).  
3. **The pipeline** – how code becomes a running assistant  
   - DevOps and deployment model: [BottyGPT DevOps and deployment](docsgpt-devops-and-deploy).  
   - Testing, health checks, and runtime safeguards: [BottyGPT testing, reliability, and performance](docsgpt-testing-and-operations).  
4. **The decision log** – why this path was chosen  
   - Key trade‑offs and their impact are captured directly in the architecture and DevOps pages, using clear **Decision → Why → Impact** sections instead of abstract ADR IDs.

Read the story in order:

1. This overview (BottyGPT / DocsGPT).  
2. [BottyGPT architecture decisions](docsgpt-architecture-decisions) (what runs where).  
3. [BottyGPT DevOps and deployment](docsgpt-devops-and-deploy) (how it gets there).  
4. [BottyGPT testing, reliability, and performance](docsgpt-testing-and-operations) (how we keep it healthy).  
5. [DocsGPT implementation plan](docsgpt-implementation-plan) (the implementation story behind this assistant).

## What DocsGPT is

DocsGPT is a self‑hostable (or cloud‑hosted) system for building AI assistants and agents:

- **Private, controllable backend** – we host the API and data (self-hosted), or use the official cloud.
- **Multi‑source ingestion** – supports URLs/sitemaps, uploaded docs (PDF, Office, Markdown, HTML, JSON, etc.), GitHub, and other sources.
- **RAG pipeline** – turns content into embeddings in a vector database; answers are generated based on retrieved chunks.
- **Embeddable widgets and integrations** – React widget, plain HTML/JS widget, bots (Slack/Discord/Telegram), and API tooling.
- **Multi‑model support** – can call hosted LLMs (OpenAI, Anthropic, Google, etc.) or local inference stacks (e.g. Ollama).

Upstream references:

- DocsGPT GitHub repo: `https://github.com/arc53/DocsGPT`
- DocsGPT documentation: `https://docs.docsgpt.cloud/`

## How we use DocsGPT in this project

The AI assistant for this project follows the “**one backend, many frontends**” pattern:

- **Single DocsGPT backend** – one instance (self‑hosted or cloud) provides the chat API.
- **Single knowledge base** – a unified corpus that includes:
  - The Docusaurus docs site (`docs.mannyroy.com`).
  - The main Ghost site (`mannyroy.com`).
  - Optional extra sources (e.g. repo docs, PDFs) as the project evolves.
- **Two frontends** – the same assistant is embedded:
  - On the Ghost site via a script + widget container in the theme or Code Injection.
  - On the Docusaurus docs site via either the global `scripts` config or a React `<DocsGPTWidget />` component.

Both frontends point to the **same `apiHost`** (e.g. `https://assistant-api.mannyroy.com`) and optionally share the same API key, so behaviour and knowledge are consistent everywhere.

For deeper context, see:

- [AI assistant design](design)
- [DocsGPT implementation plan](docsgpt-implementation-plan)

## High‑level architecture

At a high level, DocsGPT sits between our sites and the underlying LLM provider(s):

- **DocsGPT backend**
  - Exposes an HTTP API used by the widget.
  - Handles chat sessions, retrieval, and generation.
  - Manages ingestion jobs and runs background workers.
- **Vector database**
  - Stores embeddings for ingested content (docs, pages, uploads).
  - Is queried on each request to find relevant chunks.
- **LLM provider / inference**
  - Generates the natural‑language answer using retrieved chunks as context.
  - Can be a hosted provider (OpenAI, Anthropic, Google, etc.) or a local model.
- **Embeddable widget**
  - Runs in the browser on Ghost and Docusaurus.
  - Calls the DocsGPT API over HTTPS using a configured `apiHost` (and optional `apiKey`).

In this project, DocsGPT is part of the overall docs architecture rather than replacing it. The chatbot is an **assistive layer** on top of existing docs and site content; it does not store or author the canonical documentation.

## Why DocsGPT was chosen

DocsGPT aligns well with the goals for this AI assistant:

- **Single assistant across multiple sites** – one instance and one knowledge base serving both Ghost and Docusaurus.
- **Source‑aware answers** – the widget can show citations so users can verify responses and jump into the underlying docs.
- **Self‑hosting option** – supports a self‑hosted deployment in a specific region (e.g. Canada) to align with data‑location requirements.
- **Open source and extensible** – the codebase and docs are open, making it easier to extend, debug, and document for a portfolio.
- **Rich ingestion and integration** – supports the mix of web content and repo documentation used in this project.

Trade‑offs (captured in more detail in the implementation plan) include running and maintaining Docker infrastructure, a reverse proxy with TLS, and a vector database, but these are acceptable and are part of the DevOps story this project aims to showcase.

## Where to go next

Use this page as a conceptual introduction. For concrete implementation details and code‑level integration, see:

- [AI assistant design](design) – product/UX design, scope, and how the assistant appears across the sites.
- [DocsGPT implementation plan](docsgpt-implementation-plan) – the DevOps and integration story behind the stack.
