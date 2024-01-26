let isMusicPlaying = true;

function toggleMusic(){
  if(isMusicPlaying){
    music_before_game.volume = 0;
    music_during_game.volume = 0;
    music_after_game.volume = 0;
    music_countdown.volume = 0;
    meow.volume = 0;
    i_play_music.src = "../assets/volume-mute.svg";
  } else {
    music_before_game.volume = 1;
    music_during_game.volume = 1;
    music_after_game.volume = 0.5;
    music_countdown.volume = 1;
    meow.volume = 1;
    i_play_music.src = "../assets/volume-down.svg";
  }
  isMusicPlaying = !isMusicPlaying;
}

function sw_succes(message){
  const succes = () =>{
    swal({
      title: "Succes!",
      text: message,
      icon: "success",
      button: false,
      timer: 2000
    });
  }
  return succes;
};

function sw_error(title, message){
  const error = () =>{
    swal({
      title: title,
      text: message,
      icon: "error",
    });
  }
  return error;
};

function generate_notification(res, data, action){
  if(res.ok){
    const succes_m = sw_succes('You have ' + action + ' succesfull!');
    succes_m();
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
};
