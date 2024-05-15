function comenzarJuego(event) {
  event.preventDefault();
  event.stopPropagation();
  
  document.getElementById("container-cantidad-de-numeros").classList.add("oculto");
  document.getElementById("container-cantidad-de-listas").classList.add("oculto");
  document.getElementById("container-cantidad-de-rondas").classList.add("oculto");
  event.target.classList.add("oculto");
  
  return false;   
}
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");
  document.getElementById("comenzar-juego").addEventListener("click", comenzarJuego);
});