let words = [];
let index = 0;

/* Quiz */
let quizWords = [];
let quizIndex = 0;
let score = 0;

/* Elements */
const wordEl = document.getElementById("word");
const thaiEl = document.getElementById("thai");
const counter = document.getElementById("counter");
const flashcard = document.getElementById("flashcard");

const dailyWord = document.getElementById("daily-word");
const dailyThai = document.getElementById("daily-thai");

const quizThai = document.getElementById("quiz-thai");
const answerInput = document.getElementById("answer");
const qCount = document.getElementById("q-count");

/* Load vocab */
fetch("vocab.json")
  .then(res => res.json())
  .then(data => {
    words = data;
    updateCard();
    randomDailyWord();
  });

/* Flashcard */
function updateCard() {
  wordEl.textContent = words[index].en.toUpperCase();
  thaiEl.textContent = words[index].th;
  counter.textContent = `${index + 1} / ${words.length}`;
  flashcard.classList.remove("flip");
}

flashcard.onclick = () => {
  flashcard.classList.toggle("flip");
};

document.getElementById("next").onclick = () => {
  index = (index + 1) % words.length;
  updateCard();
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + words.length) % words.length;
  updateCard();
};

/* Vocab time */
function randomDailyWord() {
  const r = Math.floor(Math.random() * words.length);
  dailyWord.textContent = words[r].en.toUpperCase();
  dailyThai.textContent = words[r].th;
}

document.getElementById("refresh").onclick = randomDailyWord;

/* Page switch */
document.getElementById("playQuiz").onclick = () => {
  startQuiz();
  document.getElementById("flashcard-page").classList.remove("active");
  document.getElementById("quiz-page").classList.add("active");
};

document.getElementById("homeBtn").onclick = () => {
  document.getElementById("quiz-page").classList.remove("active");
  document.getElementById("flashcard-page").classList.add("active");
};

/* Quiz logic */
function startQuiz() {
  quizWords = [...words].sort(() => Math.random() - 0.5).slice(0, 20);
  quizIndex = 0;
  score = 0;
  answerInput.disabled = false;
  showQuiz();
}

function showQuiz() {
  if (quizIndex >= quizWords.length) {
    quizThai.textContent = `Score: ${score} / 20`;
    qCount.textContent = "FINISHED";
    answerInput.disabled = true;
    return;
  }

  quizThai.textContent = quizWords[quizIndex].th;
  qCount.textContent = `QUESTION ${quizIndex + 1} / 20`;
  answerInput.value = "";
}

answerInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    if (answerInput.value.trim().toLowerCase() === quizWords[quizIndex].en.toLowerCase()) {
      score++;
    }
    quizIndex++;
    showQuiz();
  }
});
