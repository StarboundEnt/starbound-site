# Public deployment guide

This prototype can be shown publicly, but it should not be treated as a production health service. Complete a safety, privacy, security, accessibility, and clinical-content review before inviting real users to rely on it.

## Recommended architecture

Use one public HTTPS origin and route the API through the same domain:

```text
https://demo.example.org/             static Starbound demo
https://demo.example.org/api/v1/...   reverse proxy to FastAPI
                                      ↓
                              Ollama/model service
```

The page automatically uses `window.location.origin + /api/v1/demo-answer` outside localhost. A same-origin reverse proxy reduces CORS complexity and avoids exposing an internal model-service address.

If the API must use a different origin, set `window.STARBOUND_AI_ENDPOINT` before `complexity.js` loads and explicitly allow the website origin in backend CORS settings.

## Production configuration

Set backend configuration through environment variables. At minimum:

```text
ENVIRONMENT=production
SECRET_KEY=<unique-random-secret>
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://<private-model-host>:11434
OLLAMA_MODEL=gemma3:1b
BACKEND_CORS_ORIGINS=["https://demo.example.org"]
```

Do not expose Ollama directly to the public internet. Keep it on a private network reachable only by the FastAPI service.

The existing development CORS configuration permits localhost ports. Replace it with the exact production origin before launch; do not use a wildcard origin with credentials.

## Hosting choices

The static files can be hosted on a CDN or static-site host. FastAPI needs a Python application host or container platform. Ollama requires persistent model storage and sufficient CPU/GPU memory.

“Free local AI” means no per-request model API fee when Ollama runs on a computer you control. A publicly hosted Ollama instance still incurs infrastructure, bandwidth, storage, monitoring, and electricity costs.

## Traffic and abuse protection

The API includes a small in-process limit of 20 demo requests per minute per client address. This is a safety net for a single process, not the primary production control.

Before public launch, add edge or gateway controls:

- Distributed rate limiting shared across all backend instances.
- A daily request or spend ceiling.
- Maximum concurrent model requests and a bounded queue.
- Request timeouts and response-size limits.
- Bot protection for repeated automated use.
- Alerts for spikes in 429, 5xx, latency, and model failures.
- A kill switch that disables AI while preserving the deterministic fallback.

If `AI_PROVIDER=openai` is enabled, configure provider project budgets and usage alerts as well as application-level limits.

## Privacy and logging

Questions can contain sensitive health or personal information. For a public deployment:

- Use HTTPS for all browser-to-backend traffic.
- Do not include question text in access, error, analytics, or tracing logs.
- Disable request-body capture in proxies and observability products.
- Define and publish a retention period before collecting any data.
- Document subprocess/model logging and verify Ollama configuration on the deployed host.
- If using OpenAI or another external provider, publish the provider, processing location, retention terms, and applicable data controls before enabling it.
- Provide a visible privacy notice beside the question input.

The current local configuration sends requests only to services on the same computer. That statement is no longer true after remote deployment.

## Safety release gate

The phrase matcher is intentionally narrow and cannot identify every urgent situation. Do not describe it as triage. Before public release:

- Obtain clinical and youth-safety review of prompts, deterministic answers, and escalation copy.
- Test misspellings, slang, indirect distress language, abuse, poisoning, allergic reactions, sexual-health emergencies, eating-disorder crises, violence, and other urgent scenarios.
- Keep emergency and crisis contacts permanently visible.
- Provide a non-AI path to official support information.
- Define an incident-response and content-correction process.

## Deployment verification

Verify at the public URL:

- HTTPS and no mixed-content requests.
- Exact production CORS origin.
- API health and model connectivity.
- Rate limiting returns `429` and `Retry-After`.
- AI failure visibly falls back to deterministic guidance.
- No question text appears in logs or analytics.
- Emergency and crisis links work on mobile.
- Keyboard, screen-reader, zoom, reflow, contrast, and reduced-motion testing.
- Mobile performance on a constrained connection and older device.

