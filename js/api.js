const URL = "https://api.thecatapi.com/v1";
const secret = 'live_J9AQh9q3XIn68qL5EO2oXgDSqRL5iH4xzexuYBxSWYu1m0sPAIE4k8sy6UDdyb81';

async function get_anything(url, callback, container, param = 'random'){
  const res = await fetch(url);
  const data = await res.json();

  if(res.status >= 200 || res.status < 300){
    callback(data, container, param);
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
}

async function post_add_favorite_kitten(id){
  const res = await fetch(`${URL}/favourites?api_key=${secret}`, {
    method: 'POST',
    mode: 'cors',
		credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': secret
    },
    body: JSON.stringify({
      image_id: id
    })
  });
  const data = await res.json();

  if(res.ok){
    const succes_m = sw_succes('You have added a cat to your favorite list succesfull!');
    succes_m();
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
}

// Resquest to the API to get images
get_anything(`${URL}/images/search?limit=3`, append_images, container_random_images);

// Request to the API for favorite kittens
get_anything(`${URL}/favourites?api_key=${secret}`, append_images, container_favorite_images, 'favorite');