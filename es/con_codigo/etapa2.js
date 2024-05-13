/*

Historias de Usuario:

- Como invitado, quiero ver un índice para cada número en la lista, para poder elegir qué números intercambiar.
- Como invitado, quiero intercambiar dos números en la lista por su índice, para poder comenzar a ordenarla.
- Como invitado, quiero ver la lista de números después del intercambio, para ver si mi ordenación funcionó.
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
    texto += i + ": " + lista[i] + ", ";
  }
  return texto;
}

function intercambiarNumeros(lista, posicionA, posicionB) {
  let valorDeLaListaEnLaPosicionA = lista[posicionA];

  lista[posicionA] = lista[posicionB];
  lista[posicionB] = valorDeLaListaEnLaPosicionA;

  return lista;
}

function juego() {
  let lista = generarLista();
  console.log(listaATexto(lista));

  let posicionA = parseInt(prompt("Ingrese la posicion A: "));
  let posicionB = parseInt(prompt("Ingrese la posicion B: "));

  lista = intercambiarNumeros(lista, posicionA, posicionB);
  console.log(listaATexto(lista));
}

juego();