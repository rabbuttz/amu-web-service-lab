# Opportunity Scorecard — Save Weight Radar

- User fit: 9/10 — Unity・Webゲーム開発と、ローカル処理だけで完結する公開ツール群を直接再利用できる
- Revenue / hours saved: 7/10 — セーブ肥大化やクラウド上限事故の調査を1回30〜90分短縮する仮説
- Differentiation: 8/10 — JSON整形ではなく、パス別容量・保存枠・履歴・日次成長を同じ画面で扱う
- Cost to validate: 9/10 — 静的HTMLと純粋JavaScriptのみ
- Reversibility / downside: 10/10 — ログイン・外部保存・有料依存なし
- Time to first evidence: 9/10 — サンプルを開いた直後に監査結果を確認可能
- Evidence quality: 7/10 — TextEncoderによる実JSONのUTF-8 byte数は実測。実際の圧縮・暗号化・プラットフォーム上限は入力条件に依存
- Total: 59/70

Riskiest assumption: 制作者がスキーマ差分だけでなく、実データの容量内訳と成長予測を単独ツールで確認したいか。complete/startで初期検証する。

Status: VALIDATED — 純粋ロジックでUTF-8容量、枠・履歴込み総量、大きいパス、上限到達日を検証し、ブラウザで観測可能な監査ループを実装した。
