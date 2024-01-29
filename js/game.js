let count = 0;

document.addEventListener('DOMContentLoaded', () => {
  music_before_game.play();
});

paws.forEach(paw => {
  paw.addEventListener('click', () => {
    count++;
    score.textContent = count;
    meow.play();
  });
});

function start_game() {
  count = 0;
  // first_section.classList.add('go-up');
  setTimeout(() => {
    first_section.classList.add('none');
    section_end_game.classList.add('none');
    game_section.classList.remove('none');
    // game_section.classList.add('go-down');
    counter_before_game()
    container_before_game.classList.remove('none');
    // game_section.classList.remove('go-up-phone');
  }, 1000);
}

function counter_before_game() {
  music_before_game.pause();
  music_countdown.currentTime = 0;
  music_countdown.play();
  reverse_counter.textContent = 3;
  setTimeout(() => {
    reverse_counter.textContent = 2;
  }, 1000);
  setTimeout(() => {
    reverse_counter.textContent = 1;
  }, 2000);
  setTimeout(() => {
    border_reverse_counter.classList.add('none');
    reverse_counter.textContent = 'GO';
  }, 3000);
  setTimeout(() => {
    container_before_game.classList.add('disappear');
    container_before_game.classList.add('none');
    counter_during_game()
    music_countdown.pause();
    container_before_game.classList.remove('disappear');
    border_reverse_counter.classList.remove('none');
  }, 4000);
}

function counter_during_game() {
  music_during_game.currentTime = 0;
  music_during_game.play();
  let time = 9;
  const timer = setInterval(() => {
    if (time === 0) {
      clearInterval(timer);
      end_game();
    } else {
      time--;
      game_counter.textContent = time;
    }
  }, 1000);
}

function end_game() {
  container_end_game.classList.remove('none');
  music_during_game.pause();
  music_after_game.currentTime = 0;
  music_after_game.play();
  setTimeout(() => {
    container_end_game.classList.add('none');
    // game_section.classList.remove('go-down');
    // game_section.classList.add('go-up-phone');
  }, 2000);
  setTimeout(() => {
    game_section.classList.add('none');
    section_end_game.classList.remove('none');
    // section_end_game.classList.add('go-down-end-game');
    game_score.textContent = count;
    save_score(count);
    best_score.textContent = localStorage.getItem('score');
  }, 3000);
  setTimeout(() => {
    music_after_game.pause();
    music_before_game.currentTime = 0;
    music_before_game.play();
  }, 5000);
}

function save_score(score) {
  if(!localStorage.getItem('score') || localStorage.getItem('score') < score) {
    localStorage.setItem('score', score);
  }
}
