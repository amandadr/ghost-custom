---
sidebar_position: 3
---

# BottyGPT architecture decisions

BottyGPT is the internal name for the DocsGPT deployment that powers this site’s AI assistant. This page documents the **key architecture decisions**, why they were made for this project, and the impact they have on reliability, performance, and operations. This page acts as the **blueprint** for how the assistant is wired together.

## High‑level architecture (mental model)

At a high level, a user request flows through Google Cloud, into a single VM, through Docker services, and back:

```mermaid
graph TD
    User -->|HTTPS| GFE[Google Front End / Cloud network]
    GFE -->|443| GCE[BottyGPT GCE VM (northamerica-northeast1-a)]

    subgraph "DocsGPT stack (Docker Compose on VM)"
        GCE --> Frontend[DocsGPT UI (Vite/Nginx)]
        GCE --> Backend[DocsGPT API (Flask)]
        Backend --> Redis[Redis / Celery broker]
        Backend --> Mongo[MongoDB metadata]
        Backend --> VectorDB[Qdrant vector store]
    end

    GH[GitHub Actions] -->|Build & push images| AR[Artifact Registry (CA)]
    AR -->|Pull images| GCE
```

This diagram matches the real deployment: a single Canadian VM, Docker Compose, a self‑hosted vector database, and a push‑to‑deploy pipeline from GitHub Actions to Artifact Registry to the VM.

## Canadian region and data residency

- **Decision:** Run all production workloads in **Google Cloud’s Montréal region** (`northamerica-northeast1`) on a single Compute Engine VM.
- **Why:** This site is positioned for Canadian clients, and “data stays in Canada” is a concrete trust and compliance story. Keeping compute, secrets, images, and logs in the same Canadian region avoids cross‑border data flow.
- **Impact:**
  - Clear data‑residency posture: application data, vector embeddings, and logs remain in Canada.
  - Predictable latency for Eastern Canada and nearby.
  - A single region to reason about for networking, IAM, and billing.

## Single VM with Docker Compose

- **Decision:** Run the full BottyGPT stack on **one Compute Engine VM** using **Docker Compose**:
  - Frontend (DocsGPT UI)
  - Backend API
  - Worker (Celery)
  - Redis (broker/cache)
  - MongoDB (metadata)
  - Qdrant or equivalent vector store
- **Why:** For this site’s traffic and team size, a single VM gives the right balance of control and simplicity:
  - One SSH target, one `docker compose` file, one place to debug.
  - No need to orchestrate multiple managed services or cross‑product networking.
  - Runtime is entirely under our control; we choose when to upgrade, restart, or resize.
- **Impact:**
  - **Cost‑predictable**: one VM and its disk instead of per‑request serverless costs.
  - **Operationally simple**: fast to stand up, tear down, or replicate.
  - **Explicit trade‑off:** we do not get automatic horizontal scaling, but the stack is sized so a single VM comfortably handles the expected load.

## Secrets in GCP Secret Manager

- **Decision:** Store application secrets in **GCP Secret Manager** in a single secret (`docsgpt-env`) that contains the full `.env` payload. The VM fetches the latest version into `/opt/docsgpt/.env` at deploy time.
- **Why:** Secrets do not belong in Git, on laptops, or as untracked files edited by hand on the VM. Secret Manager gives:
  - Versioned secrets with audit logs.
  - A single source of truth for environment configuration.
  - Rotation without SSH—the next deploy pulls the new version automatically.
- **Impact:**
  - No secrets in this repo; GitHub only holds cloud‑level credentials for CI.
  - VM access is controlled by IAM (service account with `secretAccessor`), with clear audit trails.
  - Recoverable, repeatable deployments: any new VM can fetch the same env payload.

## Logging and observability

- **Decision:** Use the **Google Cloud Ops Agent** on the VM to send Docker container logs to **Cloud Logging**. The backend and worker emit **structured JSON** logs (severity, service name, request ID).
- **Why:** Tail‑ing logs on a VM works for solo debugging, but production needs:
  - Centralized, queryable logs across all containers.
  - The ability to filter by severity and service (`backend` vs `worker`).
  - A path to log‑based metrics and alerts without bolting on a separate stack.
- **Impact:**
  - Logs for BottyGPT live alongside other project logs in Cloud Logging, scoped to the Canadian project and region.
  - Debugging starts in **Logs Explorer**, not on the VM.
  - The system is ready for alerting (error‑rate, health‑check failures) with minimal additional work.

## TLS and public endpoints

- **Decision:** Terminate HTTPS with **Nginx + Let’s Encrypt** on the VM and standardize on:
  - `https://assistant.mannyroy.com` for the DocsGPT UI.
  - `https://assistant-api.mannyroy.com` for the API and widget `apiHost`.
- **Why:** The assistant runs on HTTPS sites (Ghost and Docusaurus); the backend must also be HTTPS to avoid mixed‑content blocking and to present a professional, secure posture.
- **Impact:**
  - The widget and any custom integrations talk to a single, TLS‑protected `apiHost`.
  - Certificates are free and automated (Certbot), with scripted renewal and nginx reload.
  - Internal ports (7091, database ports) are not exposed directly to the internet.

## CI/CD and image strategy

- **Decision:** Use **GitHub Actions** to:
  - Build backend and frontend images for `linux/amd64`.
  - Push them to **Artifact Registry** in the Canadian region.
  - Connect to the VM over SSH and run `docker compose pull && up -d` with an immutable `IMAGE_TAG` (commit SHA).
- **Why:** This keeps builds reproducible and traceable:
  - The VM is a runtime host only; it never builds images.
  - Every running version maps directly back to a commit.
  - Rollback is as simple as re‑deploying a previous tag.
- **Impact:**
  - Clean separation of concerns: GitHub builds, Artifact Registry stores, the VM runs.
  - Clear story for reviewers: commits → images → running containers, all visible in GCP.
  - Future‑ready: the same approach works if we later add staging or multi‑VM topologies.

## Performance and reliability considerations

BottyGPT is intentionally **boring in all the right ways**:

- Uses a **slim multi‑stage backend image** to avoid Docker bloat and keep pull times reasonable.
- Runs the embedding/vector stack locally (Qdrant and Redis on the VM) to avoid extra network hops.
- Enforces **health and readiness endpoints** (`/api/health`, `/api/ready`) so both CI and production can fail fast when a dependency is down.
- Uses Docker log rotation plus Cloud Logging to prevent disk pressure from unbounded logs.
- Pins a **50GB boot disk** on the VM specifically to absorb image layers and vector data without frequent “no space left on device” incidents.

For a single‑VM deployment that backs two public sites, these decisions deliberately favour **operational clarity and predictable performance** over premature horizontal scaling. If traffic or requirements grow, the architecture and tooling already in place make it straightforward to scale out or move to managed services.
