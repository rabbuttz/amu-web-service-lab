# 048 Alpha Mip Guard

- Status: VALIDATED
- Idea: カットアウト画像のミップ縮小によるアルファ被覆損失と補正Cutoffを端末内で監査する。
- User fit: Unity系ゲーム制作、画像処理、クリエイター向け小型ツールという既存の強みを再利用できる。
- Revenue / time hypothesis: 1素材あたり5〜15分のエンジン往復確認を事前監査へ置き換える想定。無料公開段階では売上仮説なし。
- Differentiation: 単なる画像縮小ではなく、Alpha Cutoff後の面積損失とレベル別の被覆保持候補を同時提示する。
- Validation cost: 低。Canvasと純粋JSのみ。
- Reversibility / downside: 高い可逆性。画像は外部送信せず、2×2平均の近似である限界を明記。
- Time to evidence: start/visitor、complete/startを公開後24時間かつvisitor 5以上で確認。
- Evidence quality: ロジック単体テストと実ブラウザ操作で確認。実エンジン固有フィルタは未検証。
- Score: user fit 5/5, impact 3/5, differentiation 4/5, validation cost 5/5, reversibility 5/5, time to evidence 4/5, evidence 3/5 = 29/35.
