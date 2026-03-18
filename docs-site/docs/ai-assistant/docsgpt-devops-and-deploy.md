---
sidebar_position: 4
---

# BottyGPT DevOps and deployment

This page explains **how BottyGPT is built and deployed** on Google Cloud, and how those choices support this site’s goals: Canadian hosting, predictable operations, and a clear portfolio story for applied DevOps.

## Deployment model: full stack on a VM

BottyGPT runs as a **full stack** on a single Compute Engine VM:

- Frontend (DocsGPT dashboard, built with Vite).
- Backend API (Flask‑based application).
- Worker (Celery for ingestion and background jobs).
- Redis (broker/cache).
- MongoDB (application data).
- Qdrant (vector database for embeddings).

Deployment is **artifact‑based**:

- Images are built in CI and pushed to **Artifact Registry** in `northamerica-northeast1`.
- The VM pulls those images using `IMAGE_TAG` (commit SHA) from `.env`.
- `docker-compose.gcp.yaml` defines the full production stack and maps ports:
  - Frontend on port 80 (or behind Nginx when TLS is enabled).
  - Backend on port 7091 (internal; exposed via a reverse proxy as `assistant-api.mannyroy.com`).

This keeps the VM focused on running containers, not compiling code, and makes the deploy story easy to reason about: **“push to main, then the VM pulls a tagged image and restarts the stack.”**

:::info Decision: deploy full stack via Docker Compose on a VM
We deliberately avoided Cloud Run / GKE for the first iteration and leaned on a single VM with Docker Compose.
**Impact:** The deployment path is easy to explain, reproduce, and debug, and the monthly cost is predictable. We trade away built‑in autoscaling, which is acceptable for this site’s current traffic.
:::

## GitHub Actions: push‑to‑deploy

The **Deploy to GCP (VM)** workflow does the following on each relevant push to `main`:

1. **Build** backend and frontend images for `linux/amd64`.
2. **Push** both images to Artifact Registry with tag = commit SHA.
3. **Connect** to the VM over SSH.
4. **Update** `IMAGE_TAG` in `.env` on the VM.
5. **Deploy** with `sudo docker compose pull && sudo docker compose up -d`.

Key decisions and their impact:

- **Immutable tags:** Using the commit SHA as `IMAGE_TAG` means every running version is traceable. Rolling back is a matter of re‑deploying a previous SHA.
- **Runtime‑only VM:** No build toolchains are installed on the VM; it only needs Docker and the compose plugin. This reduces attack surface and avoids “works only on that machine” drift.
- **Secret handling:** When `USE_SECRET_MANAGER=true`, the workflow fetches the latest `docsgpt-env` secret into `.env` before updating `IMAGE_TAG`, so configuration changes can ship alongside code without manual editing.

For this site, the workflow doubles as a **living runbook**: anyone reviewing the repo can see exactly how code moves from GitHub into production.

:::tip DevOps best practice: immutable image tags
Every image deployed to the VM is tagged with `GITHUB_SHA`, not `latest`. This makes rollbacks trivial and keeps “what is running?” a one‑line question in both Git and GCP.
:::

## Fresh VM build and cutover

The Plan 2.0 VM docs capture the cutover workflow we used when bringing up a new host:

- **Provision:**
  - We created a VM in `northamerica-northeast1-a` with a **50GB boot disk**.
  - We installed Docker and the Docker Compose plugin.
  - We configured firewall rules so HTTP/HTTPS reach the VM where appropriate.
- **Bootstrap:**
  - We copied `docker-compose.gcp.yaml` and the initial `.env` to `/opt/docsgpt`.
  - We ensured the VM’s service account can pull from Artifact Registry.
- **Deploy:**
  - We set `IMAGE_TAG` in `.env` to a known‑good SHA.
  - We deployed with `sudo docker compose -f docker-compose.gcp.yaml --env-file .env up -d`.
- **Validate:**
  - We hit `/api/health` and `/api/ready` on the backend.
  - We confirmed the frontend responds on port 80 (or via the TLS proxy).
  - We ran smoke tests against key flows (ingestion and Q&A).

This approach mirrors a blue/green mindset without the overhead of a full load‑balancer: a new VM can be built, validated, and then promoted simply by pointing DNS or traffic at it, with a straightforward rollback story.

## TLS and domain configuration

For production, traffic is normalized onto two hostnames:

- `https://assistant.mannyroy.com` — DocsGPT UI.
- `https://assistant-api.mannyroy.com` — backend API and widget `apiHost`.

TLS is provided by **Nginx + Let’s Encrypt** running on the VM:

- Certificates are obtained via Certbot for both hostnames.
- `docker-compose.gcp-tls.yaml` introduces an Nginx container that:
  - Listens on 80/443.
  - Terminates TLS.
  - Proxies `/` to the frontend container and `/api` to the backend.
- A cron job runs `certbot renew` and reloads Nginx on successful renewal.

This keeps HTTPS close to the application (no extra managed load balancer), while giving the assistant a clean, portfolio‑ready URL story for both UI and API.

## Port and firewall hygiene

To keep the VM secure and predictable:

- External firewall rules only open the ports that need to be public:
  - 80/443 for HTTP/HTTPS.
  - Optional alternative frontend port (e.g. 8080) during troubleshooting.
- Internal services (Redis, Mongo, Qdrant) run on the Docker network and do not need to be reachable from outside the host.
- Guidance is documented for:
  - Resolving “port 80 already in use” errors by shutting down legacy stacks or adjusting `FRONTEND_HOST_PORT`.
  - Validating connectivity from both the VM and an external client with `curl` and `nc`.

In practice, this means BottyGPT exposes only what the sites and widget need, and nothing more.
