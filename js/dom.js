// DOM MANIPULATION //
const $ = (id) => document.querySelector(id);

// Principal page
const paws = document.querySelectorAll('.paw');

// Api requests section
const container_random_images = $('#container-random-images');
const container_favorite_images = $('#container-favorite-images');
const btn_change_cat = $('.btn-change-cat');

// DOM INTERACTION //
btn_change_cat.addEventListener('click', () => {
  get_anything(`${URL}?limit=3`, append_images, container_random_images);
});


function append_images(data, container){
  container.innerHTML = '';
  data.forEach(e => {
    const mini_container = document.createElement('div');
    const img = create_image_cat(e);
    mini_container.innerHTML += img.outerHTML;

    container.innerHTML += mini_container.outerHTML;
  });
};

function create_image_cat(e){
  const img = document.createElement('img');
  img.src = e.url;
  img.alt = e.id;
  img.classList.add('img_cat');
  return img;
}

function add_favorite_button(e){
  const btn = document.createElement('button');
  
}
