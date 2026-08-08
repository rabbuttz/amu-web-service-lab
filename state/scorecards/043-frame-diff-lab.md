# 043 Frame Diff Lab

- Category: game/Web creator workflow
- User fit: 5/5 — UnityゲームとWebサービスの画面更新確認に直接使える
- Impact: 4/5 — 目視比較で見落としやすいUI変化を領域座標まで絞れる
- Differentiation: 5/5 — 既存画像ツールは切り抜き・縮小・余白・継ぎ目を扱い、本案だけが更新前後の視覚回帰を比較する
- Validation cost: 5/5 — Canvasと決定的なRGBA差分計算だけで検証可能
- Reversibility/downside: 5/5 — ログイン・アップロード・外部依存なし
- Time to evidence: 5/5 — 変更箇所を持つ生成サンプルが初期表示され、即座に比較できる
- Evidence quality: 3/5 — 差分計算とブラウザ表示は検証できるが実利用需要は未検証
- Total: 32/35

Riskiest assumption: 画素差を変更率・領域・ヒートマップで同時表示すると、制作者が意図しない画面変化を目視だけより短時間で発見できるか。
Spike: 権利安全な生成UIの更新前後を比較し、しきい値調整、変更領域、監査JSONを出力する。
Status: PARTIAL（純粋ロジックとローカル実行を検証後、公開URLで最終確認する。実利用需要は未検証）
