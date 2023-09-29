function sw_succes(message){
  const succes = () =>{
    swal({
      title: "Succes!",
      text: message,
      icon: "success",
    });
  }
  return succes;
}

function sw_error(title, message){
  const error = () =>{
    swal({
      title: title,
      text: message,
      icon: "error",
    });
  }
  return error;
}