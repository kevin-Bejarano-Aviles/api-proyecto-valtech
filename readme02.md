# Proyecto Piloto Valtech Academy

## Instrucciones
Este repositorio no tiene ninguna rama mas que la principal con su descarga bastara para obtener las carpetas necesarias.

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


- Este comando es para la insercion de datos predefinidos en la base de datos tales como el admin, estudiantes y profesores:
```bash
  npx sequelize-cli db:seed:all
```

Finalmente para ejecutar la aplicación hay que correr dos comandos. Primero nos posicionamos dentro de la carpeta `/back` y ejecutamos el siguiente comando:

```
nodemon
```
Luego nos posicinamos en la carpeta `/front` y ejecutamos el siguiente comando:

```
npm start
```

### Imagen de la tabla con sus relaciones
![Modelo ER](./Imagen%20modelo%20entidad%20relacion.png)

Una vez hecho todo lo anterior ya se habran instalado todos los modulos correspondientes en cada carpeta por lo que al inicializar el proyecto para su prueba se debera ingresar con las siguientes creenciales, las cuales cumplen rol de `administrador`, quien tendra los permisos para navegar por la web y realizar las acciones mencionadas en el anterior documento:

```bash
   email: sofiaSerrano@gmail.com
   contraseña: 4R8u$t47
```

Luego de inicializar sesión se notará que en la base de datos se habrán cargado información tanto en la tabla de `admins` como en la de `advisers`.


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
