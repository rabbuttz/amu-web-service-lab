# 055 Animation Event Guard — Opportunity scorecard

- Candidates considered: revenue — クリエイター向け検収工数見積、time reduction — Animation Event整合性監査、quality of life — 作業再開用コンテキストカード。
- User fit: 9/10 — Unity系ゲーム制作とWeb実装の知識を、モーション実装前のイベント監査へ転用できる
- Revenue / hours saved: 7/10 — 仮定として、複数クリップのHit・Footstep等を目視比較する20〜45分と、必須イベント欠落の実機調査を減らす
- Differentiation: 8/10 — Sprite Tempoは再生FPS比較、Onboarding Pulseは操作確認、本案は長さの異なるAnimation Eventの正規化整合性を扱う
- Validation cost: 9/10 — 欠落、重複、クリップ長不一致、正規化時刻差を純粋ロジックで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。遷移やBlend Tree、実フレーム発火を含まない静的監査と明記
- Time to evidence: 9/10 — 2クリップのサンプルからRecover欠落とHitの18pt差を即時検出できる
- Evidence quality: 7/10 — 監査ロジックはテスト済みだが、Unityプロジェクトからの自動抽出と実作業時間短縮は未検証

Total: 58/70

Status: VALIDATED — パーサー、正規化比較、必須イベント欠落、重複、入力検証、JSON出力を純粋ロジックで検証。Unity Editor上の発火タイミング一致度は未検証。
