# cookin  🍲

### Descripción
---
Web de recetas en la que puedes consultar de forma actualizada las nuevas publicaciones a través de la pagina de blog. Además el usuario puede crear su lista de recetas personalizada una vez que ha completado el registro, así como crear una lista de la compra con los igredientes necesarios. Existen dos perfiles de usuario, administrador y suscriptor. El administrador además de lo anteior podrá gestiniar los usuarios existentes en la plataforma, crear y editar las propias recetas. 

### Guía de usuario
---
Cualquier usuario puede convertirse en suscriptor realizando un registro de manera sencilla. Una vez finalizado podrá disfrutar de las opcines de la plataforma personalizadas para cada usuario. 

Para convertirte en administrador deberás solicitar permisos a los creadores de la web. Así podrás crear nuevas recetas, editar información y administrar los propios usuarios.
 	
### Guía de instalación
---
Web realizada con NODE.JS, EXPRESS, NPM PACKAGES, MONGODB, HTML, SASS y JAVASCRIPT.

**Al estar hecho con Node.js** la estructura de archivos es la siguiente:
- **VIEWS:** Utilizando el paquete npm de handlebars para crear las distintas vistas, compuestas de un layout general y diferentes partials que permiten la creacción de los distintos HTML.
- **SEED:** El contenido original de la aplicación proviene de la API [Spoonacular](https://spoonacular.com/), aquí generamos la base de datos inicial del proyecto y los usuarios iniciales.
- **ROUTES:** Gestiona las distintas llamadas para las peticiones a la base de datos (CRUD), y la visualización de las páginas.
- **PUBLIC:** Aquí se encuentran disponibles los recursos estáticos de la aplicación: imágenes, styles y javascript.
- **PASSPORT:** La gestión del logi y la autentificación del usuario se realiza a través del package NPM Passport, aquí puedes encontrar tanto la configuración del paquete como la estrategia local.
- **MODELS:** Utilizamos tres schemas de Moongose: User, Recipe e Ingredients. Los tres están relaccionados para diferentes funcionalidades a través de sus ids de referencia.
- **LIB:** Utilizamos dos middlewares. "isLoggedIn" para la gestión de los usuarios y "hashing" para encriptar la contraseña.
- **CONFIG:** Contiene la configuración del CDN de [Cloudinary](https://cloudinary.com/).

#### Dependencias
- **STRENGTH:**  Utilizado para comprobar la seguridad de tu contraseña. [Strength](https://www.jquerycards.com/forms/inputs/strength-js/).
- **AOS:**  Libreria para animaciones CSS con scroll. [AOS CSS](https://michalsnik.github.io/aos/).

### Cómo contribuir
---
Toda aportación o comentario será recibido de buen gusto, ya que con ellos se podrá ayudar a crecer tanto la aplicación como a nosotros cómo desarrolladores.

Cualquier mejora será incluida tras una previa revisión a través de un **“pull requests”**. Se requiere un código ordenado y comentado.

Existen muchas **líneas de mejora**, algunas de ellas son:
- **Cambiar Password:** Posibilidad de cambiar la contraseña tras realizar el registro.
- **Tamaño imagenes cloudinare:** Al subir las imágenes al cloudinary, subirlas en las dimensiones requeridas.
- **Receta creada por AUTHOR:** Relacionar la receta con su creador.
- **Lighbox de notificación:** Notificaciones de ayuda de usuario cuando realiza distintas acciones.

### Código de conducta 
---
En el siguiente enlace se muestra el [Código de Conducta](https://github.com/Cookin-Team/cookin/blob/master/CODE_OF_CONDUCT.md).

### Autores
---
Pilar García Campo y Rubén Vaquero de la Torre

### Licencia 
---
Aquí se puede consultar la [Licencia](https://github.com/Cookin-Team/cookin/blob/master/LICENSE.md) para este repositorio.
