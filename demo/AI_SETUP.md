# AI demo setup

The browser calls the Starbound FastAPI backend. By default, the backend uses
Ollama locally, so there is no per-request AI API charge and no API key is sent
to the browser.

## Run locally

1. Install Ollama, then download the default local model once:

   ```sh
   ollama pull gemma3:1b
   ```

2. In `starbound.mvp/backend/.env`, set:

   ```text
   AI_PROVIDER=ollama
   OLLAMA_BASE_URL=http://127.0.0.1:11434
   OLLAMA_MODEL=gemma3:1b
   ```

3. Start the backend from `starbound.mvp/backend`:

   ```sh
   ./venv/bin/uvicorn main:app --reload --port 8001
   ```

4. Serve `starbound-site` on a local port and open `/demo/`.

The demo defaults to `http://127.0.0.1:8001/api/v1/demo-answer`. For a hosted
backend, set `window.STARBOUND_AI_ENDPOINT` before `complexity.js` loads.

## Cost boundary

`AI_PROVIDER=ollama` does not make paid API calls. It uses the computer's own
CPU/GPU, storage and electricity. OpenAI remains available only as an explicit
opt-in provider by setting `AI_PROVIDER=openai` and an `OPENAI_API_KEY`; that
mode may incur API charges.

## Safety behaviour

Known urgent phrases are handled locally before any network call. The backend
prompt also instructs the model to make urgent safety advice override
personalisation. If the AI endpoint fails, the interface clearly identifies
that it is showing the deterministic local fallback.
