# 029 Voice Ceiling

- Status: VALIDATED
- User fit: 5/5 — Unityを含むゲーム制作の音声実装前レビューに直結
- Revenue / hours saved: 3/5 — 音が消える場面の再現と優先度調査を1回15〜30分短縮する仮説
- Differentiation: 4/5 — 時系列イベントを全体・グループ上限と優先度によるvoice stealingまで含めて監査
- Cost to validate: 5/5 — 静的ブラウザアプリ、外部依存なし
- Reversibility / downside: 5/5 — ローカル処理のみ。実エンジンの距離減衰やミキサー挙動は未再現と明記
- Time to evidence: 5/5 — サンプルから即時に自然ピーク、欠落率、個別判定を表示
- Evidence quality: 3/5 — 13件の純粋ロジック検証済み。実プロジェクトのイベントログとの整合性は未検証

仮説: 音声イベント表から同時発音ピークと欠落・途中停止する音を可視化すれば、ゲーム制作者が実機で断続的に音が消える問題の調査を減らせる。

観測ループ: イベント入力 → 上限と優先度で監査 → 個別の発音判定 → JSON保存。CounterAPIのcomplete/startを主要指標にする。
