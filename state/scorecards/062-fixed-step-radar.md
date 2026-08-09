# 062 Fixed Step Radar — Opportunity scorecard

- Candidates considered: revenue — Unity物理パフォーマンス診断補助、time reduction — FixedUpdate追いつき監査、quality of life — 作業中断復帰メモ。
- User fit: 9/10 — Unityゲーム制作と時系列可視化を、固定更新の初期QAへ転用できる
- Revenue / hours saved: 6/10 — 仮定として、重いフレーム後のFixedUpdate多重実行と時間欠落をProfilerだけで切り分ける10〜30分を減らす
- Differentiation: 8/10 — Frame Budget LabはCPU/GPU予算、本案はフレーム列から固定更新の実行回数と時間上限の影響を扱う
- Validation cost: 9/10 — accumulator、steps、上限超過時間、simulation lagを純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。実機Profilerを代替しないことを明記
- Time to evidence: 9/10 — フレーム時間列から多重更新・更新なし・時間欠落を即時可視化できる
- Evidence quality: 7/10 — 時系列計算はテスト可能だが、FixedUpdate処理時間とUnity版固有挙動は未検証

Total: 57/70

Status: VALIDATED — フレーム列の解析、accumulator繰越、固定更新数、Maximum Delta Time超過、simulation lag、入力検証、JSON出力を純粋ロジックで検証。Unity実機の処理時間とtimeScaleは未検証。
