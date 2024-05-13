/*

Historias de Usuario:

- Como invitado, no debería poder intercambiar números si el índice está fuera de los límites, para no romper el juego.
- Como invitado, debería poder hacer intercambios hasta que la lista esté ordenada, para poder terminar el juego.
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

  while (validarListaOrdenada(lista) === false) {
    let posicionA = pedirNumeroValido("Ingrese la posicion A: ");
    let posicionB = pedirNumeroValido("Ingrese la posicion B: ");

    console.clear();
    lista = intercambiarNumeros(lista, posicionA, posicionB);
    console.log(listaATexto(lista));
  }

  console.log("Ganaste!");
}

juego();