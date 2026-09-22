// 右鍵選單：選取文字 → 「整理成檢查清單」→ 存起來，點工具列圖示就看得到。
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({ id: 'to-checklist', title: '整理成檢查清單', contexts: ['selection'] });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'to-checklist' || !info.selectionText) return;
  await chrome.storage.local.set({
    source: { text: info.selectionText, title: tab?.title || '', url: tab?.url || '', at: new Date().toISOString() },
    checked: {},
  });
  // 有些版本的 Chrome 允許直接打開 popup；不允許就在圖示上標一個點，提示去點它
  try { await chrome.action.openPopup(); } catch { chrome.action.setBadgeText({ text: '1' }); }
});
