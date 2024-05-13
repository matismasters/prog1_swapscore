/*

Historias de Usuario:

- Como invitado, debería poder establecer el número de listas con las que quiero jugar, para poder jugar con más de una lista.
- Como jugador, debería poder identificar las listas con letras, para que sea fácil para mí señalar los números a intercambiar.
- Como jugador, debería poder intercambiar números entre listas, para poder ordenar más de una lista a la vez.

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

function intercambiarNumeros(listas, indiceListaA, posicionA, indiceListaB, posicionB) {
  let valorEnPosicionA = listas[indiceListaA][posicionA];
  let valorEnPosicionB = listas[indiceListaB][posicionB];

  listas[indiceListaA][posicionA] = valorEnPosicionB;
  listas[indiceListaB][posicionB] = valorEnPosicionA;

  return listas;
}

function pedirNumeroValido(mensaje) {
  let numero = parseInt(prompt(mensaje));

  while (isNaN(numero)) {
    console.log("Numero invalido");
    numero = parseInt(prompt(mensaje));
  }

  return numero;
}

function calcularPuntaje(listas, indiceListaA, posicionA, indiceListaB, posicionB) {
  let listaA = listas[indiceListaA];
  let valorAnteriorAPosicionA = listaA[posicionA - 1];
  let valorEnPosicionA = listaA[posicionA];
  let valorPosteriorAPosicionA = listaA[posicionA + 1];

  let listaB = listas[indiceListaB];
  let valorAnteriorAPosicionB = listaB[posicionB - 1];
  let valorEnPosicionB = listaB[posicionB];
  let valorPosteriorAPosicionB = listaB[posicionB + 1];

  let puntaje = 0;
  if (posicionA === 0 || valorAnteriorAPosicionA < valorEnPosicionA) {
    puntaje++;
  }

  if (posicionA === (listaA.length - 1) || valorEnPosicionA < valorPosteriorAPosicionA) {
    puntaje++;
  }

  if (posicionB === 0 || valorAnteriorAPosicionB < valorEnPosicionB) {
    puntaje++;
  }

  if (posicionB === (listaB.length - 1) || valorEnPosicionB < valorPosteriorAPosicionB) {
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

function indiceALetra(indice) {
  return String.fromCharCode(65 + indice);
}

function letraAIndice(letra) {
  return letra.toUpperCase().charCodeAt(0) - 65;
}

function pedirIndiceEnLista(mensaje) {
  let indice = prompt(mensaje);
  let letra = indice[0];
  let numero = parseInt(indice.slice(1));

  while (isNaN(numero) || numero < 0) {
    console.log("Indice invalido");
    indice = prompt(mensaje);
    letra = indice[0];
    numero = parseInt(indice.slice(1));
  }

  return {
    indiceLista: letraAIndice(letra),
    indiceNumero: numero
  };
}

function mostrarListas(listas) {
  for (let i = 0; i < listas.length; i++) {
    console.log(`Lista ${indiceALetra(i)}: ${listaATexto(listas[i])}`);
  }
}

function indicesDeListasOrdenadas(listas) {
  let indices = [];
  for (let i = 0; i < listas.length; i++) {
    if (validarListaOrdenada(listas[i])) {
      indices.push(i);
    }
  }
  return indices;
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
  let cantidadDeListas = pedirNumeroValido("Ingrese la cantidad de listas a jugar: ");
  console.clear();

  let listas = []
  for (let i = 0; i < cantidadDeListas; i++) {
    listas.push(generarLista(cantidadDeNumeros));
  }
  mostrarListas(listas);

  let puntaje, jugador;
  let indiceJugador = 0;
  while (cantidadDeRondas > 0) {
    indiceJugador = indiceJugador % jugadores.length;
    jugador = jugadores[indiceJugador];

    let mensajeIngreso = `Ingresa la letra de la columna y el indice del numero a intercambiar (Ejemplo: A1): `;

    let indiceListaYPosicionA = pedirIndiceEnLista(`${jugador.nombre}: ${mensajeIngreso} `);
    let indiceListaYPosicionB = pedirIndiceEnLista(`${jugador.nombre}: ${mensajeIngreso} `);

    console.clear();
    listas = intercambiarNumeros(
      listas,
      indiceListaYPosicionA.indiceLista,
      indiceListaYPosicionA.indiceNumero,
      indiceListaYPosicionB.indiceLista,
      indiceListaYPosicionB.indiceNumero
    );
    puntaje = calcularPuntaje(
      listas,
      indiceListaYPosicionA.indiceLista,
      indiceListaYPosicionA.indiceNumero,
      indiceListaYPosicionB.indiceLista,
      indiceListaYPosicionB.indiceNumero
    );

    let listasOrdenadas = indicesDeListasOrdenadas(listas);
    if (listasOrdenadas.length > 0) {
      console.log(`${listasOrdenadas.length} listas ordenadas!`);
      for (let indiceListaOrdenada of listasOrdenadas) {
        listas[indiceListaOrdenada] = generarLista(cantidadDeNumeros);
        puntaje += 10;
      }
    }
    jugadores = sumarPuntajeAJugador(jugadores, jugador.nombre, puntaje);
    mostrarListas(listas);
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