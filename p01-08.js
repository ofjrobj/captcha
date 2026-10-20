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
    // One 64px drawing grid; inherit the existing flashcard's blue ink.
    const drawings = {
      fruit: `
        <path d="M29 17c-1 9-5 15-10 19M29 17c7 4 12 10 15 19"/>
        <path d="M29 17c2-8 10-10 19-8-3 8-10 12-19 8Z"/>
        <path d="M30 16l10-3"/>
        <path d="M20 34c-5-3-12 1-12 8 0 8 5 13 11 13s11-5 11-13c0-7-5-10-10-8Z"/>
        <path d="M44 34c-5-3-11 1-11 8 0 8 5 13 11 13s12-5 12-13c0-7-6-10-12-8Z"/>
        <path d="M13 41c0-2 1-3 3-4M38 41c0-2 1-3 3-4"/>
      `,
      bear: `
        <path d="M16 22c-7-1-8-8-4-12 4-4 11-2 12 4M40 14c1-6 8-8 12-4 4 4 3 11-4 12"/>
        <path d="M15 23c2-7 8-11 17-11s15 4 17 11c4 4 6 9 6 14 0 12-9 20-23 20S9 49 9 37c0-5 2-10 6-14Z"/>
        <path d="M17 17l2 2M47 17l-2 2"/>
        <ellipse cx="32" cy="41" rx="11" ry="9"/>
        <path d="m28 37 4 4 4-4ZM32 41v4m-5 0c2 3 8 3 10 0"/>
        <circle cx="23" cy="29" r="1.8" fill="currentColor" stroke="none"/>
        <circle cx="41" cy="29" r="1.8" fill="currentColor" stroke="none"/>
      `,
      dragon: `
        <path d="m31 17-4-8 8 4m6 3 4-8 2 10"/>
        <path d="M31 18c3-4 9-5 14-2l3 4 8 2-2 8-9 1c-6 1-11 5-11 9 0 4 5 5 8 3 5-3 11 0 11 5 0 6-7 9-15 9-14 0-24-7-24-17 0-8 6-14 14-18"/>
        <path d="M29 24c-7 6-8 11-6 16 2 6 9 9 16 9M19 29l-6-1 2 6-6 3 6 4M34 32l-6-2m3 5-7 1"/>
        <path d="m48 30 6 4 3-1M32 46l-5 7-5 1m5-1 1 4"/>
        <circle cx="43" cy="23" r="1.6" fill="currentColor" stroke="none"/>
      `,
      moss: `
        <path d="M8 47c0-4 3-7 7-7 1-5 6-8 10-6 4-5 11-4 14 1 6-2 11 2 12 7 4 0 6 2 6 5"/>
        <path d="M8 47c3 8 43 8 49 0M14 47l3-4m6 6 3-4m8 5 2-4m10 2 2-3"/>
        <path d="M18 36V23m0 6-6-5m6 2 5-5M31 31V14m0 8-6-5m6 2 6-5M44 36V23m0 6-5-5m5 2 6-5"/>
        <path d="M28 12c1-4 6-5 9-2-1 4-5 5-9 2ZM14 21c-1-4 2-7 6-6 2 4-1 7-6 6ZM43 20c1-4 6-5 9-2-1 4-5 5-9 2Z"/>
      `,
      river: `
        <path d="M29 8c-11 10 15 13 9 22-7 9-29 10-28 26M37 8c-5 8 16 13 11 23-4 10-24 15-25 25"/>
        <path d="M30 19h6m3 13h5M23 42h9m-14 9h8"/>
        <path d="M11 20v-6m0 4-4-3m4 1 4-4M52 49v-7m0 3-4-3m4 1 4-4"/>
      `,
      evening: `
        <path d="M8 39h48M14 47h36M22 54h20"/>
        <path d="M18 39a14 14 0 0 1 28 0"/>
        <path d="M32 17v-6M17 23l-4-4M47 23l4-4M10 32H5m49 0h5"/>
        <path d="M25 34c2-3 5-4 8-4"/>
      `,
      cloud: `
        <path d="M18 39h29c7 0 11-4 11-10s-5-11-11-11c-2 0-4 0-6 1-3-8-11-11-18-8-6 2-9 7-9 13-6 0-10 3-10 8s5 7 14 7Z"/>
        <path d="M14 32c7 3 29 3 35 0"/>
        <path d="m20 46-3 7m15-7-3 7m15-7-3 7"/>
      `,
      wind: `
        <path d="M7 23h31c7 0 10-4 8-8-2-5-9-5-11-1"/>
        <path d="M5 33h43c9 0 12-6 9-10-2-3-6-4-9-2"/>
        <path d="M9 43h20c6 0 10 3 9 7-1 5-7 7-11 3"/>
        <path d="M45 45c4-1 9 0 12 6-6 2-11 0-12-6Zm0 0 8 5"/>
      `,
      bud: `
        <path d="M32 8c-8 7-14 14-14 22 0 9 6 14 14 14s14-5 14-14c0-8-6-15-14-22Z"/>
        <path d="M32 8c6 12 7 24 0 36M18 25c7 4 11 10 14 19m14-19c-5 4-9 10-14 19M32 44v13"/>
        <path d="M32 53c-3-7-9-10-16-8 2 7 8 10 16 8Zm0-4c4-6 9-8 15-6-2 6-7 9-15 6Z"/>
      `,
      vine: `
        <path d="M26 57c-4-9-1-16 5-23 5-6 7-13 5-26"/>
        <path d="M35 19c3-9 9-12 18-10-1 9-8 14-18 10Zm-5 17c-10 0-16-5-16-14 9-1 16 5 16 14Zm-5 16c6-10 13-13 23-10-3 10-11 14-23 10Z"/>
        <path d="m35 19 10-6M30 36l-9-8m4 24 14-6M34 28c6 1 13-2 13-7"/>
        <path d="M27 43c-6 1-11-1-11-5 0-3 4-4 5-1"/>
      `,
      cliff: `
        <path d="M7 12h29l5 5-4 7 2 10-7 7 2 14H7"/>
        <path d="M7 23h16l6-5m-14 5 4 10-4 11m4-11h12m-16 11 9 5-2 6"/>
        <path d="m41 48 5-6 5 7m-13 6h20M7 7h17"/>
      `,
      valley: `
        <path d="M5 12 19 26l12 18L45 24 59 10M5 31l12 5 14 8 17-7 11-9"/>
        <path d="m13 20-2 13m11-2-1 7m30-20 1 16M31 44c-9 4 9 7 1 13M5 57h19m17 0h18"/>
      `
    };
    const drawing = drawings[kind] || drawings.fruit;
    return `<svg viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${drawing}</svg>`;
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
    // Reviewing the learning cards must not erase an existing quiz attempt.
    if (!quizOrder.length) buildQuiz();
    else setHeaderRound2(checked ? grid.querySelectorAll(".p08-qCard.is-correct").length : null);
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
      // The hidden result shares a grid cell; remove stale content on editing.
      card.querySelector("[data-backBody]").replaceChildren();

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
