# 030 Pool Pressure

- Status: VALIDATED
- User fit: 5/5 — Unityを含むゲーム制作で頻出するオブジェクトプールの初期容量設計に直結
- Revenue / hours saved: 3/5 — 敵・弾・エフェクトの重複ピークを手計算する作業を1回15〜30分短縮する仮説
- Differentiation: 4/5 — 複数ウェーブの継続生成・生存時間・初回バーストを重ね、容量超過まで時系列で試算
- Cost to validate: 5/5 — 静的ブラウザアプリ、外部依存なし
- Reversibility / downside: 5/5 — ローカル処理のみ。生成ゆらぎや実メモリは未再現と明記
- Time to evidence: 5/5 — サンプルから即時に需要ピーク、超過率、余裕込み推奨数を表示
- Evidence quality: 3/5 — 14件の純粋ロジック検証済み。実プロジェクトのProfiler値との整合性は未検証

仮説: 生成ウェーブから同時使用ピークと容量超過を可視化すれば、ゲーム制作者がプール不足による生成欠落と過剰確保を実装前に減らせる。

観測ループ: ウェーブ入力 → 現在容量で試算 → 不足数と推奨値を確認 → JSON保存。CounterAPIのcomplete/startを主要指標にする。
