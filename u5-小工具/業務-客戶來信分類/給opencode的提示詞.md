# 給 opencode 的提示詞（業務：客戶來信分類，用 Jev）

> 做一個業務部門的小工具，網頁 `index.html`，叫「客戶來信分類」。
> 我把很多封客戶來信貼進一個大文字框，每封之間空一行。按「讓 Jev 判」，每一封送去 Jev 問三題：
> - choice「類型」：詢價／交期、客訴／品質異常、法規文件、技術問題、其他
> - score「急迫度」三級：不急、這週內、今天就要（涉及病患安全或停線）
> - noul「是否需要品保介入」
> 用 Jev 判斷：POST `https://jev.mileschen.dev/v1/systemone`，header `Authorization: Bearer <金鑰>`，
> body `{"model":"jev-latest","state":"<那封信>","questions":{...}}`，每題要有 `"type"`（choice／score／noul）。
> 金鑰用密碼欄位讓我在頁面打開後才貼，**只存 sessionStorage，不要寫進檔案**。旁邊加一個勾選「用課堂備用金鑰」，勾了就送 `Authorization: Bearer class`。
> 「品保介入」的機率套三段式：放行線（預設 0.3）、攔截線（預設 0.7）可調；≥ 攔截線「品保立即介入」、中間「轉人工確認」、低於放行線「不用品保」。
> 放 5 封範例信，客戶用代號（A 公司、B 醫院…）。繁體中文。
