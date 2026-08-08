# 039 Tile Seam Lab — Opportunity scorecard

- Candidate angles considered: creator revenue tool (commission add-on margin planner), time-saving game tool (tile texture seam auditor), quality-of-life tool (shared pantry substitution matrix)
- Selected: tile texture seam auditor; materially distinct from Atlas Fit and Key Art Cropper because it tests opposite-edge continuity in a repeatable texture rather than packing or aspect-ratio cropping.
- User fit: 5/5 — applies browser and game-production expertise to a common non-Resonite asset-preparation task.
- Revenue or hours saved: 3/5 — hypothesis: a 1-minute edge audit can replace importing and arranging a 3×3 material test for each revision, saving an estimated 5–15 minutes per texture iteration; estimate only.
- Differentiation: 4/5 — local image handling, normalized edge scores, worst-position hints, repeat preview, center-offset inspection, and portable JSON in one login-free static tool.
- Cost to validate: 5/5 — static Canvas/JavaScript, no paid dependency.
- Reversibility/downside: 5/5 — isolated static experiment; the UI labels RGB difference as directional and still requires in-engine checks for normal maps, compression, and mipmaps.
- Time to first evidence: 5/5 — completed edge audits provide immediate directional evidence.
- Evidence quality: 3/5 — synthetic pixel fixtures validate the math and a browser image workflow validates usability; demand evidence still requires real traffic.
- Total: 30/35
- Riskiest assumption: creators need a browser preflight before engine import. The spike tests whether the workflow produces a visible repeat seam, edge scores, and actionable worst coordinates without uploading an asset.
- Status: PARTIAL until 24h and visitor >= 5; logic and browser workflow are validated, demand is not.
