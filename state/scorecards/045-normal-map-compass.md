# 045 Normal Map Compass

- Status: VALIDATED
- Candidate: 法線マップのベクトル品質とGreen方向を照明比較で監査し、反転PNGとJSONを作る。
- User fit: Unity・ゲーム制作の画像パイプライン知識を再利用でき、公開前の素材確認を端末内で完結する。
- Revenue / time hypothesis: 1素材あたりエンジンへの取り込み・設定変更・再確認を5〜15分削減。無料利用の需要を先にcomplete/startで検証する（推定）。
- Differentiation: 単なるチャンネル反転ではなく、ベクトル長・後ろ向き画素の集計、同一照明での反転前後比較、監査JSONを一画面に統合。
- Validation cost: 低。Canvasと純粋JavaScriptのみ。
- Reversibility / downside: 静的ファイルのみで継続費なし。Y方向は画像だけで断定不能なため、視覚比較として明示。
- Time to evidence: 公開直後からstartとcompleteを観測可能。
- Evidence quality: 純粋ロジック7テストと実ブラウザ操作、公開HTTP/UIで検証予定。
- Scores (10 max): fit 9, impact 7, differentiation 7, validation cost 9, reversibility 10, time to evidence 9, evidence quality 8.
