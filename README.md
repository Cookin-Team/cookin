# COOKIN  🍲

### Descripción
---
Juego de creación de pizzas. Se compone de una cuenta atrás, un marcador, unos clientes y unas pistas con las que ir haciendo las pizzas.

El motivo de su creación, en diciembre de 2019, ha sido el trabajo final del 1º módulo del Bootcamp Ironhack y a su vez como reto personal.

### Guía de usuario
---
Es un juego de 8 niveles donde en cada nivel encontramos un personaje o cliente, con una pizza, unas pistas para la creación de la misma y un mensaje de victoria y de derrota.

El usuario tendrá que ir eligiendo los ingredientes para lograr acertar que pizza quiere cada cliente. Para ello debe ir siguiendo las pistas que le irán dando.

Todo ello lo tendrá que conseguir en un tiempo limitado y con ayuda de un marcador en el que podrá ir viendo los aciertos y errores que va teniendo.
 	
### Guía de instalación
---
Juego realizado con HTML, CSS, CANVAS y JAVASCRIPT.

La **estructura de archivos** es la siguiente:
- HTML (index.html)
    - **HOME SCREEN:** Pantalla inicial.
    - **MESSAGE INSTRUCTIONS:** Lightbox con las instrucciones.
    - **GAME SCREEN:** Pantalla principal del juego. En esta sección está creada la etiqueta canvas.
    - **MESSAGE SUCCESS / MESSAGE END SUCCESS / MESSAGE GAME OVER:** Lightbox de victoria, victoria final y derrota.
    - **MESSAGE MOBILE:** Mensaje informativo responsive.
- CSS
  - **reset.css:** Archivo reset del css.
  - **style.css:** Actualmente tiene responsive hasta 800px de ancho y 500px de alto.
- JS 
  - **data-clients.js:** Array de objetos **clients**, que contiene toda la **información de cada cliente**: nombre del personaje, nombre de la pizza y sus ingredientes, el tiempo que tiene el usuario para resolverlo, las pistas para adivinar la pizza, los mensajes de victoria y derrota específicos y las urls de las imágenes y de la música propias de cada cliente.
  - **game.js:** Encontramos la class **game**, donde se encuentran las propiedades y los métodos que realizan la comprobación del marcador de aciertos y errores, el tiempo, y el checkeo de victoria o derrota.
  - **canvas.js:**: class **canvasPizza** que recibe un array de ingredientes y los va pintando en el canvas. Para ello se usan varios métodos, para calcular la proporción, randoms para el tamaño y posición de las imágenes y un método para ordenar los ingredientes por orden de profundidad para poder pintarlos en ese orden específico.
  - **script.js:** Encontramos definidas todas las variables, el onclick del **botón inicial**, la configuración de los **tabs de instrucciones** y la función **startGame** que incluye la iteración con slider, la recogida de datos de data-clients, la creación de las class y las iteraciones con las mismas para el funcionamiento del juego.
  - **slider.js:** Carga del slider y configuración del mismo.
  - **swipper.min.js:** Carga de la librería de swipper. La versión utilizada es la v5.2.1

#### Dependencias

La documentación de la librería del swiper slider se puede consultar [aquí.](https://swiperjs.com/api/)

### Cómo contribuir
---
Toda aportación o comentario será recibido de buen gusto, ya que con ellos se podrá ayudar a crecer tanto al juego cómo a mi para mejorar como desarrollador.

Cualquier mejora será incluida tras una previa revisión a través de un **“pull requests”**. Se requiere un código ordenado y comentado.

Existen muchas **líneas de mejora**, algunas de ellas son:
- **Slider random:** Los ingredientes del slider tengan diferente posición en cada nivel.
- **Niveles desbloqueables:** Hacer que se pueda ir a un nivel directamente, desbloqueándoles. Sin necesidad de empezar siempre desde el principio.
- **Eliminar pistas:** Eliminar las pistas de ingredientes que ya estén ok.
- **Pista especial:** Botón para pedir o solicitar una pista. Esa pista sería especial por el nivel de la ayuda que te proporcionará. Sólo se podrá solicitar un vez por partida.
- **Bug Slider:** Pequeño bug que le hace tener un efecto raro al interpretar algunos click el slider.
- **Responsive:** Faltaría finalizarlo, haciendo el mobile.

### Código de conducta 
---
En el siguiente enlace se muestra el [Código de Conducta](https://github.com/RVaquero87/pizza_hack/blob/master/CODE_OF_CONDUCT.md).

### Autor
---
Rubén Vaquero de la Torre

### Licencia 
---
Aquí se puede consultar la [Licencia](https://github.com/RVaquero87/pizza_hack/blob/master/LICENSE.md) para este repositorio.
