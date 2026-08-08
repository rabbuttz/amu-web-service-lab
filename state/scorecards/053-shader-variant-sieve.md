# 053 Shader Variant Sieve — Opportunity scorecard

- Candidates considered: revenue — 継続契約の最低月額試算、time reduction — シェーダーバリアント組み合わせ監査、quality of life — 作業再開時の文脈復元カード。
- User fit: 9/10 — Unity系ゲーム制作とWeb実装の知識を、エンジン投入前の静的な負荷設計へ転用できる
- Revenue / hours saved: 7/10 — 仮定として、キーワード追加ごとの組み合わせ表作成とStrip候補整理を30〜60分短縮する
- Differentiation: 8/10 — Frame Budget Labは実行時間、LOD Distance Lensは距離別ポリゴン、本案はシェーダーキーワードの組み合わせ増加を扱う
- Validation cost: 9/10 — 排他グループと独立トグルの列挙、除外規則、Pass・Platform倍率を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。エンジン内部生成と自動Stripを含まない概算であることを明記
- Time to evidence: 9/10 — サンプル構成で72組から12組を除外し、240 variantsになる流れを即時確認できる
- Evidence quality: 7/10 — 組み合わせ計算はテスト済みだが、Unityの実ビルドログとの一致度は未検証

Total: 58/70

Status: VALIDATED — パーサー、OFF処理、除外規則、倍率、列挙上限、JSON出力を純粋ロジックで検証。実プロジェクトでの時間短縮とビルドログ一致度は未検証。
