# 033 Layer Sieve

- Status: VALIDATED
- User fit: 5/5 — Unityを含むゲーム制作の物理レイヤー設計と当たり判定デバッグに直結
- Revenue / hours saved: 3/5 — 衝突表の目視確認と実機での接触漏れ調査を1回10〜30分短縮する仮説
- Differentiation: 4/5 — レイヤー役割をactor/world/projectile/trigger/sensor/uiとして監査し、孤立・役割矛盾・高密度設定を同時検出
- Cost to validate: 5/5 — 静的ブラウザアプリ、外部依存なし
- Reversibility / downside: 5/5 — 入力はローカル処理。実行時設定と2D/3D差は対象外と明記
- Time to evidence: 5/5 — サンプルを即時監査し、マトリクス操作ごとに結果を更新
- Evidence quality: 3/5 — 純粋ロジック20件で解析・ペア正規化・役割監査・C#生成・JSONを検証。Unityプロジェクトへの適用は未検証

仮説: 物理レイヤーの役割と衝突表を同時監査して孤立・役割矛盾・過密設定をJSONとUnity C#に残せれば、ゲーム制作者が当たり判定の抜けや不要接触を実機デバッグする手戻りを減らせる。

観測ループ: レイヤー入力 → 衝突表生成・編集 → 監査結果確認 → JSON保存またはUnity C#コピー。CounterAPIのcomplete/startを主要指標にする。
