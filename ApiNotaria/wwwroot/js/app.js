var baseUrl='http://localhost:5000/api/usuarios/';

window.onload = function() {
 
}
var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = './index.html'
}
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username);
  axios.get(baseUrl+username+'/'+password)
            .then(function (response) {
                this.response = response.data
                var usuario = this.response[0].USUARIO
                var contra = this.response[0].CLAVE
               console.log(usuario);
               console.log(contra);
                  }).then((result) => {
                    if(response.length>0){ 
                      Swal.fire({
                        text: 'BIENVENIDO',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          window.location.href = './index.html';
                        }
                      });
            
                    }
                    else{
                      Swal.fire(
                        'Ups!',
                        'El usuario o la contraseña no son correctos',
                        'error'
                      );
                    }
                }
                  )
            .catch(function (error) {
                console.log(error);
                Swal.fire(
                    'ERROR',
                    'INGRESA DATOS',
                    'error'
                  ).then(function() {
                    window.location = "";
                });
            });
        
  
}


/**
 *
 * .then(function (response) {
      return response.data;
    }) .then(function (response) {
      if(response.length>0){
        var respuesta=response[0];
        Swal.fire(
          'Bienvenido!',
          respuesta.NOMBRE,
          'success'
        );
      }else{
        Swal.fire(
          'Ups!',
          'El usuario o la contraseña no son correctos',
          'error'
        );
      }
    })
    
    .catch(error=>{
      Swal.fire(
        'Ups!',
        'Debes ingresar usuario y contraseña',
        'error'
      );
 
    })
 */