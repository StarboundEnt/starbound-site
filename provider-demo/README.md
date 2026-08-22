# Starbound provider demo

A static, interactive prototype of the provider-facing Starbound experience.

The demo uses fictional aggregate data and focuses on three product ideas:

- A signal room showing barriers and capacity patterns across a community.
- A visible validation layer covering privacy threshold, persistence, corroboration and equity review.
- A service-planning view that turns a validated pattern into a question without presenting correlation as cause.
- An animated privacy-airlock explainer showing how consented context can contribute to provider signals while full searches and individual records remain on the individual side.
- Individual illustrated device crops from that concept board are reused in the animated individual-side scene.
- The central illustrated Starbound phone is reused as the live main-device shell, with animated HTML question and answer layers on its screen.

Serve `starbound-site` locally and open `/provider-demo/`:

```sh
python3 -m http.server 8765
```

This prototype is not clinical decision support. Before real data is used, consent, suppression, role-based access, audit logging, governance and community validation need to be specified and independently reviewed.
