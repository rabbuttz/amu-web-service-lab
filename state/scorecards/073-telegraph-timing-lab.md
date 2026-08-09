# 073 Telegraph Timing Lab — Opportunity Scorecard

- User fit: 9/10 — Unity・Webゲーム制作と、実測に基づく設計判断に直結
- Potential impact: 7/10 — 予兆時間の初期値決定とプレイテスト前の往復を短縮
- Differentiation: 8/10 — 一般的な反応速度ゲームではなく、現在値の想定回避率とP90＋安全マージンを設計値へ変換
- Cost to validate: 9/10 — 静的サイトとブラウザ入力のみ
- Reversibility/downside: 10/10 — ログイン・外部依存・入力送信なし
- Time to first evidence: 9/10 — 8試行で端末・入力方法ごとの結果が出る
- Evidence quality: 6/10 — 純粋ロジックは検証可能だが、単純反応と実ゲーム内の選択反応には差がある
- Total: 58/70

## Riskiest assumption

単純反応時間を攻撃予兆の設計値へ変換しても有用か。P90に編集可能な安全マージンを足した開始候補と、現在値での実測成功率を併記し、実ゲーム・複数人での再確認が必要な範囲を明記することで、断定ではなく初期値決定に限定した。

## Result

VALIDATED — percentile補間、予兆時間内の成功分類、50ms単位の推奨値丸め、早押し、部分測定、入力検証をNodeテストで確認。ブラウザ実測と公開環境は公開後に別途確認する。
