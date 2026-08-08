# 042 Texture Budget Lens

- Category: game creator workflow
- User fit: 5/5 — Unity系のゲーム制作と2D素材最適化に直接使える
- Impact: 4/5 — Import Settingsを実機で反復する前に候補を絞れる
- Differentiation: 4/5 — Atlas Fitは詰め込み枚数、Load Windowは配信時間、本案は単一テクスチャの縮小品質とGPU容量を比較
- Validation cost: 5/5 — Canvasと決定的な容量計算だけで検証可能
- Reversibility/downside: 5/5 — ログイン・アップロード・外部依存なし
- Time to evidence: 5/5 — サンプル画像が初期表示され、4段階を即比較可能
- Evidence quality: 3/5 — 容量計算とブラウザ表示は検証できるが実利用需要は未検証
- Total: 31/35

Riskiest assumption: Max Size別の見た目とミップ込み容量を同じ画面で並べると、制作者が品質と容量の妥協点を短時間で選べるか。
Spike: 権利安全な生成サンプルを2048/1024/512/256へ縮小し、形式別容量、細部保持率、JSONを出力する。
Status: VALIDATED（純粋ロジック15項目、公開URL HTTP 200、公開ブラウザで4カード・4 Canvas・エラーなしを確認。生成サンプルのASTC 6×6・ミップ込み概算はMax 2048で836.4 KiB、1024で342.7 KiB、512で86.2 KiB、256で21.7 KiB。市場需要は未検証）
