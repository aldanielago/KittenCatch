// DOM MANIPULATION //
const $ = (id) => document.querySelector(id);

// Principal page
const paws = document.querySelectorAll('.paw');

// Api requests rection
const container = $('#container'); // Images arrives here
const btn_change_cat = $('.btn-change-cat');

// DOM INTERACTION //
btn_change_cat.addEventListener('click', () => {
  get_images();
});

function append_images(data){
  container.innerHTML = '';
  data.forEach(e => {
    const img = document.createElement('img');

    img.src = e.url;
    img.alt = e.id;
    img.classList.add('img');
    container.innerHTML += img.outerHTML;
  });
};
