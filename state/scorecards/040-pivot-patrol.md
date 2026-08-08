# 040 Pivot Patrol — Opportunity scorecard

- Candidate angles considered: creator revenue tool (bundle discount floor planner), time-saving game tool (sprite pivot consistency auditor), quality-of-life tool (household recurring-task handoff board)
- Selected: sprite pivot consistency auditor; materially distinct from Sprite Tempo and Atlas Fit because it audits normalized anchor coordinates across animation frames rather than playback speed or texture packing.
- User fit: 5/5 — combines browser tooling with non-Resonite Unity/game asset preparation.
- Revenue or hours saved: 3/5 — hypothesis: one pasted audit can replace repeated engine playback and manual pivot nudging, saving an estimated 10–30 minutes per inconsistent animation set; estimate only.
- Differentiation: 4/5 — handles mixed frame dimensions, uses a robust median target, overlays every frame, proposes per-frame integer coordinates, and exports local JSON.
- Cost to validate: 5/5 — static JavaScript with no external dependency or uploaded data.
- Reversibility/downside: 5/5 — isolated static tool; explicitly warns that inconsistent source trimming may require image correction rather than pivot changes.
- Time to first evidence: 5/5 — a pasted CSV produces drift measurements and suggested coordinates immediately.
- Evidence quality: 3/5 — fixtures validate parsing, normalization, median targeting, thresholds, and errors; demand remains unverified.
- Total: 30/35
- Riskiest assumption: creators have or can export frame dimensions and pivot coordinates in a simple table. The spike tests whether that small input produces a more actionable diagnosis than eyeballing animation jitter.
- Status: PARTIAL until 24h and visitor >= 5; logic and browser workflow are validated, demand is not.
