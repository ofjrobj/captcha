document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("captchaGrid");
  if (!grid) return;

  const REQUIRED_TILES = ["3", "4", "5", "6", "8"];
  const SELECTABLE = new Set(REQUIRED_TILES);
  const KEY_VISITED = "p01_visited_tiles_v8";

  const tiles = Array.from(document.querySelectorAll(".tile[data-tile]"));
  const resetBtn = document.getElementById("resetBtn");
  const verifyBtn = document.getElementById("verifyBtn");
  const infoBtn = document.querySelector('.icon-btn[aria-label="info"]');

  let verified = false;
  let endTimer = null;

  // 꽃 사진 타일만 선택 가능하도록 클래스 부여
  tiles.forEach((tile) => {
    const id = String(tile.dataset.tile || "");
    if (SELECTABLE.has(id)) tile.classList.add("is-selectable");
  });

  ensureInfoBubble();
  ensureEndScreen();

  const visited = new Set(loadVisited());
  applyVisitedClasses();

  // 타일 클릭
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const id = String(tile.dataset.tile || "");
      if (!id) return;

      document.body.classList.remove("is-info-on");

      // 1,2,7,9는 눌러도 아무 변화 없음
      if (!SELECTABLE.has(id)) return;

      // 꽃 사진 타일만 방문 기록 저장
      visited.add(id);
      persistVisited();
      tile.classList.add("is-visited");
    });
  });

  // i 버튼 토글
  if (infoBtn) {
    infoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.body.classList.toggle("is-info-on");
    });
  }

  // 말풍선 바깥 클릭하면 닫기
  document.addEventListener("click", (e) => {
    const bubble = document.getElementById("p01InfoBubble");
    const isClickOnInfo =
      (infoBtn && infoBtn.contains(e.target)) ||
      (bubble && bubble.contains(e.target));

    if (!isClickOnInfo) document.body.classList.remove("is-info-on");
  });

  // VERIFY
  if (verifyBtn) {
    verifyBtn.addEventListener("click", () => {
      if (verified) return;

      const allVisited = REQUIRED_TILES.every((id) => visited.has(id));
      if (!allVisited) {
        shakeVerify();
        return;
      }

      verified = true;
      grid.classList.add("is-verified");
      document.body.classList.remove("is-info-on");

      clearEndTimer();
      endTimer = window.setTimeout(() => {
        document.body.classList.add("p01-end-on");
      }, 3000);
    });
  }

  // RESET
  if (resetBtn) resetBtn.addEventListener("click", resetAll);

  const endResetBtn = document.getElementById("p01EndReset");
  if (endResetBtn) endResetBtn.addEventListener("click", resetAll);

  function resetAll() {
    clearEndTimer();

    verified = false;
    document.body.classList.remove("p01-end-on");
    document.body.classList.remove("is-info-on");
    grid.classList.remove("is-verified");

    visited.clear();
    sessionStorage.removeItem(KEY_VISITED);

    tiles.forEach((t) => t.classList.remove("is-visited"));
    if (verifyBtn) verifyBtn.classList.remove("is-shake");
  }

  function ensureInfoBubble() {
    const footer = document.querySelector(".footer-ui");
    if (!footer) return;

    if (document.getElementById("p01InfoBubble")) return;

    const bubble = document.createElement("div");
    bubble.id = "p01InfoBubble";
    bubble.className = "p01-infobubble";
    bubble.textContent = "이미지를 클릭하세요.";

    footer.appendChild(bubble);
  }

  function ensureEndScreen() {
    if (document.getElementById("p01EndScreen")) return;

    const end = document.createElement("div");
    end.id = "p01EndScreen";
    end.className = "p01-end-screen";

    const inner = document.createElement("div");
    inner.className = "p01-end-inner";

    const p = document.createElement("p");
    p.className = "p01-end-text";
    p.textContent =
      "Funny thing is, we’ve been looking at photos this whole time — not real flowers. Just images of flowers, as you already know.";

    inner.appendChild(p);
    end.appendChild(inner);

    const reset = document.createElement("button");
    reset.type = "button";
    reset.id = "p01EndReset";
    reset.className = "p01-end-reset";
    reset.setAttribute("aria-label", "refresh");

    const icon = document.createElement("span");
    icon.textContent = "↻";
    reset.appendChild(icon);

    document.body.appendChild(end);
    document.body.appendChild(reset);
  }

  function clearEndTimer() {
    if (endTimer !== null) {
      window.clearTimeout(endTimer);
      endTimer = null;
    }
  }

  function loadVisited() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY_VISITED) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved.map((v) => String(v)).filter((id) => SELECTABLE.has(id));
    } catch {
      return [];
    }
  }

  function persistVisited() {
    sessionStorage.setItem(KEY_VISITED, JSON.stringify(Array.from(visited)));
  }

  function applyVisitedClasses() {
    tiles.forEach((tile) => {
      const id = String(tile.dataset.tile || "");
      if (!id) return;

      if (visited.has(id)) tile.classList.add("is-visited");
      else tile.classList.remove("is-visited");
    });
  }

  function shakeVerify() {
    if (!verifyBtn) return;
    verifyBtn.classList.remove("is-shake");
    void verifyBtn.offsetWidth;
    verifyBtn.classList.add("is-shake");
  }
});