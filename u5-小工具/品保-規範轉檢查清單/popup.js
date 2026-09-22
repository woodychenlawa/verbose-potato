const $ = s => document.querySelector(s);

async function render() {
  chrome.action.setBadgeText({ text: '' });
  const { source, checked = {} } = await chrome.storage.local.get(['source', 'checked']);
  if (!source) {
    $('#list').innerHTML = '<div class="empty">在任何網頁上選一段規範文字，按右鍵 →「整理成檢查清單」。</div>';
    $('#copy').disabled = true;
    return;
  }
  $('#src').textContent = `來源：${source.title || source.url}`;
  const items = toChecklist(source.text);
  const ol = document.createElement('ol');
  items.forEach((it, i) => {
    const li = document.createElement('li');
    if (it.must) li.className = 'must';
    li.innerHTML = `<label><input type="checkbox" data-i="${i}"><span></span></label>`;
    li.querySelector('span').textContent = it.text;
    if (it.must) li.querySelector('span').insertAdjacentHTML('beforeend', '<span class="tag">必要</span>');
    if (it.num) li.querySelector('span').insertAdjacentHTML('beforeend', '<span class="tag num">有數字</span>');
    li.querySelector('input').checked = !!checked[i];
    ol.appendChild(li);
  });
  $('#list').replaceChildren(ol);
  const update = async () => {
    const c = {};
    ol.querySelectorAll('input').forEach(x => { if (x.checked) c[x.dataset.i] = true; });
    await chrome.storage.local.set({ checked: c });
    $('#done').textContent = `${Object.keys(c).length}／${items.length} 已確認`;
  };
  ol.addEventListener('change', update);
  update();
  $('#copy').onclick = async () => {
    const lines = items.map((it, i) => `${checked[i] || ol.querySelector(`[data-i="${i}"]`).checked ? '☑' : '☐'} ${it.text}${it.must ? '（必要）' : ''}`);
    await navigator.clipboard.writeText(`${source.title}\n${source.url}\n\n${lines.join('\n')}`);
    $('#done').textContent = '已複製';
  };
}
render();
