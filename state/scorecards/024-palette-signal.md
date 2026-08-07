# 024 Palette Signal

- Candidate: ゲームUI配色のコントラスト・色覚差監査
- User fit: 5/5 — Unityゲーム/Web制作のUI検討をブラウザだけで短縮
- Revenue or hours saved: 3/5 — 実装前の配色レビューと手戻りを1画面に集約
- Differentiation: 4/5 — 文字コントラストと3種の色覚変換後の色差を同じ組み合わせ表で確認
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — ログイン・外部依存・入力送信なし
- Time to evidence: 4/5 — 監査開始率とレポート出力率を即時計測
- Evidence quality: 3/5 — WCAG比は確立、色覚変換は事前確認であり実機テストの代替ではない

Riskiest assumption: 制作者が単一色の確認ではなく、配色全ペアの監査と持ち帰り可能なレポートを必要とするか。`complete/start` で確認する。

Status: VALIDATED locally when logic and browser tests pass; public runtime must be verified after deployment.
