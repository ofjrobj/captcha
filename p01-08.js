/* p01-08.js */

document.addEventListener("DOMContentLoaded", () => {
  const WORDS = [
    {
      hangul: "여름",
      roman: "Yeoreum",
      icon: "fruit",
      english: "Fruit",
      modernKo: "열매",
      meaning: "A native word once used for fruit, or the fruition of effort.",
      note: "In modern Korean the same form is mainly understood as the season summer, so the meaning shifted."
    },
    {
      hangul: "고마",
      roman: "Goma",
      icon: "bear",
      english: "Bear",
      modernKo: "곰",
      meaning: "An old word for a bear in the mountains, often imagined as a clever and mysterious being.",
      note: "It is related to the modern word 곰, but it is not used as a standalone everyday word now."
    },
    {
      hangul: "미르",
      roman: "Mireu",
      icon: "dragon",
      english: "Dragon",
      modernKo: "용",
      meaning: "A native word for a dragon.",
      note: "It is a native term, but it disappeared from ordinary daily speech as other terms became standard."
    },
    {
      hangul: "덛",
      roman: "Deot",
      icon: "moss",
      english: "Moss",
      modernKo: "이끼",
      meaning: "An old word for moss that grows low on rocks or tree bark.",
      note: "This older form is not used in daily speech today; the modern everyday word is 이끼."
    },
    {
      hangul: "가람",
      roman: "Garam",
      icon: "river",
      english: "River",
      modernKo: "강",
      meaning: "An old word for a long, wide river.",
      note: "It survives mainly in poetic or literary contexts, and sometimes as a personal name."
    },
    {
      hangul: "나조",
      roman: "Najo",
      icon: "evening",
      english: "Evening",
      modernKo: "저녁",
      meaning: "An old word for evening, the time when the sun goes down.",
      note: "This older word is not used in everyday speech; 저녁 is the standard modern term."
    },
    {
      hangul: "매지",
      roman: "Maeji",
      icon: "cloud",
      english: "Raincloud",
      modernKo: "먹구름",
      meaning: "An old word for dark, heavy rainclouds hanging low as if rain is about to fall.",
      note: "The concept remains, but modern Korean uses 먹구름 as the everyday term."
    },
    {
      hangul: "하늬",
      roman: "Hanyi",
      icon: "wind",
      english: "West wind",
      modernKo: "서풍",
      meaning: "An old word for the west direction, or a cool wind blowing from the west.",
      note: "The directional sense faded, and it remains mostly as a trace in set expressions."
    },
    {
      hangul: "볻",
      roman: "Bot",
      icon: "bud",
      english: "Bud",
      modernKo: "꽃봉오리",
      meaning: "An old word for a flower bud just before it blooms.",
      note: "Modern Korean generally uses the longer everyday term 꽃봉오리."
    },
    {
      hangul: "글개",
      roman: "Geulgae",
      icon: "vine",
      english: "Vine",
      modernKo: "덩굴",
      meaning: "An old word for a vine that stretches and wraps around fences or trees.",
      note: "Modern Korean uses 덩굴 (or 넝쿨) as the standard everyday word."
    },
    {
      hangul: "벼레",
      roman: "Byeore",
      icon: "cliff",
      english: "Cliff",
      modernKo: "절벽",
      meaning: "An old word for a steep cliff or precipice.",
      note: "Modern Korean uses 벼랑 or 절벽 as the standard terms."
    },
    {
      hangul: "실",
      roman: "Sil",
      icon: "valley",
      english: "Valley",
      modernKo: "골짜기",
      meaning: "An old word for a deep valley between mountains.",
      note: "Modern Korean uses 골짜기 or 계곡 as the everyday terms."
    }
  ];

  const roundLabel = document.getElementById("p08RoundLabel");
  const subEl = document.getElementById("p08Sub");
  const progressEl = document.getElementById("p08Progress");

  const stageR1 = document.getElementById("p08StageR1");
  const stageR2 = document.getElementById("p08StageR2");

  const r1Card = document.getElementById("p08R1Card");
  const r1Front = document.getElementById("p08R1Front");
  const r1Back = document.getElementById("p08R1Back");

  const prevBtn = document.getElementById("p08PrevBtn");
  const nextBtn = document.getElementById("p08NextBtn");
  const restartBtn = document.getElementById("p08RestartBtn");

  const checkBtn = document.getElementById("p08CheckBtn");
  const editBtn = document.getElementById("p08EditBtn");
  const clearBtn = document.getElementById("p08ClearBtn");
  const backBtn = document.getElementById("p08BackBtn");
  const grid = document.getElementById("p08Grid");

  let r1Index = 0;
  let quizOrder = [];
  let checked = false;

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setHeaderRound1() {
    roundLabel.textContent = "ROUND 1";
    subEl.textContent = "Learn with flashcards. Click the card to flip.";
    progressEl.textContent = `${r1Index + 1}/${WORDS.length}`;
  }

  function setHeaderRound2(score = null) {
    roundLabel.textContent = "ROUND 2";
    subEl.textContent = 'Type each answer in Hangul, then press “Check answers”.';
    progressEl.textContent = score === null ? `0/${WORDS.length}` : `${score}/${WORDS.length}`;
  }

  function getIconSvg(kind) {
    const common = `fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

    if (kind === "fruit") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M32 18c-9 0-16 7-16 16s7 18 16 18 16-9 16-18-7-16-16-16z"/>
          <path ${common} d="M32 18c0-6 3-10 8-12"/>
          <path ${common} d="M40 6c-6 0-10 3-12 8"/>
          <path ${common} d="M39 10c4 0 7 2 9 6"/>
        </svg>
      `;
    }

    if (kind === "bear") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle ${common} cx="20" cy="20" r="6"/>
          <circle ${common} cx="44" cy="20" r="6"/>
          <path ${common} d="M18 48c0-10 6-18 14-18s14 8 14 18"/>
          <circle ${common} cx="32" cy="34" r="3"/>
          <path ${common} d="M24 40c2 2 5 3 8 3s6-1 8-3"/>
        </svg>
      `;
    }

    if (kind === "dragon") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M44 14c-6 0-10 4-10 10 0 4 2 7 6 8-10 3-16 8-16 14 0 6 6 10 14 10"/>
          <path ${common} d="M36 14l4-4"/>
          <path ${common} d="M40 18l6-2"/>
          <path ${common} d="M46 26c2 0 4 2 4 4"/>
          <path ${common} d="M18 50c6 0 10-3 10-7"/>
        </svg>
      `;
    }

    if (kind === "moss") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M16 46c6-8 10-8 16 0"/>
          <path ${common} d="M28 46c6-10 10-10 16 0"/>
          <path ${common} d="M18 36c0-4 3-6 6-6"/>
          <path ${common} d="M30 34c0-4 3-6 6-6"/>
          <path ${common} d="M42 36c0-4 3-6 6-6"/>
        </svg>
      `;
    }

    if (kind === "river") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M14 18c8 0 8 10 16 10s8-10 16-10 8 10 18 10"/>
          <path ${common} d="M14 30c8 0 8 10 16 10s8-10 16-10 8 10 18 10"/>
          <path ${common} d="M14 42c8 0 8 10 16 10s8-10 16-10 8 10 18 10"/>
        </svg>
      `;
    }

    if (kind === "evening") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M14 42h36"/>
          <path ${common} d="M20 42c2-10 8-16 14-16s12 6 14 16"/>
          <path ${common} d="M32 26v-8"/>
          <path ${common} d="M24 22l-4-4"/>
          <path ${common} d="M40 22l4-4"/>
        </svg>
      `;
    }

    if (kind === "cloud") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M22 44h22c6 0 10-4 10-10s-4-10-10-10c-2 0-4 0-6 2-2-6-7-10-14-10-8 0-14 6-14 14 0 8 6 14 12 14z"/>
          <path ${common} d="M26 50v6"/>
          <path ${common} d="M34 50v6"/>
          <path ${common} d="M42 50v6"/>
        </svg>
      `;
    }

    if (kind === "wind") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M14 28h28c6 0 8-6 4-10"/>
          <path ${common} d="M14 38h36c6 0 8-6 4-10"/>
          <path ${common} d="M14 48h22c6 0 8-6 4-10"/>
        </svg>
      `;
    }

    if (kind === "bud") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M32 50c10-6 14-16 14-24-6 0-10 2-14 6-4-4-8-6-14-6 0 8 4 18 14 24z"/>
          <path ${common} d="M32 50v8"/>
        </svg>
      `;
    }

    if (kind === "vine") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M26 56c0-12 18-12 18-24 0-6-4-10-10-10-6 0-10 4-10 10"/>
          <path ${common} d="M22 26c-4 2-6 6-6 10"/>
          <path ${common} d="M40 20c4-2 8-2 12 0"/>
          <path ${common} d="M18 38c4 0 6 2 8 6"/>
          <path ${common} d="M44 34c-4 0-6 2-8 6"/>
        </svg>
      `;
    }

    if (kind === "cliff") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M18 54V18l10 10 8-12 10 10v28"/>
          <path ${common} d="M14 54h36"/>
        </svg>
      `;
    }

    if (kind === "valley") {
      return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path ${common} d="M10 50l14-24 10 18 8-14 12 20"/>
          <path ${common} d="M10 50h44"/>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle ${common} cx="32" cy="32" r="18"/>
      </svg>
    `;
  }

  function renderRound1Card() {
    const item = WORDS[r1Index];

    r1Front.innerHTML = `
      <span class="p08-icon">${getIconSvg(item.icon)}</span>
      <span class="p08-hangul">${escapeHtml(item.hangul)}</span>
      <span class="p08-roman">${escapeHtml(item.roman)}</span>
      <span class="p08-hint">Click to reveal the meaning</span>
    `;

    r1Back.innerHTML = `
      <span class="p08-backInner">
        <span class="p08-english">${escapeHtml(item.english)}</span>
        <span class="p08-label">Meaning</span>
        <span class="p08-meaning">${escapeHtml(item.meaning)}</span>
      </span>
    `;

    prevBtn.disabled = (r1Index === 0);
    nextBtn.disabled = false;

    r1Card.classList.remove("is-flipped");
    setHeaderRound1();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getClue(item) {
    /* 문제 문장에서는 old/older/once used 같은 표현 배제 */
    const map = {
      "여름": "A word meaning fruit, or the fruition of effort.",
      "고마": "A bear in the mountains, often imagined as clever and mysterious.",
      "미르": "A dragon.",
      "덛": "Moss that grows low on rocks or tree bark.",
      "가람": "A long, wide river.",
      "나조": "Evening, the time when the sun goes down.",
      "매지": "Dark, heavy rainclouds hanging low as if rain is about to fall.",
      "하늬": "The west direction, or a cool wind from the west.",
      "볻": "A flower bud just before it blooms.",
      "글개": "A vine that stretches and wraps around fences or trees.",
      "벼레": "A steep cliff or precipice.",
      "실": "A deep valley between mountains."
    };
    return map[item.hangul] || "Write the Hangul word that matches this meaning.";
  }

  function buildQuiz() {
    checked = false;
    grid.innerHTML = "";

    quizOrder = shuffle([...Array(WORDS.length)].map((_, i) => i));

    quizOrder.forEach((wordIdx, pos) => {
      const item = WORDS[wordIdx];

      const card = document.createElement("div");
      card.className = "p08-qCard is-noanswer";
      card.dataset.wordIndex = String(wordIdx);

      const clue = getClue(item);

      card.innerHTML = `
        <div class="p08-qInner">
          <div class="p08-qFace p08-qFront">
            <div class="p08-qTop">
              <div class="p08-qNum">Card ${pos + 1}</div>
              <div class="p08-qBadge" data-badge>Not checked</div>
            </div>

            <div class="p08-qClue">${escapeHtml(clue)}</div>

            <div class="p08-qRow">
              <label for="ans-${pos}">Answer</label>
              <input id="ans-${pos}" type="text" inputmode="text" autocomplete="off" spellcheck="false" placeholder="Type the Hangul word" />
            </div>
          </div>

          <div class="p08-qFace p08-qBack">
            <div class="p08-qResultTop">
              <div class="p08-qResultTitle">Result</div>
              <div class="p08-qResultBadge" data-resultBadge>No answer</div>
            </div>

            <div class="p08-qBackBody" data-backBody></div>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    setHeaderRound2(null);
  }

  function enterRound2() {
    stageR1.classList.add("p08-hidden");
    stageR2.classList.remove("p08-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    buildQuiz();
  }

  function backToRound1() {
    stageR2.classList.add("p08-hidden");
    stageR1.classList.remove("p08-hidden");
    setHeaderRound1();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function normaliseHangul(s) {
    return String(s || "").trim().normalize("NFC");
  }

  function checkAnswers() {
    if (checked) return;

    let correct = 0;

    const cards = Array.from(grid.querySelectorAll(".p08-qCard"));
    cards.forEach((card) => {
      const wordIdx = Number(card.dataset.wordIndex);
      const item = WORDS[wordIdx];

      const input = card.querySelector("input");
      const badge = card.querySelector("[data-badge]");
      const resultBadge = card.querySelector("[data-resultBadge]");
      const backBody = card.querySelector("[data-backBody]");

      const user = normaliseHangul(input.value);
      const isEmpty = user.length === 0;
      const isCorrect = (!isEmpty && user === item.hangul);

      card.classList.remove("is-correct", "is-wrong", "is-noanswer");

      if (isEmpty) {
        card.classList.add("is-noanswer");
        badge.textContent = "No answer";
        resultBadge.textContent = "No answer";
      } else if (isCorrect) {
        card.classList.add("is-correct");
        badge.textContent = "Correct";
        resultBadge.textContent = "Correct";
        correct += 1;
      } else {
        card.classList.add("is-wrong");
        badge.textContent = "Incorrect";
        resultBadge.textContent = "Incorrect";
      }

      /* Round 2에서는 옛말/대체 설명(note) 다시 복구 */
      backBody.innerHTML = `
        <div class="p08-qHangul">${escapeHtml(item.hangul)}</div>
        <div class="p08-qEnglish">${escapeHtml(item.english)}</div>
        <div class="p08-qRoman">${escapeHtml(item.roman)}</div>

        <div class="p08-qKV">
          <div class="p08-qKey">Your answer</div>
          <div class="p08-qVal">${isEmpty ? "—" : escapeHtml(user)}</div>
        </div>

        <div class="p08-qKV">
          <div class="p08-qKey">Correct answer</div>
          <div class="p08-qVal">${escapeHtml(item.hangul)}</div>
        </div>

        <div class="p08-qKV">
          <div class="p08-qKey">Modern word</div>
          <div class="p08-qVal">${escapeHtml(item.modernKo)}</div>
        </div>

        <div class="p08-qKV">
          <div class="p08-qKey">Meaning</div>
          <div class="p08-qVal">${escapeHtml(item.meaning)}</div>
        </div>

        <div class="p08-qKV">
          <div class="p08-qKey">Note</div>
          <div class="p08-qVal">${escapeHtml(item.note)}</div>
        </div>
      `;

      input.disabled = true;
      card.classList.add("is-flipped");
    });

    checked = true;
    setHeaderRound2(correct);
  }

  function editAnswers() {
    checked = false;
    setHeaderRound2(null);

    const cards = Array.from(grid.querySelectorAll(".p08-qCard"));
    cards.forEach((card) => {
      const input = card.querySelector("input");
      const badge = card.querySelector("[data-badge]");

      input.disabled = false;
      badge.textContent = "Not checked";

      card.classList.remove("is-flipped");
      card.classList.remove("is-correct", "is-wrong");
      card.classList.add("is-noanswer");
    });
  }

  function clearAnswers() {
    const cards = Array.from(grid.querySelectorAll(".p08-qCard"));
    cards.forEach((card) => {
      const input = card.querySelector("input");
      input.value = "";
    });
    editAnswers();
  }

  function restartAll() {
    r1Index = 0;
    renderRound1Card();

    checked = false;
    quizOrder = [];
    grid.innerHTML = "";

    stageR2.classList.add("p08-hidden");
    stageR1.classList.remove("p08-hidden");
    setHeaderRound1();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFlip() {
    r1Card.classList.toggle("is-flipped");
  }

  r1Card.addEventListener("click", toggleFlip);
  r1Card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (r1Index <= 0) return;
    r1Index -= 1;
    renderRound1Card();
  });

  nextBtn.addEventListener("click", () => {
    if (r1Index < WORDS.length - 1) {
      r1Index += 1;
      renderRound1Card();
      return;
    }
    enterRound2();
  });

  restartBtn.addEventListener("click", restartAll);

  checkBtn.addEventListener("click", checkAnswers);
  editBtn.addEventListener("click", editAnswers);
  clearBtn.addEventListener("click", clearAnswers);
  backBtn.addEventListener("click", backToRound1);

  renderRound1Card();
});
