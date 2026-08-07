# 020 Control Deck scorecard

- Candidate: ゲーム操作のデバイス別割り当てを一覧化し、競合と必須入力の未設定を検査するブラウザツール
- User fit: 5/5 — Unityゲーム制作とWebゲームの入力設計へ直接転用できる
- Revenue / hours saved: 3/5 — 実装前レビューと端末別テスト項目の整理を短縮する仮説
- Differentiation: 4/5 — 表形式の入力だけで大文字小文字をまたぐ競合とデバイス別カバー率を同時に返す
- Cost to validate: 5/5 — 静的サイトと純粋ロジックだけで検証可能
- Reversibility / downside: 5/5 — 無料・端末内処理・依存なし
- Time to evidence: 5/5 — 検査開始率とJSON完了率を即時計測可能
- Evidence quality: 2/5 — 現時点では利用仮説で、実利用データは未取得
- Total: 29/35

Riskiest assumption: 制作者が入力実装前後に、デバイス横断の割り当て表と自動競合検査を使うか。`complete/start` と再訪代理 `view/visitor` で確認する。
