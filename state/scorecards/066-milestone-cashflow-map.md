# 066 Milestone Cashflow Map

- User fit: 5/5 — 個人クリエイター向け業務効率と収益防衛に直結
- Revenue or hours saved: 4/5 — 見積・契約前の資金繰り確認を1案件10〜30分削減し、持ち出し条件の見落としを防ぐ仮説
- Differentiation: 4/5 — 利益計算ではなく入出金日を重ね、最大持ち出し額と必要着手金率を算出
- Cost to validate: 5/5 — 静的HTMLと純粋JSのみ
- Reversibility/downside: 5/5 — 無料、ログイン不要、入力は端末内
- Time to evidence: 5/5 — 金額・入金・支出を入れると即時表示
- Evidence quality: 4/5 — 現金残高と必要着手金のロジックを自動テスト。税・遅延・案件外資金は除外と明示
- Total: 32/35

Riskiest assumption: 単純な利益率よりも、外注費や素材費が入金より先に来る時間差と必要着手金率が契約条件の判断材料になること。主要指標 complete/start で確認する。

Status: VALIDATED — 手数料控除、時系列残高、最大持ち出し、必要着手金率、入力検証を純粋ロジックテストで検証。実需要は公開後の指標待ち。
