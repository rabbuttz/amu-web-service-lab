# 074 Audio Rolloff Lab — Opportunity Scorecard

- User fit: 9/10 — Unity・Webゲーム制作で頻出する3D音源の初期設計に直結
- Potential impact: 7/10 — 音源ごとのMin / Max Distanceと減衰カーブを表計算・実機往復の前に絞れる
- Differentiation: 8/10 — 単なる逆二乗計算ではなく、環境ノイズと識別余裕から可聴距離を出し、Linear / Logarithmic / Customを同一グラフで比較
- Cost to validate: 9/10 — 静的サイトと端末内計算のみ
- Reversibility/downside: 10/10 — ログイン、音声取得、外部依存、入力送信なし
- Time to first evidence: 9/10 — 初期値のまま即時にグラフと設定メモが出る
- Evidence quality: 7/10 — dB比とカーブ計算は検証可能だが、遮蔽・残響・周波数・実機ミックスは別途確認が必要
- Total: 59/70

## Riskiest assumption

音源レベルと環境ノイズを用いた簡易可聴距離が設定検討に役立つか。値を絶対的な聴感予測とはせず、モデル間比較と初期設定の候補に限定し、遮蔽・残響・端末音量・同時発音を含まないことをUI内に明記した。

## Result

VALIDATED — 距離端点、Linear中点、gain→dB変換、識別可能距離、−6dB地点、モデル比較、Custom曲線、入力検証をNodeテストで確認。ブラウザ表示と公開環境は公開後に別途確認する。
