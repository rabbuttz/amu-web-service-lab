# 022 Onboarding Pulse scorecard

- Candidate: ゲームのチュートリアル進行を説明・練習・確認・報酬の時間軸で監査するブラウザツール
- User fit: 5/5 — Unity/Webゲームのオンボーディング設計と実装前レビューへ直接転用できる
- Revenue / hours saved: 3/5 — プレイテスト前に未確認操作と説明過多を発見し、初期レビュー往復を減らす仮説
- Differentiation: 4/5 — 操作概念ごとの teach → practice → test 導線と受動時間を同時に検査する
- Cost to validate: 5/5 — 静的サイトと純粋ロジックだけで検証可能
- Reversibility / downside: 5/5 — 無料・端末内処理・外部依存なし
- Time to evidence: 5/5 — 診断開始率と設計JSON出力完了率を即時計測可能
- Evidence quality: 2/5 — 閾値は編集可能な設計仮定で、実利用データは未取得
- Total: 29/35

Riskiest assumption: ゲーム制作者が実装前にチュートリアルの操作導線を構造化して監査するか。`complete/start` と再訪代理 `view/visitor` で確認する。
