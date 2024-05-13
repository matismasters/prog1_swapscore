/*

Historias de Usuario:

- Como invitado, quiero ver una lista de 10 números aleatorios desordenados, para poder planificar mi primer intercambio.

*/

function generarLista() {
  let lista = [];
  for (let i = 0; i < 10; i++) {
    lista.push(Math.floor(Math.random() * 100));
  }
  return lista;
}

function listaATexto(lista) {
  return lista.join(", ");
}

function juego() {
  let lista = generarLista();
  console.log(listaATexto(lista));
}

juego();