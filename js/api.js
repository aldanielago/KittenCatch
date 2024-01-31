const URL = "https://api.thecatapi.com/v1";
const secret = 'live_J9AQh9q3XIn68qL5EO2oXgDSqRL5iH4xzexuYBxSWYu1m0sPAIE4k8sy6UDdyb81';

function object_post(content, content_type){
  const obj = {
    method: 'POST',
    mode: 'cors',
		credentials: 'same-origin',
    headers: {
      'x-api-key': secret
    },
    body: content
  }

  if(content_type){
    obj.headers['Content-Type'] = content_type
  }
  return obj;
};

async function get_anything(url, container, type = 'random'){
  const res = await fetch(url, {
    headers: {
      'x-api-key': secret
    }
  });
  const data = await res.json();

  if(res.ok){
    append_images(data, container, type);
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
};

async function post_add_favorite_kitten(id){
  const res = await fetch(`${URL}/favourites`, object_post(
    JSON.stringify({ image_id: id }), 'application/json'
  ));
  const data = await res.json();

  generate_notification(res, data, 'added a cat to your favorite list');
  get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');
};

async function delete_favorite_kitten(id){
  const res = await fetch(`${URL}/favourites/${id}`, {
    method: 'DELETE',
    mode: 'cors',
		credentials: 'same-origin',
    headers: {
      'x-api-key': secret
    }
  });
  const data = await res.json();

  generate_notification(res, data, 'deleted a cat from your favorite list');
  get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');
};

async function upload_kitten_photo(){
  const form = document.querySelector('.form-upload-kitten');
  const form_data = new FormData(form);

  if(form_data == null || form_data == undefined){
    sw_error('Error', 'You must select a file')();
  } else {
    const res = await fetch(`${URL}/images/upload`, object_post(form_data));
    const data = await res.json();
    post_add_favorite_kitten(data.id)
    generate_notification(res, data, 'uploaded a photo of you kitten');
    get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');
  }
};

get_anything(`${URL}/images/search?limit=5`, container_random_images);
get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');