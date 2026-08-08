# 052 LOD Distance Lens — Opportunity scorecard

- Candidates considered: revenue — 見積比較正規化ツール、time reduction — 3D LOD距離・三角形予算試算、quality of life — 共有作業の中断復帰メモ。
- User fit: 9/10 — Unityゲーム制作とWeb実装の知見を、3D最適化の事前設計ツールへ転用できる
- Revenue / hours saved: 7/10 — 仮定として、LOD閾値を距離へ換算する表計算と配置負荷の概算を30〜60分短縮する
- Differentiation: 8/10 — Frame Budget LabはCPU/GPU時間、Texture Budget Lensは画像容量、本案はLOD画面比率を切替距離と距離帯別三角形数へ変換する
- Validation cost: 9/10 — 静的な透視投影計算と純粋ロジックテストだけで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。Occlusion、影、バッチング等を含まない概算と明記
- Time to evidence: 9/10 — 初期値の4距離帯でLOD割当と削減率を即時確認できる
- Evidence quality: 7/10 — 数式、境界、集計はテスト可能だが、Unity Profiler実測との誤差は未検証

Total: 58/70

Status: VALIDATED — LOD解析、切替距離、距離帯割当、三角形集計、設定監査、JSON出力を純粋ロジックで検証。実プロジェクトでの時間短縮とProfiler一致度は未検証。
