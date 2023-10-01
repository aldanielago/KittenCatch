const $ = (id) => document.querySelector(id);

// Api requests section
const container_random_images = $('#container-random-images');
const container_favorite_images = $('#container-favorite-images');
const btn_change_cat = $('.btn-change-cat');

btn_change_cat.addEventListener('click', () => {
  get_anything(`${URL}?limit=3`, append_images, container_random_images);
});


function append_images(data, container, param){
  console.log(data);
  container.innerHTML = '';
  data.forEach(e => {
    const mini_container = document.createElement('div');
    mini_container.classList.add('relative');
    const img = create_image_cat(e, param);
    const btn = create_favorite_button(e);

    mini_container.appendChild(img);
    mini_container.appendChild(btn);
    container.appendChild(mini_container);
  });
};

function create_image_cat(e, param){
  const img = document.createElement('img');
  param == 'random' ? img.src = e.url : img.src = e.image.url
  img.alt = e.id;
  img.classList.add('img_cat');
  return img;
}

function create_favorite_button(e){
  const btn = document.createElement('button');
  const img = document.createElement('img');
  img.src = './assets/suit-heart.svg';
  btn.classList.add('btn_dislike')

  btn.addEventListener('click', () => {
    post_add_favorite_kitten(e.id);
  })
  btn.appendChild(img);
  return btn;
}