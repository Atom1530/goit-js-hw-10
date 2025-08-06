const pet = {
  hunger: 5,
  happiness: 5,
  energy: 5,
  mood: {
    sad: "😢",
    happy: "😋",
    enjoy: "🐶",
    sleepy: "🥱"
  },

  feedPet() {
    this.hunger = Math.min(this.hunger + 2, 10);
    this.happiness = Math.min(this.happiness + 1, 10);
  },

  playWithPet() {
    this.happiness = Math.min(this.happiness + 2, 10);
    this.hunger = Math.max(this.hunger - 1, 0);
    this.energy = Math.max(this.energy - 2, 0);
  },

  putPetToSleep() {
    this.energy = Math.min(this.energy + 3, 10);
    this.hunger = Math.max(this.hunger - 2, 0);
  },

  checkMood() {
    if (this.energy <= 2) return this.mood.sleepy;
    if (this.hunger <= 2) return this.mood.sad;
    if (this.happiness >= 8) return this.mood.happy;
    return this.mood.enjoy;
  }
};

const hunger = document.querySelector('.hunger');
const happiness = document.querySelector('.happiness');
const energy = document.querySelector('.energy');
const emoji = document.querySelector('#petEmoji');
const status = document.querySelector('#petStatus');

// Функция отображения всех параметров
function showStats() {
  hunger.textContent = pet.hunger;
  happiness.textContent = pet.happiness;
  energy.textContent = pet.energy;
  emoji.textContent = pet.checkMood();

  if (pet.hunger <= 2) {
    status.textContent = 'Питомец голоден!';
  } else if (pet.energy <= 2) {
    status.textContent = 'Питомец устал!';
  } else if (pet.happiness >= 8) {
    status.textContent = 'Питомец счастлив!';
  } else {
    status.textContent = 'Питомец ждёт твоего внимания...';
  }
}

// Кнопки
document.querySelector('#feedBtn').addEventListener('click', () => {
  pet.feedPet();
  showStats();
});

document.querySelector('#playBtn').addEventListener('click', () => {
  pet.playWithPet();
  showStats();
});

document.querySelector('#sleepBtn').addEventListener('click', () => {
  pet.putPetToSleep();
  showStats();
});

// Инициализация
showStats();
