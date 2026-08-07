# 035 Camera Envelope

- Status: VALIDATED
- User fit: 5/5 — Unityを含む非Resonite 2Dゲーム制作とマルチ端末対応に直結
- Revenue / hours saved: 3/5 — 端末比率ごとのGame View確認と画角計算を1調整あたり10〜20分短縮する仮説
- Differentiation: 4/5 — 必要ワールド範囲、固定Orthographic Size、端末別欠け、Fit値、画素密度を同じプレビューで比較
- Cost to validate: 5/5 — 静的ブラウザアプリ、外部依存なし
- Reversibility / downside: 5/5 — 数値は端末内処理。Safe AreaやPixel Perfect Cameraは対象エンジンで確認が必要と明記
- Time to evidence: 5/5 — 初期値で縦長スマホからウルトラワイドまで即時比較
- Evidence quality: 4/5 — 純粋ロジック19件で縦横比、表示範囲、横・縦欠け、Fit値、画素密度、Unityコード出力を検証。Unity実機統合は未検証

仮説: 2Dゲームの必要ワールド範囲を端末比率ごとに比較し、欠けと必要Orthographic SizeをJSON・Unity C#に残せれば、制作者が画角崩れの実機確認と再計算にかける時間を減らせる。

観測ループ: 必要範囲とカメラ値を入力 → 端末を選択 → 画角監査 → JSONまたはUnity C#を取得。CounterAPIのcomplete/startを主要指標にする。
