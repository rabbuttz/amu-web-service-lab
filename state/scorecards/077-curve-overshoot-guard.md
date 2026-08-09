# 077 Curve Overshoot Guard

- Status: VALIDATED
- Category: Unity / game animation tooling
- User fit: 5/5 — Unity制作のAnimationCurve調整と実装前監査に直結
- Revenue or hours saved: 3/5 — 接線由来の一瞬の跳ねを再生・目視で探す往復を1曲線あたり数分削減する仮説
- Differentiation: 4/5 — キー値比較ではなくHermite導関数の根から区間内極値を厳密検出し、単調補正CSVまで出す
- Cost to validate: 5/5 — 静的ブラウザ実装とNode純粋ロジックテストのみ
- Reversibility / downside: 5/5 — ローカル処理、補正採用は任意、原データを書き換えない
- Time to evidence: 5/5 — サンプルを初期表示し即比較可能
- Evidence quality: 4/5 — 解析式と既知のオーバーシュート／補正ケースをテスト。Unityへの再取込は未検証

## Risk tested

Hermite区間の導関数（二次式）の区間内根を求めることで、サンプリング漏れなくキー値範囲外の極値を検出できるか。既知ケースで最大超過を検出し、単調接線制限後に問題区間が0になることをNodeテストで確認した。

## Hypothesis

Unity AnimationCurveのキー時刻・値・接線をCSVで監査し、意図しないオーバーシュート区間と単調補正候補を可視化できれば、制作者が一瞬の位置・音量・パラメータ跳ねを再生しながら探す手戻りを減らせる。
