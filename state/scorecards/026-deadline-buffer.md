# 026 Deadline Buffer

- Candidate: 制作工程の不確実性から約束可能な納期を試算するツール
- User fit: 5/5 — 個人制作・受託・小規模チームで、見積時間の幅を納期判断へ変換できる
- Revenue or hours saved: 4/5 — 見積もりの安全率を手計算せず、納期交渉用の根拠を1画面で作れる
- Differentiation: 4/5 — 楽観・通常・悲観の3点見積もりを5,000回試算し、P50/P80/P90日付と目標日内確率を同時表示
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — ログイン・外部依存・入力送信なし
- Time to evidence: 4/5 — 試算開始率と結果コピー率を即時計測
- Evidence quality: 3/5 — モンテカルロ計算は検証可能だが、実案件の工程相関や割り込みは未評価

Riskiest assumption: 制作者が一律バッファではなく、工程別の幅からP80納期を作って結果を持ち帰りたいか。`complete/start` で確認する。

Status: VALIDATED locally when logic and browser tests pass; public runtime must be verified after deployment.
