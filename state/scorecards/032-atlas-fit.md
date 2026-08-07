# 032 Atlas Fit

- Status: VALIDATED
- User fit: 5/5 — Unityを含む2Dゲーム制作とUI素材のアトラス設計に直結
- Revenue / hours saved: 3/5 — 素材一覧からAtlas候補を組み直して容量超過を確認する初期検討を1回10〜20分短縮する仮説
- Differentiation: 4/5 — 枚数展開、余白・押し出し、90度回転、格納不能判定を同じ試算で扱い、配置JSONを保存
- Cost to validate: 5/5 — 静的ブラウザアプリ、外部依存なし
- Reversibility / downside: 5/5 — ローカル処理のみ。実エンジンのパッカーとの差を明記
- Time to evidence: 5/5 — サンプルから即時に必要ページ数、充填率、配置プレビューを表示
- Evidence quality: 3/5 — 純粋ロジック16件とローカルブラウザでの144枚梱包・配置描画を検証済み。Unity Sprite Atlasの実出力との誤差比較は未検証

仮説: スプライト寸法・枚数・余白から必要アトラス数と格納不能素材を事前試算して配置JSONに残せれば、ゲーム制作者が素材追加後のページ増加とメモリ設計の手戻りを減らせる。

観測ループ: 素材寸法入力 → 梱包試算 → 必要ページ・充填率・格納不能を確認 → 配置JSON保存。CounterAPIのcomplete/startを主要指標にする。
