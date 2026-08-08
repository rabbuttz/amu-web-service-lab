# 044 Loop Seam Lab

- Category: game/audio creator workflow
- User fit: 5/5 — Unityゲーム用BGM・環境音のループ素材準備に直接使える
- Impact: 4/5 — 継ぎ目の試行錯誤を候補探索とWAV書き出しまで短縮する
- Differentiation: 5/5 — 既存SFX合成サービスと異なり、手持ち音声のループ境界監査と修正を扱う
- Validation cost: 4/5 — Web Audioと決定的な波形演算で検証可能
- Reversibility/downside: 5/5 — ログイン・アップロード・外部依存なし
- Time to evidence: 5/5 — 意図的な継ぎ目を持つ生成サンプルで即時確認できる
- Evidence quality: 3/5 — 境界演算と書き出しは検証できるが実素材での需要は未検証
- Total: 31/35

Riskiest assumption: 振幅・傾きの合成スコアと近傍探索が、耳だけで開始・終了点を探すより速くクリックノイズを減らせるか。
Spike: 生成音／ローカル音声を波形表示し、境界スコア、低ノイズ候補、ループ試聴、末尾クロスフェード済みWAVを提供する。
Status: VALIDATED（純粋ロジック8項目、ローカルHTTP 200、実ブラウザで生成音の境界スコア100→6への改善、3.045秒・末尾10msクロスフェードWAV書き出し、JavaScriptエラーなしを確認。実利用需要は未検証）
