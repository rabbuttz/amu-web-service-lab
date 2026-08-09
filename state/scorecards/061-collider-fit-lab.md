# 061 Collider Fit Lab — Opportunity scorecard

- Candidates considered: revenue — Unity物理QA補助、time reduction — Renderer boundsとBoxColliderの寸法監査、quality of life — 作業切替コスト記録。
- User fit: 9/10 — Unityゲーム制作とWeb可視化を、当たり判定の初期QAへ転用できる
- Revenue / hours saved: 6/10 — 仮定として、見えないColliderの中心ずれや不足をScene Viewと実機で探す10〜30分を減らす
- Differentiation: 8/10 — Layer Sieveは衝突レイヤー関係、本案は個別BoxColliderの幾何学的被覆を扱う
- Validation cost: 9/10 — AABB交差体積、軸別不足、余剰率、修正寸法を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。回転や動的変形を代替しないことを明記
- Time to evidence: 9/10 — 13列CSVから二面図、被覆率、修正候補、JSONを即時生成できる
- Evidence quality: 7/10 — 幾何計算はテスト可能だが、Unityからのbounds自動抽出と実機接触感は未検証

Total: 57/70

Status: VALIDATED — CSV検証、完全一致、軸方向の不足、交差体積、余剰率、許容余白付き修正寸法、JSON出力を純粋ロジックで検証。Unity上の回転・変形・接触感は未検証。
