# 025 Spawn Fairness

- Candidate: 対戦マップのスポーン・目的地距離公平性監査
- User fit: 5/5 — Unityゲーム設計で実装前の配置比較に使える
- Revenue or hours saved: 3/5 — マップ初期配置の距離計測とレビュー資料化を1画面に集約
- Differentiation: 4/5 — ドラッグ可能な平面図と、目的地距離・最寄りスポーン・外周余白の同時監査
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — ログイン・外部依存・入力送信なし
- Time to evidence: 4/5 — 配置操作開始率とレポート出力率を即時計測
- Evidence quality: 3/5 — 幾何距離は検証可能だが、遮蔽物・高低差・移動能力は未評価

Riskiest assumption: 制作者がエンジン実装前に、対戦スポーンの距離偏差をブラウザで素早く監査してレポート化したいか。`complete/start` で確認する。

Status: VALIDATED locally when logic and browser tests pass; public runtime must be verified after deployment.
