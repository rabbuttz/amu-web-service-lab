# 065 Build Delta Lens

- User fit: 5/5 — Unityゲーム開発とブラウザ完結の制作監査ツールを再利用
- Revenue or hours saved: 4/5 — リリース前のビルド容量増加調査を1回20〜60分削減する仮説
- Differentiation: 4/5 — 旧版・新版をパスで照合し、追加・削除・変更とカテゴリ寄与を同時表示
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — 無料、ログイン不要、入力は端末内
- Time to evidence: 5/5 — 2つの一覧を貼ると即時に結果表示
- Evidence quality: 4/5 — バイト差分と分類を自動テスト。圧縮後容量やBundle内部依存は対象外と明示
- Total: 32/35

Riskiest assumption: 制作者がビルド間のファイル一覧を用意でき、カテゴリ集計より上位差分ファイルの特定を必要としていること。主要指標 complete/start で確認する。

Status: VALIDATED — 単位解析、パス照合、追加・削除・変更、カテゴリ集計、入力エラーを純粋ロジックテストで検証。実需要は公開後の指標待ち。
