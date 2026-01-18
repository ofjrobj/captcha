// p01-04.js
document.addEventListener("DOMContentLoaded", () => {
  const stage = document.getElementById("p04Stage");
  if (!stage) return;

  const svg = document.getElementById("p04Svg");
  const dotsLayer = document.getElementById("p04Dots");
  const linesLayer = document.getElementById("p04Lines");

  const startBtn = document.getElementById("p04StartBtn");
  const tryBtn = document.getElementById("p04TryBtn");
  const skipBtn = document.getElementById("p04SkipBtn");
  const verifyBtn = document.getElementById("p04VerifyBtn");

  const progressEl = document.getElementById("p04Progress");
  const timerEl = document.getElementById("p04Timer");
  const hintEl = document.getElementById("p04Hint");
  const quoteEl = document.getElementById("p04Quote");

  const builtEl = document.getElementById("p04Built");
  const poolEl = document.getElementById("p04Pool");

  const SVG_NS = "http://www.w3.org/2000/svg";

  const DOT_R = 12;
  const SHOW_NUMBERS = true;

  const QUOTE =
    "The essence of a thing is what it is said to be in virtue of itself, and not in virtue of anything else.";

  // 진행 중 숨길 문장부호: 콤마, 마침표
  const LATE_PUNCT = new Set([",", "."]);

  // 두번째 이미지 기준 픽셀 좌표
  const DINO_DOTS = [
    [677.81, 173.69], [751.76, 180.48], [833.34, 211.72], [573.00, 215.63], [749.75, 227.27],
    [694.71, 244.88], [936.39, 251.52], [791.68, 257.12], [725.42, 257.76], [769.99, 279.48],
    [520.50, 280.04], [653.35, 280.51], [794.54, 289.56], [1020.76, 303.47], [635.32, 325.97],
    [1072.90, 351.32], [1002.65, 359.62], [465.56, 380.55], [594.05, 406.08], [781.68, 407.52],
    [825.78, 409.95], [799.83, 418.46], [750.77, 418.48], [718.23, 425.03], [847.38, 432.03],
    [778.48, 443.33], [1074.39, 448.89], [837.08, 457.48], [879.27, 461.28], [1037.78, 462.75],
    [1001.48, 469.28], [978.25, 469.33], [925.56, 472.65], [897.43, 482.85], [827.90, 485.28],
    [949.43, 487.47], [1065.91, 488.87], [1018.21, 494.11], [609.17, 506.02], [1043.57, 518.10],
    [988.95, 519.22], [958.90, 525.74], [895.64, 533.92], [619.56, 536.57], [446.35, 550.78],
    [998.98, 554.13], [1031.49, 562.64], [951.48, 566.83], [671.36, 580.00], [707.42, 584.65],
    [499.22, 586.23], [992.69, 588.38], [644.83, 592.57], [763.01, 600.08], [1032.52, 609.73],
    [823.23, 610.05], [691.42, 617.35], [846.34, 626.26], [919.11, 631.42], [1000.62, 638.02],
    [977.33, 642.14], [478.53, 648.60], [665.97, 651.14], [538.21, 665.51], [842.64, 672.69],
    [869.60, 678.02], [914.74, 683.54], [466.41, 697.69], [991.44, 702.23], [502.60, 703.89],
    [863.33, 718.31], [570.69, 732.89], [824.94, 735.14], [1056.11, 743.43], [466.15, 743.52],
    [513.72, 756.19], [1091.04, 775.67], [580.25, 785.68], [451.39, 800.51], [1118.62, 833.46],
    [802.96, 833.86], [440.62, 858.21], [737.27, 880.83], [850.45, 885.63], [947.28, 885.84],
    [1130.32, 889.57], [504.62, 896.48], [776.75, 906.09], [473.15, 912.78], [433.66, 933.51],
    [736.34, 936.41], [830.55, 938.04], [1203.99, 944.53], [718.27, 971.86], [488.50, 972.28],
    [783.64, 976.85], [450.56, 977.53], [1309.94, 980.67], [943.72, 999.72], [482.64, 1005.14],
    [579.07, 1018.99], [730.87, 1023.13], [518.30, 1034.29], [793.60, 1036.06], [443.05, 1038.57],
    [752.60, 1041.23], [1143.22, 1043.51], [1474.86, 1047.73], [707.67, 1057.57], [478.43, 1060.23],
    [609.71, 1065.53], [1605.96, 1072.08], [642.54, 1081.00], [813.44, 1087.80], [1241.10, 1090.68],
    [451.75, 1094.52], [956.73, 1097.17], [612.54, 1112.47], [1142.52, 1116.46], [700.96, 1123.93],
    [733.03, 1138.11], [1237.49, 1145.63], [1751.53, 1153.81], [758.00, 1153.82], [974.20, 1156.01],
    [1150.57, 1165.24], [998.76, 1170.44], [732.41, 1174.74], [947.37, 1179.67], [1200.69, 1189.67],
    [999.38, 1193.87], [887.61, 1199.00], [1243.58, 1199.90], [808.80, 1204.73], [1582.60, 1209.55],
    [560.97, 1212.35], [1312.38, 1218.45], [1450.20, 1221.58], [1338.91, 1223.09], [1766.01, 1233.43],
    [1187.90, 1237.27], [1033.78, 1252.48], [1828.84, 1258.99], [785.94, 1268.03], [1792.64, 1289.30],
    [633.72, 1298.64], [815.20, 1325.43], [1122.57, 1341.89], [700.19, 1352.43], [1214.53, 1354.09],
    [1792.51, 1367.74], [1768.03, 1379.05], [865.27, 1391.65], [1258.46, 1410.30], [760.01, 1421.87],
    [1788.37, 1423.80], [1192.30, 1443.92], [740.27, 1480.26], [1192.15, 1488.09], [860.56, 1491.82],
    [1286.01, 1501.35], [836.06, 1503.35], [786.88, 1520.77], [861.86, 1535.50], [1204.71, 1540.18],
    [1319.16, 1553.16], [1185.38, 1557.20], [693.95, 1559.10], [750.89, 1564.85], [836.74, 1567.27],
    [615.18, 1574.63], [716.92, 1581.18], [1193.05, 1600.50], [1361.51, 1616.55], [580.65, 1619.64],
    [1297.19, 1619.85], [664.50, 1619.99], [1165.97, 1626.38], [544.77, 1626.56], [813.09, 1627.00],
    [639.13, 1627.53], [1225.66, 1641.92], [741.81, 1642.24], [1139.32, 1649.76], [690.19, 1652.53],
    [656.89, 1656.11], [1167.83, 1662.17], [1326.82, 1670.81], [1235.86, 1681.98], [1196.98, 1689.10],
    [1424.54, 1696.97], [1322.50, 1697.95], [1122.32, 1706.28], [1164.86, 1710.31], [1285.02, 1715.10],
  ];

  const TOTAL = DINO_DOTS.length;

  function makeSvgEl(tag) {
    return document.createElementNS(SVG_NS, tag);
  }

  function setHint(t) {
    if (hintEl) hintEl.textContent = t;
  }

  function setProgress() {
    if (!progressEl) return;
    progressEl.textContent = `Dot ${expectedIdx}/${TOTAL}`;
  }

  // Timer
  let timerRunning = false;
  let timerStartMs = 0;
  let timerRaf = 0;

  function formatTime(ms) {
    const total = Math.max(0, ms);
    const minutes = Math.floor(total / 60000);
    const seconds = Math.floor((total % 60000) / 1000);
    const tenths = Math.floor((total % 1000) / 100);
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${mm}:${ss}.${tenths}`;
  }

  function setTimer(ms) {
    if (!timerEl) return;
    timerEl.textContent = `Time ${formatTime(ms)}`;
  }

  function stopTimer() {
    timerRunning = false;
    if (timerRaf) cancelAnimationFrame(timerRaf);
    timerRaf = 0;
  }

  function startTimer() {
    stopTimer();
    timerStartMs = performance.now();
    timerRunning = true;

    const tick = (now) => {
      if (!timerRunning) return;
      setTimer(now - timerStartMs);
      timerRaf = requestAnimationFrame(tick);
    };

    setTimer(0);
    timerRaf = requestAnimationFrame(tick);
  }

  // ===== Quote builder =====
  const quoteChars = QUOTE.split("");
  const letterPositions = [];
  for (let i = 0; i < quoteChars.length; i++) {
    if (/[A-Za-z]/.test(quoteChars[i])) letterPositions.push(i);
  }

  let builtSpans = [];
  let poolLetters = [];
  let revealedLetters = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildQuoteDom() {
    if (!builtEl) return;

    builtEl.innerHTML = "";
    builtSpans = [];

    for (let i = 0; i < quoteChars.length; i++) {
      const ch = quoteChars[i];
      const s = document.createElement("span");
      s.className = "ch";

      if (!/[A-Za-z]/.test(ch)) {
        if (ch === " ") {
          s.textContent = "\u00A0";
        } else if (LATE_PUNCT.has(ch)) {
          // 콤마/마침표는 진행 중 숨김, 완료 시 노출
          s.textContent = ch;
          s.classList.add("is-hidden-punct");
        } else {
          s.textContent = ch;
        }
      } else {
        s.textContent = ch;
        s.classList.add("is-hidden"); // 글자는 점 대신 숨김
      }

      builtEl.appendChild(s);
      builtSpans.push(s);
    }
  }

  function buildPool() {
    if (!poolEl) return;

    poolLetters = letterPositions.map((idx) => quoteChars[idx].toLowerCase());
    shuffle(poolLetters);
    poolEl.textContent = poolLetters.join("");
  }

  function revealNextLetter() {
    if (revealedLetters >= letterPositions.length) return;

    const pos = letterPositions[revealedLetters];
    const s = builtSpans[pos];
    if (s) s.classList.remove("is-hidden");

    const target = quoteChars[pos].toLowerCase();
    const removeIdx = poolLetters.indexOf(target);
    if (removeIdx !== -1) poolLetters.splice(removeIdx, 1);
    if (poolEl) poolEl.textContent = poolLetters.join("");

    revealedLetters += 1;
  }

  function revealPunctuationAtEnd() {
    for (const s of builtSpans) {
      if (s.classList.contains("is-hidden-punct")) s.classList.remove("is-hidden-punct");
    }
  }

  function revealAllRemaining() {
    while (revealedLetters < letterPositions.length) revealNextLetter();
    revealPunctuationAtEnd();
  }

  function showFinalCleanText() {
    // 완료 시에는 스팬 기반 표시를 한 번 정리해서 가독성 확보
    if (builtEl) {
      builtEl.classList.add("is-final");
      builtEl.textContent = QUOTE;
    }
    if (poolEl) {
      poolEl.classList.add("is-hidden");
      poolEl.textContent = "";
    }
  }

  // ===== Game state =====
  let started = false;
  let done = false;

  let expectedIdx = 0;
  let dotsConnectedCount = 0;

  const pathPoints = [];
  const dotNodes = [];

  let isDragging = false;
  let capturedPointerId = null;

  let pathEl = null;

  function clearLayers() {
    while (dotsLayer.firstChild) dotsLayer.removeChild(dotsLayer.firstChild);
    while (linesLayer.firstChild) linesLayer.removeChild(linesLayer.firstChild);
    dotNodes.length = 0;
  }

  function setPathFromPoints(points) {
    if (!pathEl) return;
    if (!points || points.length === 0) {
      pathEl.setAttribute("d", "");
      return;
    }

    let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i][0].toFixed(2)} ${points[i][1].toFixed(2)}`;
    }
    pathEl.setAttribute("d", d);
  }

  function setPath() {
    setPathFromPoints(pathPoints);
  }

  function setNextGuide() {
    for (let i = 0; i < dotNodes.length; i++) {
      dotNodes[i].g.classList.remove("is-next");
    }
    if (expectedIdx < TOTAL && dotNodes[expectedIdx]) {
      dotNodes[expectedIdx].g.classList.add("is-next");
      setHint(`Next: Dot ${expectedIdx + 1}.`);
    }
  }

  function shakeStage() {
    stage.classList.remove("is-shake");
    stage.offsetHeight;
    stage.classList.add("is-shake");
    window.setTimeout(() => stage.classList.remove("is-shake"), 280);
  }

  function markDotUsed(idx) {
    const node = dotNodes[idx];
    if (!node) return;
    node.g.classList.add("is-used");
    node.g.classList.remove("is-next");
    if (node.t) node.t.style.display = "none";
  }

  function complete() {
    done = true;
    started = false;

    stopTimer();

    stage.classList.add("is-complete");
    stage.classList.remove("is-started");

    verifyBtn.disabled = false;
    tryBtn.disabled = false;

    // 문장 전부 공개 후, 최종 가독성 텍스트로 정리
    revealAllRemaining();
    showFinalCleanText();

    setHint("Complete.");
    setProgress();

    window.setTimeout(() => {
      playMorphSequence().catch(() => {});
    }, 2000);
  }

  function connectToDot(idx) {
    if (!started || done) return;

    if (idx !== expectedIdx) {
      shakeStage();
      setHint(`Wrong dot. Click Dot ${expectedIdx + 1}.`);
      return;
    }

    const p = DINO_DOTS[idx];
    pathPoints.push([p[0], p[1]]);
    setPath();

    markDotUsed(idx);

    expectedIdx += 1;
    dotsConnectedCount += 1;

    if (dotsConnectedCount % 3 === 0) revealNextLetter();

    setProgress();

    if (expectedIdx >= TOTAL) {
      complete();
      return;
    }

    setNextGuide();
  }

  function clientToSvgPoint(clientX, clientY) {
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const inv = ctm.inverse();
    const pt = new DOMPoint(clientX, clientY).matrixTransform(inv);
    return { x: pt.x, y: pt.y };
  }

  function findNearestDotIndex(x, y, radius) {
    const r2 = radius * radius;
    let best = -1;
    let bestD2 = r2;

    const i = expectedIdx;
    if (i >= 0 && i < DINO_DOTS.length) {
      const dx = DINO_DOTS[i][0] - x;
      const dy = DINO_DOTS[i][1] - y;
      const d2 = dx * dx + dy * dy;
      if (d2 <= bestD2) best = i;
    }
    return best;
  }

  function rebuild() {
    clearLayers();

    pathEl = makeSvgEl("path");
    pathEl.setAttribute("class", "p04-path");
    pathEl.setAttribute("d", "");
    pathEl.setAttribute("vector-effect", "non-scaling-stroke");
    linesLayer.appendChild(pathEl);

    for (let i = 0; i < TOTAL; i++) {
      const x = DINO_DOTS[i][0];
      const y = DINO_DOTS[i][1];

      const g = makeSvgEl("g");
      g.setAttribute("class", "p04-dot");
      g.dataset.idx = String(i);

      const c = makeSvgEl("circle");
      c.setAttribute("cx", String(x));
      c.setAttribute("cy", String(y));
      c.setAttribute("r", String(DOT_R));
      g.appendChild(c);

      let t = null;
      if (SHOW_NUMBERS) {
        t = makeSvgEl("text");
        t.setAttribute("x", String(x + DOT_R + 10));
        t.setAttribute("y", String(y));
        t.setAttribute("dominant-baseline", "middle");
        t.textContent = String(i + 1);
        g.appendChild(t);
      }

      g.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (!started || done) return;

        isDragging = true;
        capturedPointerId = e.pointerId;
        try { stage.setPointerCapture(capturedPointerId); } catch {}

        connectToDot(i);
      });

      dotsLayer.appendChild(g);
      dotNodes.push({ g, c, t });
    }
  }

  function stopDragging() {
    if (capturedPointerId != null) {
      try { stage.releasePointerCapture(capturedPointerId); } catch {}
    }
    capturedPointerId = null;
    isDragging = false;
  }

  stage.addEventListener("pointermove", (e) => {
    if (!started || done) return;
    if (!isDragging) return;

    const p = clientToSvgPoint(e.clientX, e.clientY);
    const idx = findNearestDotIndex(p.x, p.y, Math.max(22, DOT_R * 2.8));
    if (idx !== -1) connectToDot(idx);
  });

  stage.addEventListener("pointerup", stopDragging);
  stage.addEventListener("pointercancel", stopDragging);
  stage.addEventListener("pointerleave", stopDragging);

  function resetGame() {
    started = false;
    done = false;

    expectedIdx = 0;
    dotsConnectedCount = 0;
    pathPoints.length = 0;

    stopDragging();

    stage.classList.remove("is-complete");
    stage.classList.remove("is-started");
    stage.classList.remove("is-shake");

    verifyBtn.disabled = true;
    tryBtn.disabled = true;

    if (quoteEl) quoteEl.hidden = true;

    stopTimer();
    setTimer(0);

    rebuild();
    setPath();

    // 완료 상태에서 적용했던 정리 클래스 제거
    if (builtEl) builtEl.classList.remove("is-final");
    if (poolEl) poolEl.classList.remove("is-hidden");

    buildQuoteDom();
    buildPool();

    revealedLetters = 0;
    revealNextLetter();

    setProgress();
    setNextGuide();

    setHint("Press Start to begin.");
  }

  function startGame() {
    started = true;
    done = false;

    stage.classList.add("is-started");
    tryBtn.disabled = false;
    verifyBtn.disabled = true;

    startTimer();
    setNextGuide();
  }

  function skipAll() {
    resetGame();

    started = true;
    stage.classList.add("is-started");

    for (let i = 0; i < TOTAL; i++) {
      pathPoints.push([DINO_DOTS[i][0], DINO_DOTS[i][1]]);
      markDotUsed(i);
    }
    setPath();

    expectedIdx = TOTAL;
    dotsConnectedCount = TOTAL;

    revealAllRemaining();
    complete();
  }

  startBtn.addEventListener("click", () => {
    resetGame();
    startGame();
  });

  tryBtn.addEventListener("click", () => {
    resetGame();
    startGame();
  });

  skipBtn.addEventListener("click", () => {
    skipAll();
  });

  verifyBtn.addEventListener("click", () => {
    if (!done) {
      setHint("Not completed yet.");
      return;
    }
    localStorage.setItem("p01-04-verified", "1");
    setHint("Verified.");
    if (quoteEl) quoteEl.hidden = false;
  });

  // =========================
  // Morph (완성 후 2초 뒤)
  // =========================
  function boundsOf(points) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) {
      if (p[0] < minX) minX = p[0];
      if (p[1] < minY) minY = p[1];
      if (p[0] > maxX) maxX = p[0];
      if (p[1] > maxY) maxY = p[1];
    }
    return { minX, minY, maxX, maxY };
  }

  function dist(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return Math.hypot(dx, dy);
  }

  function samplePolylineEvenly(poly, count, closed) {
    const pts = poly.slice();
    if (closed && pts.length > 1) pts.push(pts[0]);

    const cum = [0];
    for (let i = 1; i < pts.length; i++) cum[i] = cum[i - 1] + dist(pts[i - 1], pts[i]);
    const totalLen = cum[cum.length - 1];
    if (totalLen < 0.0001) return Array.from({ length: count }, () => [pts[0][0], pts[0][1]]);

    const out = [];
    const step = totalLen / (count - 1);
    let j = 1;

    out.push([pts[0][0], pts[0][1]]);
    for (let k = 1; k < count - 1; k++) {
      const t = step * k;
      while (j < cum.length - 1 && cum[j] < t) j++;
      const t0 = cum[j - 1];
      const t1 = cum[j];
      const u = (t - t0) / Math.max(0.0001, (t1 - t0));
      const a = pts[j - 1];
      const b = pts[j];
      out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]);
    }
    out.push([pts[pts.length - 1][0], pts[pts.length - 1][1]]);
    return out;
  }

  function makeFromTemplate(count, bbox, template, scale = 0.92, offsetX = 0, offsetY = 0) {
    const cx = (bbox.minX + bbox.maxX) / 2 + (bbox.maxX - bbox.minX) * offsetX;
    const cy = (bbox.minY + bbox.maxY) / 2 + (bbox.maxY - bbox.minY) * offsetY;
    const rx = (bbox.maxX - bbox.minX) / 2 * scale;
    const ry = (bbox.maxY - bbox.minY) / 2 * scale;

    const poly = template.map(([x, y]) => [cx + x * rx, cy + y * ry]);
    return samplePolylineEvenly(poly, count, true);
  }

  function makeFlowerPoints(count, bbox) {
    const cx = (bbox.minX + bbox.maxX) / 2;
    const cy = (bbox.minY + bbox.maxY) / 2;
    const rx = (bbox.maxX - bbox.minX) * 0.34;
    const ry = (bbox.maxY - bbox.minY) * 0.34;

    const petals = 6;
    const base = 1.0;
    const amp = 0.28;

    const poly = [];
    const n = 520;
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * Math.PI * 2;
      const r = base + amp * Math.cos(petals * t);
      const x = cx + Math.cos(t) * rx * r;
      const y = cy + Math.sin(t) * ry * r;
      poly.push([x, y]);
    }
    return samplePolylineEvenly(poly, count, true);
  }

  function makeHumanPoints(count, bbox) {
    const cx = (bbox.minX + bbox.maxX) / 2;
    const top = bbox.minY + (bbox.maxY - bbox.minY) * 0.14;
    const bot = bbox.minY + (bbox.maxY - bbox.minY) * 0.88;
    const w = (bbox.maxX - bbox.minX) * 0.40;

    const poly = [];
    const headR = w * 0.18;
    const headCx = cx;
    const headCy = top + headR * 1.15;

    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * Math.PI * 2;
      poly.push([headCx + Math.cos(t) * headR, headCy + Math.sin(t) * headR]);
    }

    poly.push([cx - w * 0.12, top + w * 0.48]);
    poly.push([cx - w * 0.50, top + w * 0.62]);
    poly.push([cx - w * 0.62, top + w * 1.05]);
    poly.push([cx - w * 0.50, top + w * 1.40]);
    poly.push([cx - w * 0.26, top + w * 1.68]);

    poly.push([cx - w * 0.22, bot - w * 0.18]);
    poly.push([cx - w * 0.30, bot]);
    poly.push([cx - w * 0.10, bot]);

    poly.push([cx + w * 0.10, bot]);
    poly.push([cx + w * 0.30, bot]);
    poly.push([cx + w * 0.22, bot - w * 0.18]);

    poly.push([cx + w * 0.26, top + w * 1.68]);
    poly.push([cx + w * 0.50, top + w * 1.40]);
    poly.push([cx + w * 0.62, top + w * 1.05]);
    poly.push([cx + w * 0.50, top + w * 0.62]);
    poly.push([cx + w * 0.12, top + w * 0.48]);

    poly.push([headCx + headR, headCy]);
    return samplePolylineEvenly(poly, count, true);
  }

  const CROW_TEMPLATE = [
    [-1.00, 0.10],[-0.82,-0.05],[-0.60,-0.34],[-0.28,-0.16],[-0.05,-0.28],
    [ 0.10,-0.25],[ 0.22,-0.18],[ 0.10,-0.16],[ 0.02,-0.05],[ 0.12, 0.02],
    [ 0.32,-0.10],[ 0.60,-0.34],[ 0.82,-0.05],[ 1.00, 0.10],[ 0.68, 0.16],
    [ 0.22, 0.06],[ 0.06, 0.20],[ 0.00, 0.48],[-0.06, 0.20],[-0.22, 0.06],
    [-0.68, 0.16],[-1.00, 0.10],
  ];

  const DOG_TEMPLATE = [
    [-0.95,-0.08],[-0.88,-0.22],[-0.78,-0.34],[-0.70,-0.22],[-0.62,-0.18],
    [-0.52,-0.24],[-0.18,-0.28],[ 0.20,-0.24],[ 0.52,-0.20],[ 0.78,-0.12],
    [ 0.94,-0.32],[ 0.78, 0.02],[ 0.55, 0.02],[ 0.30, 0.12],
    [ 0.22, 0.34],[ 0.10, 0.34],[ 0.16, 0.12],[-0.02, 0.12],
    [-0.10, 0.34],[-0.22, 0.34],[-0.16, 0.12],[-0.40, 0.10],
    [-0.60, 0.02],[-0.72,-0.02],[-0.82,-0.02],[-0.95,-0.08],
  ];

  const HAND_TEMPLATE = [
    [-0.30, 0.95],[-0.52, 0.70],[-0.58, 0.20],[-0.44, 0.12],[-0.30, 0.18],
    [-0.34,-0.06],[-0.18,-0.34],[-0.08,-0.62],[ 0.02,-0.34],[ 0.06,-0.06],
    [ 0.12,-0.44],[ 0.22,-0.72],[ 0.32,-0.36],[ 0.30,-0.06],
    [ 0.40,-0.38],[ 0.52,-0.60],[ 0.58,-0.22],[ 0.50, 0.06],
    [ 0.62,-0.12],[ 0.68, 0.08],[ 0.54, 0.22],[ 0.42, 0.66],
    [ 0.18, 0.95],[-0.30, 0.95],
  ];

  const LIZARD_TEMPLATE = [
    [-0.95,-0.10],[-0.86,-0.26],[-0.70,-0.20],[-0.40,-0.30],[ 0.10,-0.26],
    [ 0.52,-0.18],[ 0.92,-0.06],[ 0.60, 0.10],[ 0.26, 0.14],
    [ 0.18, 0.42],[ 0.06, 0.42],[ 0.12, 0.14],[-0.18, 0.20],
    [-0.34, 0.44],[-0.48, 0.44],[-0.42, 0.20],[-0.62, 0.10],
    [-0.78, 0.06],[-0.95,-0.10],
  ];

  function delay(ms) {
    return new Promise((r) => window.setTimeout(r, ms));
  }

  async function playMorphSequence() {
    const bbox = boundsOf(DINO_DOTS);

    const crow = makeFromTemplate(TOTAL, bbox, CROW_TEMPLATE, 0.92, 0, -0.04);
    const flower = makeFlowerPoints(TOTAL, bbox);
    const dog = makeFromTemplate(TOTAL, bbox, DOG_TEMPLATE, 0.92, 0, 0.02);
    const hand = makeFromTemplate(TOTAL, bbox, HAND_TEMPLATE, 0.88, 0, 0.06);
    const lizard = makeFromTemplate(TOTAL, bbox, LIZARD_TEMPLATE, 0.92, 0, 0.02);
    const human = makeHumanPoints(TOTAL, bbox);

    await morphTo(crow, 700);    await delay(250);
    await morphTo(flower, 700);  await delay(250);
    await morphTo(dog, 700);     await delay(250);
    await morphTo(hand, 700);    await delay(250);
    await morphTo(lizard, 700);  await delay(250);
    await morphTo(human, 850);
  }

  function morphTo(targetPoints, durationMs) {
    const from = dotNodes.map((n, i) => {
      const cx = Number(n.c.getAttribute("cx") || String(DINO_DOTS[i][0]));
      const cy = Number(n.c.getAttribute("cy") || String(DINO_DOTS[i][1]));
      return [cx, cy];
    });

    return new Promise((resolve) => {
      const t0 = performance.now();
      let frameCount = 0;

      function frame(now) {
        const t = Math.min(1, (now - t0) / durationMs);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const current = [];
        for (let i = 0; i < TOTAL; i++) {
          const x = from[i][0] + (targetPoints[i][0] - from[i][0]) * ease;
          const y = from[i][1] + (targetPoints[i][1] - from[i][1]) * ease;
          current.push([x, y]);
        }

        setPathFromPoints(current);

        frameCount += 1;
        if (frameCount % 2 === 0) {
          for (let i = 0; i < TOTAL; i++) {
            const node = dotNodes[i];
            node.c.setAttribute("cx", String(current[i][0]));
            node.c.setAttribute("cy", String(current[i][1]));
          }
        }

        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }

      requestAnimationFrame(frame);
    });
  }

  // 초기화
  resetGame();
});
