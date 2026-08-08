# 054 Draw Call Weaver — Opportunity scorecard

- Candidates considered: revenue — 小規模ゲームの外注QA見積比較、time reduction — draw call描画グループ事前監査、quality of life — 休憩後の作業再開メモ。
- User fit: 9/10 — Unity系ゲーム制作とWeb実装の知識を、プロファイル前の描画設計へ転用できる
- Revenue / hours saved: 7/10 — 仮定として、Material・Mesh・Static条件を手作業で集計する30〜60分と、最適化候補の見落としを減らす
- Differentiation: 8/10 — LOD Distance Lensは距離別三角形、Shader Variant Sieveはキーワード組み合わせ、本案はrendererのバッチ条件を扱う
- Validation cost: 9/10 — StaticのMaterial・Lightmap分割、GPU instancingのMaterial・Mesh統合、未適用候補を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。描画Passやプラットフォーム制限を含まない概算と明記
- Time to evidence: 9/10 — サンプル992 rendererを63概算draw callsへ分類し、未適用59 calls相当を即時提示できる
- Evidence quality: 7/10 — 分類ロジックはテスト済みだが、Unity Frame Debuggerとの一致度は未検証

Total: 58/70

Status: VALIDATED — パーサー、Static分割、Instancing統合、候補抽出、入力検証、JSON出力を純粋ロジックで検証。実プロジェクトでの時間短縮と実測draw call一致度は未検証。
