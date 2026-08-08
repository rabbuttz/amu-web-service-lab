# 037 Glyph Harvest — Opportunity scorecard

- User fit: 9/10 — Unity・Webゲーム制作と多言語UIの実装経験を直接再利用する
- Revenue / hours saved: 7/10 — フォントアセット作成前の文字収集と欠落確認を1案件あたり15–45分短縮する仮説
- Differentiation: 8/10 — 単なる文字数カウンターではなく、初出順グリフ抽出・文字種内訳・選択範囲外検査・TMP向けTXTを一画面にまとめる
- Cost to validate: 9/10 — 静的サイトと純粋ロジックテストのみ
- Reversibility / downside: 10/10 — ローカル処理、ログイン・外部依存なし
- Time to first evidence: 9/10 — 公開直後から complete/start を観測可能
- Evidence quality: 5/10 — 現時点では制作工程上の仮説。実利用の完了率が必要

Total: 57/70

Riskiest assumption: 制作者がフォントアセット作成前に、複数画面の文言をまとめてグリフTXTへ変換する独立ツールを使うか。
Validation: 文章入力 → NFC正規化 → 重複除去 → 文字種分類 → 想定収録範囲との照合 → TXT/JSON出力を実装し、混在言語・結合文字・空入力を自動テストする。
Status: PARTIAL — ロジックと成果物生成は検証できたが、実利用需要は未検証。
