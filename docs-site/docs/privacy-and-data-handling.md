---
sidebar_position: 3
---

# Privacy & data handling

This page captures the “where data lives” and “how we handle sensitive configuration” story at a high level.

## Canada / data residency

- Production workloads are run in a Canadian region to support residency and latency expectations.

## Secrets and configuration

- Secrets are stored in GCP Secret Manager for the assistant stack and are injected at deploy time, not committed to the repo.

## Where the details live

- [BottyGPT architecture decisions](./ai-assistant/docsgpt-architecture-decisions)
- [BottyGPT / DocsGPT DevOps and deployment](./ai-assistant/docsgpt-devops-and-deploy)
