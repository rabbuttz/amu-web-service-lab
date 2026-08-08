# 046 Channel Packer

- Status: VALIDATED
- Candidate: 4枚の白黒マップを任意のRGBAチャンネルへ割り当て、反転・定数設定付きでPNGとJSONにまとめる。
- User fit: Unity・ゲーム制作のテクスチャパイプライン知識を再利用でき、素材変換をログインやアップロードなしで完結する。
- Revenue / time hypothesis: 1テクスチャセットあたり画像編集ソフトでのチャンネル操作と確認を5〜10分削減（推定）。無料利用の需要をcomplete/startで検証する。
- Differentiation: 各入力の輝度/R/G/B/A読取、反転、未使用時定数、異寸法リサンプル、出力統計、設定JSONを一画面に統合。
- Validation cost: 低。Canvasと純粋JavaScriptのみ。
- Reversibility / downside: 静的ファイルのみで継続費なし。色空間とエンジン圧縮は利用先依存として明示。
- Time to evidence: 公開直後からstartとcompleteを観測可能。
- Evidence quality: 純粋ロジック7テスト、実ブラウザ操作、公開HTTP/UIで検証予定。
- Scores (10 max): fit 9, impact 7, differentiation 8, validation cost 9, reversibility 10, time to evidence 9, evidence quality 8.
