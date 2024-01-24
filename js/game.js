const score = document.querySelector('#score');
const paws = document.querySelectorAll('.paw');

const btnStart = $('.btn-start');
const welcomePage = $('.welcome-page');
const phoneSection = $('.phone');

function startGame() {
  welcomePage.classList.add('go-up');
  setTimeout(() => {
    welcomePage.classList.add('none');
    phoneSection.classList.remove('none');
    phoneSection.classList.add('go-down');
  }, 1000);
}

let count = 0;
paws.forEach(paw => {
  paw.addEventListener('click', () => {
    count++;
    score.textContent = count;
  });
});
