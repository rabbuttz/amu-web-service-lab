# 076 Contact Sheet Studio — Opportunity Scorecard

- User fit: 9/10 — Unity/Web制作の画面比較、デザイン案、検証証跡を共有用の一枚へまとめる用途に直結
- Potential impact: 7/10 — 画像編集ソフトでの配置・縮小・ラベル付けを置き換える
- Differentiation: 7/10 — 複数形式を端末内処理し、元比率を保った比較PNGと配置JSONを同時生成
- Cost to validate: 9/10 — 静的サイトとCanvas APIのみ
- Reversibility/downside: 10/10 — ログイン、画像送信、外部依存なし
- Time to first evidence: 9/10 — 複数画像を選ぶだけで完成PNGを確認できる
- Evidence quality: 8/10 — レイアウト計算を純粋ロジックで検証し、実ブラウザで画像読込・描画・保存を確認可能
- Total: 59/70

## Riskiest assumption

縦横比が異なる複数画像でも、拡大せずセル内へ収めるだけでレビューに使える読みやすい比較シートになるか。横長・縦長・小画像を混在させ、配置寸法と出力PNGを検証する。

## Result

VALIDATED — レイアウト、比率維持、拡大防止、行列計算、配置JSONをNodeテストで確認。実ブラウザで横長・縦長・正方形のサンプル3枚を読み込み、2列×2行・916×712pxのCanvas描画、PNG保存ボタン有効化、JavaScriptエラー0件を確認した。
