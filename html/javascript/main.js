function comenzarJuego(event) {
  // Luego de haber configurado el juego, cuando se presiona el botón de comenzar juego
  // se debe ocultar el formulario de configuración

  // Evitamos que el boton haga submit. No queremos que recargue la página
  event.preventDefault();
  event.stopPropagation();
  
  // Ocultamos el formulario de configuración agregando la clase 'oculto'
  // que podemos encontrar en css/styles.css
  document.getElementById('form-configuracion').classList.add('oculto');
  
  return false;   
}


document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");
  // Agregamos todos los eventos que correspondan

  // Boton "Comenzar Juego" del panel de "Configuración"
  document.getElementById("comenzar-juego").addEventListener("click", comenzarJuego);

  

});