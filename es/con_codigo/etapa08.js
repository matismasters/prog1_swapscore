/*

Historias de Usuario:

- Como invitado, debería poder ingresar mi nombre, para poder convertirme en un jugador.
- Como jugador, debería poder ver mi nombre junto a mi puntuación, para saber qué tan bien lo estoy haciendo.

*/


const prompt = require("prompt-sync")();

function generarLista() {
  let lista = [];
  for (let i = 0; i < 10; i++) {
    lista.push(Math.floor(Math.random() * 100));
  }
  return lista;
}

function listaATexto(lista) {
  texto = "";
  for (let i = 0; i < lista.length; i++) {
    texto += i + "-(" + lista[i] + "), ";
  }
  return texto;
}

function intercambiarNumeros(lista, posicionA, posicionB) {
  let valorDeLaListaEnLaPosicionA = lista[posicionA];

  lista[posicionA] = lista[posicionB];
  lista[posicionB] = valorDeLaListaEnLaPosicionA;

  return lista;
}

function pedirNumeroValido(mensaje) {
  let numero = parseInt(prompt(mensaje));

  while (isNaN(numero)) {
    console.log("Numero invalido");
    numero = parseInt(prompt(mensaje));
  }

  return numero;
}

function calcularPuntaje(lista, posicionA, posicionB) {
  let valorAnteriorAPosicionA = lista[posicionA - 1];
  let valorEnPosicionA = lista[posicionA];
  let valorPosteriorAPosicionA = lista[posicionA + 1];

  let valorAnteriorAPosicionB = lista[posicionB - 1];
  let valorEnPosicionB = lista[posicionB];
  let valorPosteriorAPosicionB = lista[posicionB + 1];

  let puntaje = 0;
  if (posicionA === 0 || valorAnteriorAPosicionA < valorEnPosicionA) {
    puntaje++;
  }

  if (posicionA === (lista.length - 1) || valorEnPosicionA < valorPosteriorAPosicionA) {
    puntaje++;
  }

  if (posicionB === 0 || valorAnteriorAPosicionB < valorEnPosicionB) {
    puntaje++;
  }

  if (posicionB === (lista.length - 1) || valorEnPosicionB < valorPosteriorAPosicionB) {
    puntaje++;
  }

  return puntaje;
}

function validarListaOrdenada(lista) {
  for (let i = 0; i < lista.length - 1; i++) {
    if (lista[i] > lista[i + 1]) {
      return false;
    }
  }
  return true;
}

function mostrarPuntaje(nombreJugador, puntaje) {
  console.log(nombreJugador + ": " + puntaje);
}

function juego() {
  console.clear();

  let nombreJugador = prompt("Ingrese su nombre: ");
  console.clear();

  let lista = generarLista();
  console.log(listaATexto(lista));

  let puntaje = 0;

  while (validarListaOrdenada(lista) === false) {
    let posicionA = pedirNumeroValido(`${nombreJugador}: Ingresa la posicion A: `);
    let posicionB = pedirNumeroValido(`${nombreJugador}: Ingresa la posicion B: `);

    console.clear();
    lista = intercambiarNumeros(lista, posicionA, posicionB);
    puntaje += calcularPuntaje(lista, posicionA, posicionB);
    console.log(listaATexto(lista));
    mostrarPuntaje(nombreJugador, puntaje);
  }

  console.log("Ganaste!");
  mostrarPuntaje(nombreJugador, puntaje);
}

juego();