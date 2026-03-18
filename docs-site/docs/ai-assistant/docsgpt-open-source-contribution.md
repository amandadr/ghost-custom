---
sidebar_position: 6
---

# DocsGPT open‑source contribution: health + readiness

This page documents an upstream contribution prepared for the open‑source [DocsGPT](https://github.com/arc53/DocsGPT) project: **liveness/readiness endpoints** plus a small **healthcheck CLI** intended for Docker/Kubernetes (and similar orchestrators).

## Summary (what was contributed)

- **`GET /api/health`**: liveness endpoint for “is the backend process up?”
  - Returns **200** with `{"status": "ok", "service": "backend"}`.
- **`GET /api/ready`**: readiness endpoint for “are dependencies reachable?”
  - Checks **Redis**, **Mongo**, and **Qdrant** *(only when Qdrant is enabled)*.
  - Returns **200** with `{"status": "ready", "checks": {...}}` when all checks pass.
  - Returns **503** with `{"status": "degraded", "checks": {...}}` when any check fails.
- **`python -m application.healthcheck`**: CLI that runs the same logic as readiness (or checks the backend HTTP endpoint) for container `HEALTHCHECK` and probe scripts.

## Why this matters (the “so what”)

Orchestrators need two different signals:

- **Liveness** answers: *should this process be restarted?*
- **Readiness** answers: *should this instance receive traffic yet?*

Without both, deployments tend to rely on brittle “sleep then hope” logic, or treat “process started” as equivalent to “service usable” (it’s not—dependencies can be down or warming up).

## Implementation details (what changed upstream)

The contribution is intentionally minimal: it adds **two routes**, a small **dependency‑check helper module**, a **CLI wrapper**, and focused unit tests.

### New files

- **`application/core/service_checks.py`**
  - `required_service_checks()`: runs Redis + Mongo checks and conditionally Qdrant.
  - `summarize_checks()`: converts results into a stable JSON payload + overall OK flag.
  - Reads existing env‑driven settings (no new config surface): `CELERY_BROKER_URL`, `MONGO_URI`, `VECTOR_STORE`, `QDRANT_URL`, `QDRANT_API_KEY`.
- **`application/healthcheck.py`**
  - `--target dependencies|worker|backend` (today `worker` behaves like `dependencies` as a forward‑compatible placeholder).
  - `--target backend` checks `--url` (defaults to `http://localhost:7091/api/health`) and exits **0/1** for healthcheck friendliness.

### Changes to an existing file

- **`application/app.py`**
  - Adds one import: `required_service_checks`, `summarize_checks`.
  - Adds two routes: `/api/health` and `/api/ready`.

### Tests

- **`tests/test_health.py`**
  - Validates both endpoints’ status codes and payload shape.
  - Mocks dependency checks for determinism.
  - Covers the CLI exit codes and JSON output for both “healthy” and “unhealthy” scenarios.

## Behaviour notes (auth + conditional dependencies)

- **Authentication**: these endpoints are meant to be callable **without authentication**, matching upstream behaviour where requests without a token are not forcibly rejected.
- **Vector store conditional**: if `VECTOR_STORE` is not `qdrant`, readiness checks only cover **Redis** and **Mongo**.

## Upstream submission bundle (PR-ready)

The PR bundle lives in this repo at:

- `contrib/upstream-pr` (source-of-truth for the change set prepared for upstream)

It includes:

- `README.md`: ready-to-paste PR description and context for reviewers
- `APP_PATCH.md`: the exact `application/app.py` import + route insert points
- `application/core/service_checks.py`, `application/healthcheck.py`, and `tests/test_health.py`

### Verification we ran (upstream fork)

From the upstream DocsGPT repo root, our verification sequence was:

- We installed requirements: `pip install -r application/requirements.txt -r tests/requirements.txt`
- We ran lint/format: `ruff check application/ tests/` and `ruff format application/ tests/`
- We ran tests: `python -m pytest tests/test_health.py tests/test_app.py -v`

## PR description (copy/paste)

The prepared PR title and full description are captured in `contrib/upstream-pr/README.md` for a clean copy/paste submission.
