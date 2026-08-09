# 064 GC Pace Meter

- User fit: 5/5 — Unityゲーム最適化の知識とブラウザ完結監査ツールを再利用
- Revenue or hours saved: 3/5 — Profiler結果の手集計とGC対策優先順位付けを1回15〜30分削減する仮説
- Differentiation: 4/5 — GC Allocの1回量・頻度を、回収周期・フレーム影響・寄与率へ同時換算
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — 無料、ログイン不要、入力は端末内
- Time to evidence: 5/5 — 初回操作で結果表示
- Evidence quality: 3/5 — 換算ロジックは自動テスト可能。実際のGC閾値は環境依存で編集値として分離
- Total: 30/35

Riskiest assumption: 制作者がProfilerのGC Alloc一覧を実装変更前に頻度ベースで集計したいこと。主要指標 complete/start で確認する。

Status: VALIDATED — 割り当て速度、回収間隔、フレーム影響、寄与率を純粋ロジックテストで検証。実需要は公開後の指標待ち。
