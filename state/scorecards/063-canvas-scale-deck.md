# 063 Canvas Scale Deck

- User fit: 5/5 — Unityゲーム/UI制作とブラウザ完結ツールを再利用
- Revenue or hours saved: 3/5 — 端末別Canvas Scaler確認と実機往復を1案件30〜60分削減する仮説
- Differentiation: 4/5 — Unityの対数補間、Canvas可視領域、UI部品pxを同じ表で確認
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — 無料、ログイン不要、入力は端末内
- Time to evidence: 5/5 — 初回操作で結果表示
- Evidence quality: 3/5 — UnityのScale With Screen Size式を再現したロジックテスト。実利用需要は未検証
- Total: 30/35

Riskiest assumption: 制作者が端末別のUI表示px比較を実装前に必要としていること。主要指標 complete/start で確認する。

Status: VALIDATED — 代表解像度で倍率・Canvas領域・しきい値判定を自動テストし、ブラウザUIをローカル確認する。実需要は公開後の指標待ち。
