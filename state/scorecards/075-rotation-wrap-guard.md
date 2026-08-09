# 075 Rotation Wrap Guard — Opportunity Scorecard

- User fit: 9/10 — Unityゲーム制作で扱うカメラ・ボーン・オブジェクト回転の跳ね調査に直結
- Potential impact: 7/10 — Euler折返しと実回転スパイクを分け、Animation Curveやログの確認区間を絞れる
- Differentiation: 8/10 — 生のEuler差だけでなくQuaternion最短角、角速度、角加速度、補正CSVを一画面で出す
- Cost to validate: 9/10 — 静的サイトと端末内計算のみ
- Reversibility/downside: 10/10 — ログイン、ファイル送信、外部依存なし
- Time to first evidence: 9/10 — CSV貼付後すぐに区間別の監査結果が出る
- Evidence quality: 7/10 — 数学的な最短角は検証できるが、UnityのEuler適用順・補間・接線は別途確認が必要
- Total: 59/70

## Riskiest assumption

Eulerの±180°境界と実際の急回転を分離するだけでデバッグ対象を十分に絞れるか。サンプルに折返しと真の急旋回を併存させ、両者が別の判定になることを純粋ロジックテストで確認する。

## Result

VALIDATED — CSV解析、最短角アンラップ、Quaternion角差、折返し分類、速度スパイク、補正CSV、入力検証をNodeテストで確認。ブラウザ表示と公開環境は公開後に別途確認する。
