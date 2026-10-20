(() => {
  'use strict';
  const key = 'captcha-experiences-v1';
  const ids = ['3', '4', '5', '6', '8'];
  const names = {3: 'Is it a flower?', 4: 'Connect the dots', 5: 'Assemble a flower', 6: 'Prove you are human', 8: 'Nature in words'};
  let memory = {visited: [], completed: []};
  let storageAvailable = true;
  function read() {
    if (!storageAvailable) return {visited: [...memory.visited], completed: [...memory.completed]};
    try {
      const raw = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (raw) memory = {visited: ids.filter(id => Array.isArray(raw.visited) && raw.visited.includes(id)), completed: ids.filter(id => Array.isArray(raw.completed) && raw.completed.includes(id))};
    } catch (_) { /* Progress remains usable when browser storage is unavailable. */ }
    return {visited: [...memory.visited], completed: [...memory.completed]};
  }
  function save(state) {
    memory = state;
    try { if (storageAvailable) sessionStorage.setItem(key, JSON.stringify(state)); } catch (_) { storageAvailable = false; }
    window.dispatchEvent(new CustomEvent('captcha:progress', {detail: read()}));
  }
  function visit(id) {
    id = String(id);
    if (!ids.includes(id)) return;
    const state = read();
    if (!state.visited.includes(id)) { state.visited.push(id); save(state); }
  }
  function complete(id) {
    id = String(id);
    if (!ids.includes(id)) return;
    const state = read();
    if (!state.visited.includes(id)) state.visited.push(id);
    if (!state.completed.includes(id)) state.completed.push(id);
    save(state);
  }
  window.CaptchaProgress = {read, visit, complete, reset: () => save({visited: [], completed: []})};
  document.addEventListener('DOMContentLoaded', () => {
    const id = document.body.dataset.activity;
    if (!ids.includes(id)) return;
    visit(id);
    document.body.classList.add('ui-game');
    const main = document.querySelector('main') || document.querySelector('.wrap');
    if (main && !main.id) main.id = 'experience';
    const nav = document.createElement('nav');
    nav.className = 'ui-nav';
    nav.setAttribute('aria-label', 'Experience navigation');
    const home = document.createElement('a');
    home.className = 'ui-home'; home.href = 'index.html'; home.textContent = '← All flowers';
    const label = document.createElement('div'); label.className = 'ui-nav-label';
    const title = document.createElement('strong'); title.textContent = `${String(ids.indexOf(id) + 1).padStart(2, '0')} / ${names[id]}`;
    const status = document.createElement('span'); status.className = 'ui-nav-status';
    label.append(title, status); nav.append(home, label); document.body.prepend(nav);
    if (main) {
      const skip = document.createElement('a'); skip.className = 'ui-skip'; skip.href = `#${main.id}`; skip.textContent = 'Skip to activity'; document.body.prepend(skip);
    }
    const update = () => { status.textContent = read().completed.includes(id) ? 'Completed · explore again anytime' : 'Take your time. Look a little closer.'; };
    update(); window.addEventListener('captcha:progress', update);
    window.addEventListener('pageshow', () => { visit(id); update(); });
  });
})();
