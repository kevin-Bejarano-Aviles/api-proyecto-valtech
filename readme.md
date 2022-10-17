
# Proyecto Piloto Valtech Academy

Es un sistema de gestión de talento para equipos de 
diferentes disciplinas, 
el cual busca centralizar la información referidos 
inicialmente a los perfiles orientado - orientadores, 
desde un tercer perfil con caracteristicas de administrador.
Nuestra web esta dividida en 8 secciones principales donde podran 
navegar y encontrar informacion relacionada a los orientados y eventos que se 
ofrecen.

## Home

Siendo la portada de nuestra web, en esta sección encontraremos un banner en donde se desplegarán ciertos mensajes que definen a la organización.
Ademas de una breve introducción, y enlaces a diferentes programas de la misma, finalizando con información institucional sobre nuestra plataforma y la empresa detras de ella.

## Login 

A esta segunda sección se llega a traves de un botón del Home en donde se muestra un formulario para que ingrese el administrador a la plataforma, el administrador ya se encuentra creado desde un inicio por lo tanto no se necesitaría su registro. En la misma se solicitara el email y contraseña de la persona para tener acceso a esta.

## Novedades

Este apartado esta dedicado a mostrar algunas noticias relevantes para los diferentes sectores que hacen vida en la comunidad. Junto a ella se mostrara una lista de orientados.

## Alta orientado

Este formulario tendrá lugar para la carga de algún orientado por parte del administrador con una serie de campos donde podemos ingresar los datos de la persona.

## Vista de orientado

Es una sección en donde se podra visualizar los datos de un orientado en especifico.

## Perfil

Se podrá visualizar el perfil del administrador con todo sus detalles.

## Eventos

En la sección de eventos encontraremos un navegador que nos facilitara la busqueda de un evento que este relacionado a un orientado. Ademas de un paginador donde se visualizara una lista de todos los eventos, los cuales podran ser eliminados por el administrador.

## Agenda de evento

En este apartado se vera un nuevo formulario en el cual el administrador podrá agendar un evento, en el cuál asignara los diferentes perfiles que asitiran a ella.


# Instrucciones
## Instalación

El proyecto debera ser corrido con un ``npm install``, en las siguientes carpetas

```bash
  cd back 
  npm install 
```
```bash
  cd front 
  npm install 
```

Luego de hacer esto es importante armar la base de datos, se utilizo `sequelize-cli` para hacer las migraciones.
### Imagen de la tabla con sus relaciones
![Modelo ER](./back/data/Imagen%20modelo%20entidad%20relacion.png);

Para poder crear la base de datos primero tiene que crear el archivo `.env` dentro de la carpeta `/back` donde estaran las variables de entorno, tales variables tienen un ej en el archivo `.env.example`.

Del dentro de la carpeta `/front` también hay que crear el mismo archivo `.env` que tiene que tener como contenido el contenido del archivo `.env-example`.

Una vez echo esto es momento de crear la base de datos.
Dentro de la carpeta back escribir los siguientes comandos en la terminal

- Este primer comando es para la creacion de la base de datos:
```bash
  npx sequelize-cli db:create
```


- Este comando es para la creacion de las tablas con sus relaciones:
```bash
  npx sequelize-cli db:migrate
```


- Este comando es para la insercion de datos predefinidos en la base de datos tales como el admin, estudiantes y profesores.

NOTA: Antes de crear la seed de usted puede configurar tanto el email, el nombre completo como la contraseña del administrador. Esto se puede hacer configurando las variables de entorno de: "ADMIN_FULLNAME, ADMIN_EMAIL, ADMIN_PASS" dentro del archivo ".env" en la carpeta "back". En caso de no configurarlo se creara el administardor con datos predefinidos.
```bash
  npx sequelize-cli db:seed:all
```
Si ya ejecuto el comando pero quiere tener datos configurados del administrador puede ejecutar el comando "npx sequelize-cli db:seed:undo:all" para limpiar las seed de la base de datos, configurar los datos del administrador y volver a ejecutar el comando "npx sequelize-cli db:seed:all" para insertar todos los datos.


Finalmente para ejecutar la aplicación hay que correr dos comandos. Primero nos posicionamos dentro de la carpeta `/back` y ejecutamos el siguiente comando:

```
nodemon
```
Nota: tambien se puede ejecutar el comando "npm start"

Luego nos posicinamos en la carpeta `/front` y ejecutamos el siguiente comando:

```
npm start
```

Una vez hecho todo lo anterior ya se habran instalado todos los modulos correspondientes en cada carpeta por lo que al inicializar el proyecto para su prueba se debera ingresar con las siguientes creenciales, las cuales cumplen rol de `administrador`, quien tendra los permisos para navegar por la web y realizar las acciones mencionadas en el anterior documento:

### Datos administrador:
Los Siguentes datos del administrador son los predefinidos, si usted ya configuro los datos, utilize tanto el email como la contraseña configurada para acceder a la pagina.

```bash
   email: sofiaSerrano@gmail.com
   contraseña: 4R8u$t47
```

## URLS de importancia

En las siguientes direcciones se describirá que acciones serán necesarias para su navegación en la web:

#### http://localhost:3000

Será la homepage del sitio donde se visualizarán en un principio la información del sitio y a que se debe su existencia. A través del boton `Ingresá a tu portal` te llevará a la siguiente url.

#### http://localhost:3000/login

En esta vista se visualizará el formulario para el ingreso del administrador.

#### http://localhost:3000/inicio

Luego de inciar sesión exitosamente, se te redirigirá a esta vista donde se mostrará la información de algunos orientados, aunque si no se ha ingresado ninguno no se mostrara mas que la premisa de novedades del sitio junto con el header y la barra de navegación.

#### http://localhost:3000/orientados/alta-orientado

A través del boton `ingresar orientado`, se te redirigirá a esta vista donde se visualizará un formulario que debera ser completado para que se permita dar de alta a dicho perfil.

#### http://localhost:3000/orientados/:id

Una vez rellenado exitosamente el formulado mencionado anteriormente, se te mostrará esta vista donde `:id` sera un elemento que cambiará dependiedo de la cantidad de orientados que se encuentren en la base de datos, siendo este uno en particular con su `:id`, en la base de datos.


