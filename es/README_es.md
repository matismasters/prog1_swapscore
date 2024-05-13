
# Swapscore

## Introducción

Este es un proyecto para probar las habilidades de los iniciados en programación. El proyecto es un juego simple donde el jugador tiene que intercambiar los números en el orden correcto para obtener puntos y ganar. El código de ejemplo está escrito en JavaScript básico, sin el uso de ninguna biblioteca, framework, o métodos de clase como filter, map, reduce, etc. En cambio, favorecemos el uso de bucles y funciones básicas para resolver los problemas. El uso de OOP no es requerido, pero se anima a usar funciones para que el código sea más legible y mantenible.

**Nota:** Con mínimas o ninguna edición en las historias de usuario presentadas para cada etapa, se puede esperar que este proyecto se desarrolle en HTML/CSS/JavaScript, y se juegue en un navegador móvil con botones y listas.

## Lo que necesitas saber antes de empezar

- Condicionales: if, else, else if
- Bucles: for, while
- Funciones: declaración, llamada, retorno
- Arrays: declaración, acceso, longitud
- Objetos: declaración, acceso, propiedades

## Entorno

- Puedes usar cualquier editor de código que te guste. Recomendamos usar Visual Studio Code.
- Debes instalar nodejs para ejecutar el código. Puedes descargarlo desde [aquí](https://nodejs.org/es/download/).
- Asegúrate de crear una nueva carpeta para tu proyecto y ejecutar `npm init -y` para crear un nuevo archivo package.json que es necesario.
- Para que el usuario pueda ingresar datos puedes usar el paquete `prompt-sync`. Puedes instalarlo ejecutando `npm install prompt-sync`. En Visual Studio Code en la pestaña `Terminal`. Puedes encontrar más información sobre el paquete [aquí](https://www.npmjs.com/package/prompt-sync).
- Si estás usando Visual Studio Code, puedes usar la terminal integrada para ejecutar tu código usando `F5`, o `Run > Start Debugging`. Para hacer eso, necesitas crear un archivo de configuración. Ve a `Run > Add Configuration...` y selecciona `Node.js`. El archivo `launch.json` debería verse como el siguiente (presta especial atención a las propiedades `program` y `console`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${file}",
      "console": "integratedTerminal"
    }
  ]
}
```

Después de que todo esté configurado, intenta crear un nuevo archivo llamado `test.js` y ejecuta el siguiente código para ver si todo está funcionando correctamente:

```javascript
const prompt = require('prompt-sync')();
let name = prompt('¿Cuál es tu nombre? ');
console.log(`¡Hola, ${name}!`);

// Resultado esperado: ¡Hola, <nombre>!
// Presta atención a la terminal integrada en Visual Studio Code
// Es posible que necesites seleccionarla con el ratón antes de poder `ingresar` cualquier cosa
```

Si quieres usar cualquier otro editor de código, puedes ejecutar tu código usando la terminal. Simplemente navega a la carpeta donde se encuentra tu código y ejecuta `node nombre_del_archivo.js`.

## El juego

**Swap Score** es un juego sencillo centrado en la tarea de ordenar números. Puede jugarse individualmente o con múltiples jugadores.

### **Resumen del juego:**
- El juego se divide en rondas, y cada jugador toma un turno por ronda.
- Al comienzo de cada turno, se presentan múltiples listas de números desordenados a los jugadores.
- Durante su turno, los jugadores pueden intercambiar dos números de cualquier posición a otra posición en la misma lista o en otras.

### **Puntuación:**
- Si el número intercambiado por el usuario, después de ser intercambiado, `es mayor` al número `anterior` en su lista, el jugador obtiene un punto. Lo mismo aplica para ambos números involucrados en el intercambio.
- Si el número intercambiado por el usuario, después de ser intercambiado, `es menor` al número `siguiente` en su lista, el jugador obtiene un punto. Lo mismo aplica para ambos números involucrados en el intercambio.
- Si el número intercambiado por el usuario, después de ser intercambiado, `esta al final o al principio` de una lista el jugador obtiene un punto extra. Lo mismo aplica para ambos números involucrados en el intercambio.
- Se otorga un bono significativo de 10 puntos si un intercambio resulta en que una lista completa esté ordenada. Esta lista se elimina del juego y se reemplaza por una nueva.

### **Finalización del juego:**
- El juego concluye después de un número predeterminado de rondas.
- El ganador es el jugador que acumula más puntos.

Este juego ofrece desafíos únicos, ya sea jugado solo o con otros. En el modo de un solo jugador, pone a prueba tu capacidad para planificar estratégicamente y predecir el orden evolutivo de los números. En el modo multijugador, agrega una capa adicional de complejidad, ya que los jugadores deben anticipar no solo las secuencias numéricas, sino también los posibles movimientos de sus oponentes, haciendo que cada intercambio sea una decisión crítica para maximizar el potencial de puntuación.

## Desarrollo

Usando el desarrollo iterativo, crearemos el juego en etapas. Cada etapa tendrá un conjunto de historias de usuario que guiarán el proceso de desarrollo. Al final de cada etapa, el juego debería ser jugable, y el código debería ser refactorizado para ser más legible y mantenible.

Hemos separado cada una de las etapas en diferentes archivos para facilitar el seguimiento del proceso de desarrollo. Puedes copiar el código de la etapa anterior al siguiente archivo y comenzar a implementar las nuevas historias de usuario. Esto te ayudará a mantener un registro de tu progreso y a facilitar la depuración de tu código. 

Sientete libre de modificar los archivos en la carpeta `es/sin_codigo/<etapa>.js`. 

En la carpeta `es/con_codigo/` encontraras la solución de ejemplo para cada etapa.

Tus archivos js deberían verse así:

```javascript
// etapa1.js
/*

Historias de usuario:

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
```

## Archivos de etapas sin codigo de solucion

- [Etapa 01](es/sin_codigo/etapa01.js)
- [Etapa 02](es/sin_codigo/etapa02.js)
- [Etapa 03](es/sin_codigo/etapa03.js)
- [Etapa 04](es/sin_codigo/etapa04.js)
- [Etapa 05](es/sin_codigo/etapa05.js)
- [Etapa 06](es/sin_codigo/etapa06.js)
- [Etapa 07](es/sin_codigo/etapa07.js)
- [Etapa 08](es/sin_codigo/etapa08.js)
- [Etapa 09](es/sin_codigo/etapa09.js)
- [Etapa 10](es/sin_codigo/etapa10.js)
- [Etapa 11](es/sin_codigo/etapa11.js)
- [Etapa 12](es/sin_codigo/etapa12.js)
- [Etapa 13](es/sin_codigo/etapa13.js)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT