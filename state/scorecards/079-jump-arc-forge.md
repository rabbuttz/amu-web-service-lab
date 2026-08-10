# 079 Jump Arc Forge

- Status: VALIDATED
- Category: Unity / Web game movement tooling
- User fit: 5/5 — Unity・Webゲームのジャンプ、投射、演出移動の初期設計に直結
- Revenue or hours saved: 3/5 — 軌道ごとの初速調整と試行再生を数往復減らす仮説
- Differentiation: 4/5 — 射角指定ではなく着地点の高低差と望む頂点から逆算し、軌道サンプルとUnity値を同時出力
- Cost to validate: 5/5 — 静的ブラウザ実装とNode純粋ロジックテストのみ
- Reversibility / downside: 5/5 — ローカル計算でプロジェクトを変更せず、出力採用は任意
- Time to evidence: 5/5 — 初期サンプルで着地点誤差と軌道を即時確認可能
- Evidence quality: 4/5 — 着地点、高点、対称軌道、入力検証を自動テスト。Unity Rigidbodyへの再取込は未検証

## Risk tested

頂点高度を先に決める逆算で、高低差のある着地点へ十分な精度で到達する初速と飛行時間を一意に作れるか。解析解の終端誤差、平地軌道の対称時間、軌道サンプル数をNodeテストで確認する。

## Hypothesis

水平距離・着地高低差・通したい頂点から一定重力下の初速と飛行時間を逆算し、軌道JSONとUnity向け開始値を持ち帰れれば、ゲーム制作者がジャンプや投射軌道を再生しながら調整する往復を減らせる。
