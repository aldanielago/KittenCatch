const URL = "https://api.thecatapi.com/v1/images/search";

// Resquest to the API to get images
async function get_images(){
  const res = await fetch(`${URL}?limit=3`);
  const data = await res.json();
  console.log(data);
  append_images(data);
};

get_images();