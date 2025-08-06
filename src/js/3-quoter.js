const beginnings = [
  "Каждый должен понять, что",
  "Истинный смысл жизни — это",
  "Мудрец однажды сказал:",
  "Запомни навсегда:",
  "Настоящая сила приходит, когда"
];

const verbs = ["думать", "молчать", "двигаться", "мечтать", "бороться"];


const objects = ["о вечности", "за любовь", "о варениках", "о себе", "о смысле кода"];


const quoteBtn = document.querySelector('#generateBtn');
const quoteOutput = document.querySelector('.quoteOutput')
quoteBtn.addEventListener('click', () => {
    createQuote([beginnings,verbs,objects]);
})



function createQuote([beginnings, verbs, objects]) {
    
    const random = (array) => array[Math.floor(Math.random() * array.length)];
    
    quoteOutput.textContent = `${random(beginnings)} ${ random(verbs) } ${random(objects)}`

}