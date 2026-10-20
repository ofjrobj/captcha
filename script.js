document.addEventListener('DOMContentLoaded', () => {
  const progress = window.CaptchaProgress;
  const ids = ['3', '4', '5', '6', '8'];
  const grid = document.getElementById('captchaGrid');
  const tiles = [...grid.querySelectorAll('.tile')];
  const verify = document.getElementById('verifyBtn');
  const message = document.getElementById('collectionMessage');
  const info = document.getElementById('collectionInfo');
  const infoButton = document.getElementById('infoBtn');
  const ending = document.getElementById('ending');
  let timer = null;
  let verifying = false;
  function render() {
    const state = progress.read();
    tiles.forEach(tile => {
      const id = tile.dataset.tile;
      tile.classList.toggle('is-visited', state.visited.includes(id));
      tile.classList.toggle('is-completed', state.completed.includes(id));
      if (ids.includes(id)) {
        if (!tile.dataset.baseLabel) tile.dataset.baseLabel = tile.getAttribute('aria-label');
        const status = state.completed.includes(id) ? 'Completed' : state.visited.includes(id) ? 'Explored' : 'Not explored';
        tile.setAttribute('aria-label', `${tile.dataset.baseLabel} — ${status}`);
      }
      const badge = tile.querySelector('.tile-status');
      if (badge) badge.textContent = state.completed.includes(id) ? '✓' : '•';
    });
    document.getElementById('exploreCount').textContent = `${state.visited.length} / 5 explored`;
    document.getElementById('completeCount').textContent = state.completed.length ? `${state.completed.length} ${state.completed.length === 1 ? 'activity' : 'activities'} completed` : 'Five ways to see a flower';
    message.textContent = state.visited.length === 5 ? 'All five explored. Ready to verify?' : state.visited.length ? 'Welcome back. There is more to discover.' : 'Choose a flower to begin.';
  }
  tiles.forEach(tile => tile.addEventListener('click', event => {
    if (verifying) { event.preventDefault(); return; }
    const id = tile.dataset.tile;
    if (ids.includes(id)) progress.visit(id);
    else message.textContent = 'This tile has no activity. Choose one of the five open flowers.';
  }));
  infoButton.addEventListener('click', () => {
    info.hidden = !info.hidden;
    infoButton.setAttribute('aria-expanded', String(!info.hidden));
  });
  function unlock() {
    window.clearTimeout(timer); timer = null; verifying = false;
    verify.disabled = false; grid.classList.remove('is-verified'); grid.removeAttribute('inert');
  }
  function reset() {
    unlock(); if (ending.open) ending.close(); progress.reset(); render();
    document.getElementById('resetBtn').focus();
  }
  verify.addEventListener('click', () => {
    if (verifying) return;
    const remaining = ids.filter(id => !progress.read().visited.includes(id));
    if (remaining.length) {
      message.textContent = `Explore ${remaining.length} more ${remaining.length === 1 ? 'flower' : 'flowers'} before you verify. Unvisited tiles have no dot or check.`;
      grid.querySelector(`[data-tile="${remaining[0]}"]`).focus();
      return;
    }
    verifying = true; verify.disabled = true; grid.setAttribute('inert', ''); grid.classList.add('is-verified');
    message.textContent = 'A final thought…';
    timer = window.setTimeout(() => { ending.showModal(); document.getElementById('endReturn').focus(); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650);
  });
  ending.addEventListener('close', () => { unlock(); render(); verify.focus(); });
  document.getElementById('endReturn').addEventListener('click', () => ending.close());
  document.getElementById('resetBtn').addEventListener('click', reset);
  document.getElementById('endReset').addEventListener('click', reset);
  window.addEventListener('captcha:progress', render);
  window.addEventListener('pageshow', () => { if (!ending.open) unlock(); render(); });
  render();
});
