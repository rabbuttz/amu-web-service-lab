# 027 Asset Path Guard

- Candidate: 素材ファイル名の移植性と衝突を取り込み前に監査するツール
- User fit: 5/5 — Unityゲーム・Web制作で大量の画像、音声、3D素材を扱う工程に直結
- Revenue or hours saved: 4/5 — OS差やGit上の大文字小文字衝突による取り込み後の修正を事前に減らせる
- Differentiation: 4/5 — パス一覧だけで予約名、危険記号、case collision、拡張子表記を同時検査し改名案まで生成
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — ファイルを直接変更せず、入力送信もなし
- Time to evidence: 4/5 — 監査開始率と改名案生成完了率を即時計測
- Evidence quality: 3/5 — 名前規則は単体検証済みだが、実プロジェクトの参照切れ削減は未評価

Riskiest assumption: 制作者がファイル操作を許可せず、パス一覧の貼り付けだけでも取り込み前監査を使うか。`complete/start` で確認する。

Status: VALIDATED locally when logic and browser tests pass; public runtime must be verified after deployment.
