const ingredientBox = document.querySelector('#ingredientBox');
const startBtn = document.querySelector('#startBtn');
const keepBtn = document.querySelector('#keepBtn');
const dropBtn = document.querySelector('#dropBtn');
const skipBtn = document.querySelector('#skipBtn');
const scoreDisplay = document.querySelector('#score');

const ingredients = [
  { name: "💎 Алмаз", type: "valuable", reward: 5 },
  { name: "🪙 Золотая руда", type: "valuable", reward: 3 },
  { name: "🌿 Трава", type: "neutral", reward: 0 },
  { name: "🧄 Чеснок", type: "neutral", reward: 0 },
  { name: "💩 Грязь", type: "bad", penalty: -2 },
  { name: "🦴 Кость", type: "bad", penalty: -1 }
];

let currentIngredient = null;
let score = 0;
let intervalId = null;

// Генерация случайного ингредиента
function getRandomIngredient() {
  const index = Math.floor(Math.random() * ingredients.length);
  return ingredients[index];
}

// Обновление экрана
function showIngredient() {
  currentIngredient = getRandomIngredient();
  ingredientBox.textContent = currentIngredient.name;
}

// Обновление счёта
function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

// Кнопки действий
keepBtn.addEventListener('click', () => {
  if (!currentIngredient) return;

  if (currentIngredient.type === "valuable") {
    score += currentIngredient.reward;
  } else if (currentIngredient.type === "bad") {
    score += currentIngredient.penalty; // штраф
  }
  // neutral — ничего не даёт
  nextIngredient();
});

dropBtn.addEventListener('click', () => {
  if (!currentIngredient) return;

  if (currentIngredient.type === "bad") {
    score += 1; // правильно выбросили
  } else if (currentIngredient.type === "valuable") {
    score -= 2; // ошиблись!
  }
  // neutral — ничего
  nextIngredient();
});

skipBtn.addEventListener('click', () => {
  // пропуск — ничего не меняется
  nextIngredient();
});

// Показать след. ингредиент
function nextIngredient() {
  showIngredient();
  updateScoreDisplay();
}

// Старт игры
startBtn.addEventListener('click', () => {
  if (intervalId) return; // не запускаем повторно

  showIngredient();
  updateScoreDisplay();

  intervalId = setInterval(() => {
    showIngredient();
  }, 3000); // меняем ингредиент каждые 3 сек
});
