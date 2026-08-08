# 041 Alpha Margin Lab

- Category: game creator workflow
- User fit: 5/5 — 2D素材とUnity系制作の実務に直接使える
- Impact: 4/5 — フレーム別の手作業確認を短縮
- Differentiation: 4/5 — Pivot Patrolは座標値、Tile Seam Labは端の連続性、本案は画像内アルファ境界を監査
- Validation cost: 5/5 — ブラウザ内Canvasだけで検証可能
- Reversibility/downside: 5/5 — ログイン・アップロード・外部依存なし
- Time to evidence: 5/5 — サンプル生成直後に監査可能
- Evidence quality: 3/5 — ロジック検証は可能だが実利用需要は未検証
- Total: 31/35

Riskiest assumption: 余白のばらつきとセル端接触の同時表示が、個別目視より有用か。
Spike: 生成サンプルで不統一余白と端接触を検出し、JSONへ出力する。
Status: VALIDATED（監査ロジックとブラウザ操作を検証予定。市場需要は未検証）
