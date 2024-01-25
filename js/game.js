const score = document.querySelector('#score');
const paws = document.querySelectorAll('.paw');

// Welcome page
const btnStart = $('.btn-start');
const welcomePage = $('.welcome-page');
const phoneSection = $('.phone');

// 3 seconds before game
const countainer_before_game = $('.container-counter-before-game');
const reverseCounter = $('.reverse-counter');
const borderReverseCounter = $('.border-button-blur');

// During the game
const gameContainer = $('.counter-during-game');

// End game
const container_end_game = $('.container-after-game');

// Music
const music_before_game = $('#music-before-game');
const music_during_game = $('#music-during-game');
const music_after_game = $('#music-after-game');
const music_countdown = $('#music-countdown');
const meow = $('#meow1');

music_before_game.play();

function startGame() {
  welcomePage.classList.add('go-up');
  setTimeout(() => {
    welcomePage.classList.add('none');
    phoneSection.classList.remove('none');
    phoneSection.classList.add('go-down');
    counterBeforeGame();
    countainer_before_game.classList.remove('none');
  }, 1000);
}

function counterBeforeGame() {
  music_before_game.pause();
  music_countdown.play();
  reverseCounter.textContent = 3;
  setTimeout(() => {
    reverseCounter.textContent = 2;
  }, 1000);
  setTimeout(() => {
    reverseCounter.textContent = 1;
  }, 2000);
  setTimeout(() => {
    borderReverseCounter.classList.add('none');
    reverseCounter.textContent = 'GO';
  }, 3000);
  setTimeout(() => {
    countainer_before_game.classList.add('disappear');
    countainer_before_game.classList.add('none');
    counterDuringGame();
    music_countdown.pause();
  }, 4000);
}

function counterDuringGame() {
  music_during_game.play();
  let time = 10;
  const timer = setInterval(() => {
    if (time === 0) {
      clearInterval(timer);
      endGame();
    } else {
      time--;
      gameContainer.textContent = time;
    }
  }, 1000);
}

function endGame() {
  container_end_game.classList.remove('none');
  music_during_game.pause();
  setTimeout(() => {
    music_after_game.play();
    container_end_game.classList.add('none');
    phoneSection.classList.remove('go-down');
    phoneSection.classList.add('go-up-phone');
  }, 2000);
  setTimeout(() => {
    phoneSection.classList.add('none');
    music_after_game.pause();
    music_before_game.play();
  }, 2900);
}

let count = 0;
paws.forEach(paw => {
  paw.addEventListener('click', () => {
    count++;
    score.textContent = count;
    meow.play();
  });
});
