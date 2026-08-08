# 051 Clear Rate Lens — Opportunity scorecard

- User fit: 9/10 — Unityゲーム制作とWeb実装の知見を、プレイテスト判断の小型ツールへ転用できる
- Revenue / hours saved: 7/10 — 仮定として、プレイテスト1回ごとの集計表準備と区間計算を30〜60分短縮し、早すぎる難易度調整の手戻りを減らす
- Differentiation: 8/10 — 単純なクリア率表示ではなく、95% Wilson区間と目標率の位置関係で「調整候補」と「追加観測」を分離する
- Validation cost: 9/10 — 静的ブラウザ計算と純粋ロジックテストのみで検証可能
- Reversibility / downside: 9/10 — 無料・ローカル処理。因果推論や調整幅の自動決定は行わない
- Time to evidence: 9/10 — CSV投入から分析完了まで即時観測可能
- Evidence quality: 7/10 — 統計計算と境界判定はテスト可能だが、実制作での手戻り削減は利用データ待ち

Total: 58/70

Status: VALIDATED — CSV解析、入力補正、95% Wilson区間、目標率との分離判定、追加試行目安、JSON出力を純粋ロジックで検証。実案件での時間短縮は未検証。
