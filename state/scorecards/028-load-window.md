# 028 Load Window

- Status: VALIDATED
- User fit: 5/5 — Unity/Webゲーム制作の実装前予算確認に直結
- Revenue / hours saved: 3/5 — 初回実機確認前のロード設計レビューを1回15〜30分短縮する仮説
- Differentiation: 4/5 — 容量一覧を必要時刻つきの締切スケジュールとして監査
- Cost to validate: 5/5 — 静的ブラウザアプリ、外部依存なし
- Reversibility / downside: 5/5 — ローカル処理のみ。保守的な直列モデルであることを明記
- Time to evidence: 5/5 — サンプルから即時に遅延件数と余裕秒を表示
- Evidence quality: 3/5 — 純粋ロジックは検証済み。実利用と実機予測精度は未検証

仮説: 素材容量・必要時刻・回線条件を編集可能にして遅延素材を可視化すれば、ゲーム制作者が実装後に初めてロード待ちへ気づく手戻りを減らせる。

観測ループ: manifest入力 → 監査 → 締切順の完了時刻と遅延表示 → JSON保存。CounterAPIのcomplete/startを主要指標にする。
