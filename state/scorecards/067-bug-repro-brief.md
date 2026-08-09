# 067 Bug Repro Brief

- User fit: 5/5 — UnityゲームとWebサービスの開発・受託で繰り返す不具合切り分けと引き継ぎに直結
- Revenue or hours saved: 4/5 — 1件あたり10〜30分の聞き直しと再現条件整理を削減する仮説
- Differentiation: 4/5 — テンプレート配布だけでなく情報充足度を採点し、未確認条件から次の比較実験を生成
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — 無料、ログイン不要、入力は端末内。機密情報を貼らない注意を表示
- Time to evidence: 5/5 — 記入直後にスコア、欠落、切り分け、Markdownを表示
- Evidence quality: 4/5 — 完全例・不足例・入力上限・Markdown/JSON出力を自動テスト
- Total: 32/35

Riskiest assumption: 原因推定より前に、再現頻度・版境界・最短手順・期待/実際を構造化することが、ゲーム/Web開発の往復確認を減らすこと。主要指標 complete/start で確認する。

Status: VALIDATED — 100点満点の充足度判定、欠落抽出、条件別の切り分け提案、Markdown/JSON化を純粋ロジックテストで検証。実需要は公開後の指標待ち。
