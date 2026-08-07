# 034 Locale Guard

- Status: VALIDATED
- User fit: 5/5 — Unityゲーム・Webサービスの多言語化とクリエイター向け制作支援に直結
- Revenue / hours saved: 3/5 — 翻訳CSVの目視レビューと実装後のプレースホルダー事故調査を1回10〜30分短縮する仮説
- Differentiation: 4/5 — 空欄・キー重複・プレースホルダー集合・基準言語比の文字量を同じCSVで監査
- Cost to validate: 5/5 — 静的ブラウザアプリ、外部依存なし
- Reversibility / downside: 5/5 — CSVは端末内処理。UI収まりは実機確認が必要と明記
- Time to evidence: 5/5 — サンプルを即時解析し、行・キー・言語単位で問題を表示
- Evidence quality: 4/5 — 純粋ロジック18件で引用CSV、トークン抽出、各監査規則、CSV/JSON出力を検証。実プロジェクトへの取り込みは未検証

仮説: 翻訳CSVの空欄・キー重複・プレースホルダー不一致・極端な文字量増加を実装前に監査してJSONと整形CSVに残せれば、ゲームやWebの制作者が翻訳取り込み事故とUI修正の手戻りを減らせる。

観測ループ: CSV入力 → 監査 → 問題の絞り込み → JSONまたは整形CSV保存。CounterAPIのcomplete/startを主要指標にする。
