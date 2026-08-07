# 021 Dialogue Tempo scorecard

- Candidate: ゲーム会話台本から発話時間・話者比率・間・選択肢位置を可視化するブラウザツール
- User fit: 5/5 — Unityゲーム制作とWebゲームの会話設計、実装前レビューへ直接転用できる
- Revenue / hours saved: 3/5 — 仮収録や実装前に長台詞とテンポ偏りを発見し、調整往復を減らす仮説
- Differentiation: 4/5 — 日本語文字数ベースの推定尺と話者・選択肢タイムラインを同じ画面で返す
- Cost to validate: 5/5 — 静的サイトと純粋ロジックだけで検証可能
- Reversibility / downside: 5/5 — 無料・端末内処理・依存なし
- Time to evidence: 5/5 — 解析開始率とJSON出力完了率を即時計測可能
- Evidence quality: 2/5 — 読速推定は編集可能な仮定で、実利用データは未取得
- Total: 29/35

Riskiest assumption: 制作者が仮収録前に文字数ベースの推定尺と話者バランスを使うか。`complete/start` と再訪代理 `view/visitor` で確認する。
