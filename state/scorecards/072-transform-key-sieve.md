# 072 Transform Key Sieve — Opportunity Scorecard

- User fit: 5/5 — Unity・ゲーム制作のアニメーション最適化に直接使える
- Potential impact: 4/5 — 位置トラックの過剰キーと手動間引き作業を削減
- Differentiation: 4/5 — 時間を考慮した許容誤差ベースの抽出とCSV出力をブラウザだけで提供
- Cost to validate: 5/5 — 静的HTMLと純粋ロジックテストで検証可能
- Reversibility/downside: 5/5 — 入力は端末内処理、出力CSVも任意利用
- Time to evidence: 5/5 — サンプルを開くと即座に削減率と軌跡を確認できる
- Evidence quality: 3/5 — 数学的誤差境界はテスト済みだが、Unityの実圧縮・補間・回転は未検証

Total: 31/35

Riskiest assumption: 制作者がエンジン外のCSV監査を位置キー削減の事前判断に使うか。主要指標は complete/start。

Status: VALIDATED — パーサー、時間線形補間、許容誤差内の再帰抽出、誤差集計、CSV出力を自動テストし、ブラウザのサンプル操作でも結果描画を確認する。
