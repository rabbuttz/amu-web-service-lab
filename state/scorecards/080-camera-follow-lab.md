# 080 Camera Follow Lab

- User fit: 9/10 — Unity・Webゲーム制作の調整作業へ直接使える
- Revenue / hours saved: 7/10 — 追従値の初期探索と共有用キャプチャを短縮
- Differentiation: 7/10 — デッドゾーン、指数追従、速度先読みを同じ可動プレビューで比較
- Cost to validate: 9/10 — 静的ブラウザ実装と純粋ロジックテストで検証可能
- Reversibility / downside: 10/10 — 無料、ログイン不要、入力送信なし
- Time to first evidence: 9/10 — 1回の8秒再生で価値提供を観測可能
- Evidence quality: 6/10 — 数式と自動テストは確認できるが、Unity/Cinemachine統合は未検証
- Total: 57/70

Riskiest assumption: エンジンを開かずに動くプレビューでも初期値選定に使われ、8秒再生完了まで到達すること。主要指標は complete/start。

Status: VALIDATED — 追従ループ、設定変更、JSON生成をローカルで実装。エンジン固有の更新順・衝突・ピクセルスナップは未検証。
