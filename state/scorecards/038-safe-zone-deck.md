# 038 Safe Zone Deck — Opportunity scorecard

- Candidate angles considered: creator revenue tool (commission quote expiry calculator), time-saving game tool (mobile safe-area auditor), quality-of-life tool (shared household quiet-hours planner)
- Selected: mobile safe-area auditor; materially distinct from Camera Envelope, which audits 2D world framing rather than screen-space UI rectangles.
- User fit: 5/5 — reuses Unity/game UI expertise and serves non-Resonite game creators.
- Revenue or hours saved: 3/5 — hypothesis: one 5-minute batch audit can replace checking four HUD elements across five mock device frames manually, saving an estimated 15–30 minutes per UI iteration; estimate only.
- Differentiation: 4/5 — batch rectangle audit, movement suggestions, live device preview, and portable JSON in one login-free static tool.
- Cost to validate: 5/5 — static HTML/CSS/JS, no paid dependency.
- Reversibility/downside: 5/5 — isolated public experiment; representative inset values are explicitly labeled, and final real-device testing remains required.
- Time to first evidence: 5/5 — start and completed-audit counters provide directional evidence immediately.
- Evidence quality: 2/5 — logic and browser behavior can be verified, but demand evidence requires real traffic; CounterAPI is unauthenticated and directional only.
- Total: 29/35
- Riskiest assumption: creators will paste normalized HUD rectangles before device testing. The spike tests that this workflow produces actionable per-device movement amounts and exportable evidence.
- Status: PARTIAL until 24h and visitor >= 5; logic is validated, demand is not.
