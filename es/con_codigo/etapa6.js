/*

En esta etapa comenzamos a calcular los puntos de puntuación para cada intercambio. Ten en cuenta los siguientes conceptos:
- Intercambio: La acción de intercambiar dos números de una PosiciónA a una posiciónB en la lista/s.
- NúmeroA: El primer número a intercambiar.
- PosiciónA: El índice del primer número a intercambiar.
- NúmeroB: El segundo número a intercambiar.
- PosiciónB: El índice del segundo número a intercambiar.
- Puntuación: Los puntos que un jugador obtiene después de un intercambio.

Historias de Usuario

- Como invitado, debería obtener un punto si el númeroA es el primer número en la lista, para obtener un punto por ordenar la lista correctamente.
- Como invitado, debería obtener un punto si el númeroB es el primer número en la lista, para obtener un punto por ordenar la lista correctamente.

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

  if (valorEnPosicionA < valorPosteriorAPosicionA) {
    puntaje++;
  }

  if (posicionB === 0 || valorAnteriorAPosicionB < valorEnPosicionB) {
    puntaje++;
  }

  if (valorEnPosicionB < valorPosteriorAPosicionB) {
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

function juego() {
  console.clear();
  let lista = generarLista();
  console.log(listaATexto(lista));

  let score = 0;

  while (validarListaOrdenada(lista) === false) {
    let posicionA = pedirNumeroValido("Ingrese la posicion A: ");
    let posicionB = pedirNumeroValido("Ingrese la posicion B: ");

    console.clear();
    lista = intercambiarNumeros(lista, posicionA, posicionB);
    score += calcularPuntaje(lista, posicionA, posicionB);
    console.log(listaATexto(lista));
    console.log("Score: " + score)
  }

  console.log("Ganaste!");
  console.log("Final Score: " + score)
}

juego();