---
sidebar_position: 5
---

# BottyGPT testing, reliability, and performance

BottyGPT is treated as production infrastructure, not a toy widget. This page summarizes how testing, health checks, and operational runbooks are set up, and how they protect the performance and reliability of the assistant that appears on this site.

## Preflight testing in CI

Our **preflight workflow** enforces four gates:

- **Dependency graph check**
  - It installs application and test requirements and runs `pip check`.
  - It confirms there are no broken or conflicting Python dependencies.
- **Targeted backend tests**
  - It runs focused tests for the API and Celery worker.
  - It ensures basic request handling and task execution are stable.
- **Image‑size guardrail**
  - It builds the backend image and fails if it exceeds a defined byte limit.
  - Prevents regressions where model files or build toolchains accidentally bloat the runtime image, which would slow deploys and stress disk.
- **Compose connectivity smoke test**
  - It starts a reduced Docker Compose stack.
  - Verifies:
    - `GET /api/health`
    - `GET /api/ready`
    - `python -m application.healthcheck --target dependencies` inside the backend container.

**Impact:** Problems with dependencies, image size, or core connectivity are caught **before** an image is tagged and shipped to production. BottyGPT is only deployed when it is healthy under realistic container conditions.

## Health checks and runbook

At runtime, BottyGPT exposes clear health surfaces:

- `GET /api/health` — liveness; confirms the backend is up.
- `GET /api/ready` — readiness; confirms that Redis, Mongo, and the vector store are reachable and responsive.
- `python -m application.healthcheck` — a shared CLI entry point for:
  - `--target dependencies`
  - `--target backend`
  - `--target worker`

A dedicated **debugging runbook** captures the first 10 minutes of incident response:

- It starts by inspecting container status with `docker compose ps` to identify failing services.
- It calls `/api/health` and `/api/ready` locally on the VM.
- It executes healthcheck commands inside backend and worker containers.
- It uses structured logs and request IDs to trace failing requests.

**Impact:** When something goes wrong, there is a deterministic path to isolate whether the issue is:

- A dependency (Redis/Mongo/Qdrant).
- The backend or worker application.
- Environment configuration (`.env` / Secret Manager).

This turns a vague “the AI assistant feels broken” into a concrete, actionable diagnosis.

## Secret rotation and configuration safety

Secrets for BottyGPT are stored in **GCP Secret Manager** (`docsgpt-env`), not hard‑coded on the VM:

- Rotating a key means adding a new secret version; deploys or a one‑liner on the VM fetch the latest into `.env`.
- A fetch script is documented for both GitHub Actions and manual use on the VM.
- Audit logs show who read or modified secrets.

**Impact:**

- Secret rotation does not require manual edits on the VM.
- Configuration is consistent across redeploys or VM replacements.
- The assistant’s performance is not compromised by ad‑hoc config drift.

## Production monitoring and performance

BottyGPT’s performance and reliability are supported by **Cloud Logging** and sizing decisions:

- The **Ops Agent** reads Docker json‑file logs and sends them to Cloud Logging.
- Backend and worker logs are JSON with explicit `severity`, `service`, and `request_id`.
- Logs can be filtered by service, severity, or message, and used to build log‑based metrics and alerts (e.g. 5xx spikes, error rate).
- A **50GB boot disk** is standard for the VM to absorb Docker layers and vector data without frequent disk exhaustion.
- Guidance is documented for reclaiming disk when needed (pruning old images and logs) without destabilizing the running stack.

From a performance perspective, running vector search, Redis, and Mongo on the same VM minimizes network latency between components. Health endpoints and structured logs make it obvious when those dependencies become a bottleneck.

## User‑visible reliability on this site

For this Ghost theme and the Docusaurus docs site, these practices translate into concrete guarantees:

- The AI assistant either responds quickly with grounded answers and sources, or fails fast in a controlled way when dependencies are unhealthy.
- The team has a documented path to debug and recover from backend or infrastructure issues without guessing.
- Capacity and performance tuning (VM size, vector store configuration, logging volume) are deliberate choices, not accidents.

BottyGPT is intentionally operated like a production service. That posture is part of the story this site tells about how it approaches applied AI, infrastructure, and long‑term maintainability.
