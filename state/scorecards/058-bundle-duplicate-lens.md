# 058 Bundle Duplicate Lens — Opportunity scorecard

- Candidates considered: revenue — 制作物の容量監査レポート、time reduction — Bundle重複容量の事前監査、quality of life — 日次作業の中断コスト記録。
- User fit: 9/10 — Unity系ゲーム制作とWeb実装の知識を、Addressables・AssetBundleのビルド容量監査へ転用できる
- Revenue / hours saved: 7/10 — 仮定として、Build Layoutを手集計して重複依存を探す30〜90分と、候補を見落とした再ビルドを減らす
- Differentiation: 8/10 — Asset Path Guardはパス互換性、本案はBundle横断の同一アセット容量と共有化候補を扱う
- Validation cost: 9/10 — Bundle/Asset/Size一覧から総容量、重複削減量、比率、サイズ差を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。共有化による依存・ロード・キャッシュ更新の副作用を明記
- Time to evidence: 9/10 — 3列CSVから削減量順の候補とJSONを即時表示できる
- Evidence quality: 7/10 — 集計ロジックはテスト済みだが、Unity Build Layoutの直接読込と実ビルド削減量は未検証

Total: 58/70

Status: VALIDATED — パーサー、Bundle別集計、重複削減量、サイズ差、候補しきい値、入力検証、JSON出力を純粋ロジックで検証。Unityの圧縮ブロック、依存構造、ランタイムロードは未検証。
