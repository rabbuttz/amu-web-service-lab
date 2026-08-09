# Opportunity Scorecard — Frame Pulse Audit

- User fit: 9/10 — Unity・Webゲームの実機パフォーマンス検証と静的Webツールの技術資産を直接使える
- Revenue / hours saved: 7/10 — フレーム時間ログの手集計と平均FPSによる見落としを、計測区間ごとに15〜45分減らす仮説
- Differentiation: 8/10 — 平均FPS計算ではなく、P95・P99・1% Low・連続スパイクを同じ監査にまとめる
- Cost to validate: 9/10 — 静的HTMLと純粋JavaScriptのみ
- Reversibility / downside: 10/10 — ログイン・外部保存・有料依存なし
- Time to first evidence: 9/10 — サンプルを初期表示し、即時に監査結果を観察できる
- Evidence quality: 8/10 — 順序を保持した実数列から分位点、予算超過、連続区間を直接計算。原因推定はProfiler確認が必要
- Total: 60/70

Riskiest assumption: 制作者が平均FPSだけでなく、貼り付け可能なフレーム時間列から裾と連続スパイクを単独ツールで確認したいか。complete/startで初期検証する。

Status: VALIDATED — 純粋ロジックでパーサー、分位点、1% Low、予算超過、ヒストグラム、連続スパイクを検証し、ブラウザ上の入力→監査→JSON保存ループを実装した。
