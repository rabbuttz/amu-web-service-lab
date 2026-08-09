# 060 Loop Root Guard — Opportunity scorecard

- Candidates considered: revenue — UnityアニメーションQA補助、time reduction — Root Transformループ境界監査、quality of life — 長時間作業の休憩ペース可視化。
- User fit: 9/10 — Unityゲーム制作とWeb可視化の知識を、アニメーション取り込み時の境界監査へ転用できる
- Revenue / hours saved: 6/10 — 仮定として、ループ瞬間の位置跳ね・速度変化・回転不連続を実機で切り分ける15〜40分を減らす
- Differentiation: 8/10 — Loop Seam Labは音声境界、Animation Event Guardはイベント時刻、本案はRoot Transform座標と速度の境界を扱う
- Validation cost: 9/10 — 時系列座標から終端差、境界速度差、最短Yaw差、線形補正案を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。足滑りやAnimator上の見た目を代替しないことを明記
- Time to evidence: 9/10 — 5列CSVから軌跡、境界監査、補正後座標、JSONを即時生成できる
- Evidence quality: 7/10 — 境界計算はテスト済みだが、Unity AnimationClipからの自動抽出と実機の見た目は未検証

Total: 57/70

Status: VALIDATED — CSVパーサー、時間順検証、位置終端差、速度差、359°境界を跨ぐYaw差、In-place補正、Root Motionモード、JSON出力を純粋ロジックで検証。Unity上の足滑りとLoop Pose適用結果は未検証。
