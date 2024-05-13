/*

Historias de Usuario:

- As a Player, If I sort the list with my swap, I want to see a new list, so that me and other players can continue playing until the number of rounds is reach.
- As a Player, If my last swap sorted a list, I should get 10 points, so that I can get a bonus for sorting a list.

*/


const prompt = require("prompt-sync")();

function generarLista(cantidadDeNumeros) {
  let lista = [];
  for (let i = 0; i < cantidadDeNumeros; i++) {
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

function mostrarPuntajes(jugadores) {
  jugadores.sort((a, b) => b.puntaje - a.puntaje);

  for (let jugador of jugadores) {
    console.log(jugador.nombre + ": " + jugador.puntaje);
  }
}

function sumarPuntajeAJugador(jugadores, nombreJugador, puntaje) {
  for (let jugador of jugadores) {
    if (jugador.nombre === nombreJugador) {
      jugador.puntaje += puntaje;
    }
  }

  return jugadores;
}

function juego() {
  console.clear();

  let jugadores = [];
  do {
    let nombreJugador = prompt("Ingrese el nombre de un jugador o 'salir' si ya ingreso todos: ");

    if (nombreJugador === "salir") {
      break;
    }

    jugadores.push({ nombre: nombreJugador, puntaje: 0 });
  } while (true);

  let cantidadDeNumeros = pedirNumeroValido("Ingrese la cantidad de numeros: ");
  let cantidadDeRondas = pedirNumeroValido("Ingrese la cantidad de rounds a jugar: ");
  console.clear();

  let lista = generarLista(cantidadDeNumeros);
  console.log(listaATexto(lista));

  let puntaje, jugador;
  let indiceJugador = 0;
  while (cantidadDeRondas > 0) {
    indiceJugador = indiceJugador % jugadores.length;
    jugador = jugadores[indiceJugador];

    let posicionA = pedirNumeroValido(`${jugador.nombre}: Ingresa la posicion A: `);
    let posicionB = pedirNumeroValido(`${jugador.nombre}: Ingresa la posicion B: `);

    console.clear();
    lista = intercambiarNumeros(lista, posicionA, posicionB);
    puntaje = calcularPuntaje(lista, posicionA, posicionB);
    if (validarListaOrdenada(lista)) {
      console.log("Lista ordenada!");
      lista = generarLista(cantidadDeNumeros);
      puntaje += 10;
    }
    jugadores = sumarPuntajeAJugador(jugadores, jugador.nombre, puntaje);

    console.log(listaATexto(lista));
    console.log("=====================");
    mostrarPuntajes(jugadores);
    console.log(`Rondas restantes: ${cantidadDeRondas}`);
    console.log("=====================");

    if (indiceJugador === (jugadores.length - 1)) {
      cantidadDeRondas--;
    }
    indiceJugador++;
  }

  console.log("Juego terminado!");
  mostrarPuntajes(jugadores);
}

juego();