# 059 Blend Space Compass — Opportunity scorecard

- Candidates considered: revenue — Unityモーション設計レビュー補助、time reduction — 2D Blend Tree座標の方向監査、quality of life — 日常タスクの優先度摩擦を減らすミニ整理盤。
- User fit: 9/10 — Unityゲーム制作とWeb可視化の知識を、Animatorの2D Blend Tree設計監査へ転用できる
- Revenue / hours saved: 6/10 — 仮定として、Blend Tree配置の目視確認と不足方向を実機往復で探す15〜45分を減らす
- Differentiation: 8/10 — Animation Event Guardはイベント時刻、本案は2Dモーション座標の方向空白・対向性・中心重複を扱う
- Validation cost: 9/10 — 2D座標から角度間隔、対向誤差、半径ばらつき、重複を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。Unityの補間重みや見た目を代替しないことを明記
- Time to evidence: 9/10 — 3列CSVから配置図、監査表、JSONを即時生成できる
- Evidence quality: 7/10 — 幾何監査はテスト済みだが、Unity Animator Controllerの直接読込と実機モーション品質は未検証

Total: 57/70

Status: VALIDATED — パーサー、中心分離、角度の最大空白、0度境界、対向ペア、8方向区分、同一座標、入力検証、JSON出力を純粋ロジックで検証。Unityの補間とモーション品質は未検証。
