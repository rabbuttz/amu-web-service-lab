# 068 Release Gate Deck

- User fit: 5/5 — UnityゲームとWebサービスを短い周期で更新する際の回帰確認計画に直結
- Revenue or hours saved: 4/5 — リリースごとに15〜30分のテスト項目整理を削減し、重大退行の見落としを減らす仮説
- Differentiation: 4/5 — 汎用チェックリストではなく変更リスク、環境重要度、共有タグ、時間予算を組み合わせて実行項目を選ぶ
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — 無料、ログイン不要、入力は端末内。自動テストの代替ではなく優先順位付けに限定
- Time to evidence: 5/5 — 入力直後に採用項目、使用時間、変更・環境カバー率を表示
- Evidence quality: 4/5 — 優先順位、予算上限、入力検証、Markdown出力を純粋ロジックテスト
- Total: 32/35

Riskiest assumption: 変更領域と対象環境の共有タグを手動で少数付ける負担より、回帰テストを毎回ゼロから組む負担の方が大きいこと。主要指標 complete/start で確認する。

Status: VALIDATED — リスク×重要度×関連タグの優先順位、時間予算内の選択、カバー率、Markdown/JSON出力を実装。実需要は公開後の指標待ち。
