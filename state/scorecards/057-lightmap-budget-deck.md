# 057 Lightmap Budget Deck — Opportunity scorecard

- Candidates considered: revenue — 小規模案件の検収見積、time reduction — ライトマップ予算試算、quality of life — 制作再開時の判断ログ。
- User fit: 9/10 — Unity系ゲーム制作とWeb実装の知識を、3Dシーンのベイク前予算設計へ転用できる
- Revenue / hours saved: 7/10 — 仮定として、Lightmap Resolutionを変えて再ベイクする10〜40分単位の試行を、面グループ別の事前試算で減らす
- Differentiation: 8/10 — Atlas Fitは2Dスプライト配置、本案はワールド面積・テクセル密度・形式からライトマップ枚数とメモリを扱う
- Validation cost: 9/10 — 面積、必要テクセル、atlas切り上げ、占有率、予算内密度を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。UV形状と実パッカー効率を単純化した概算と明記
- Time to evidence: 9/10 — サンプルシーンから枚数、メモリ、負荷上位と予算内密度を即時表示できる
- Evidence quality: 7/10 — 算術モデルはテスト済みだが、Unityの実ベイク結果との差と作業時間短縮は未検証

Total: 58/70

Status: VALIDATED — パーサー、テクセル面積、atlas枚数、占有率、密度予算、入力検証、JSON出力を純粋ロジックで検証。UnityのUVパッキングとベイク結果は未検証。
