# 078 Path Pace Lab

- Status: VALIDATED
- Category: Unity / Web game path tooling
- User fit: 5/5 — Unity・Webゲームのカメラ、敵、演出オブジェクトの経路移動設計に直結
- Revenue or hours saved: 3/5 — ベジェ移動の速度むらを実機で見つけて補正する往復を、1経路あたり数分減らす仮説
- Differentiation: 4/5 — 制御点表示だけでなく等時間点と弧長近似による等距離点を重ね、実装用CSVを出す
- Cost to validate: 5/5 — 静的ブラウザ実装とNode純粋ロジックテストのみ
- Reversibility / downside: 5/5 — ローカル処理で原データを変更せず、近似点の採用も任意
- Time to evidence: 5/5 — 初期サンプルで速度むらと補正差を即時確認可能
- Evidence quality: 4/5 — 直線長、端点、曲線の変動係数改善を自動テスト。Unityへの再取込は未検証

## Risk tested

3次ベジェの高密度弧長テーブルを逆引きするだけで、等しいt刻みの速度むらを実用上十分に均せるか。既知曲線で区間距離の変動係数が10分の1未満になり、直線の経路長と端点も保持されることをNodeテストで確認する。

## Hypothesis

3次ベジェ経路の等時間移動による区間距離差を可視化し、等距離の座標・t・累積距離CSVを持ち帰れれば、Unity・Webゲーム制作者が経路移動の不意な加減速を実機で調整する手戻りを減らせる。
