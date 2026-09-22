// 把一段規範文字切成一條一條的檢查項目。純規則、不用 AI：
// 1. 依句號、分號、換行、條列符號切開
// 2. 含「應／須／必須／不得／禁止／shall／must」的標成「必要」
// 3. 含數字＋單位的標成「有數字」（講義 p.257：標準要可操作，要有數字）
function toChecklist(text) {
  const parts = text
    .replace(/\r/g, '')
    .split(/[\n。；;]|(?<=\.)\s+|(?:^|\s)(?:[•・●▪\-–]|\(?\d{1,2}[.)、])\s+/)
    .map(s => s.replace(/^[\s,，、:：]+|[\s,，、]+$/g, ''))
    .filter(s => s.length >= 4);
  const MUST = /應|須|必須|不得|禁止|不可|shall|must|required/i;
  const NUM = /\d+(\.\d+)?\s*(mm|cm|µm|um|%|°C|℃|小時|天|日|分鐘|秒|次|件|批|個|支|張|台|位|個月|年|kGy|ppm|lux)/i;
  return parts.map(s => ({ text: s, must: MUST.test(s), num: NUM.test(s) }));
}
if (typeof module !== 'undefined') module.exports = { toChecklist };
