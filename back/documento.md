# Documentacion 

## API Rutas para el lado de administrador.

## URL: 'http://localhost:8000/admin/addStudent'
- Metodo http que se usa: 'POST'
- Para que sirve: El cliente le envia informacion al servidor para que se cree un orientado, si el registro no presenta ningun error, el servidor le enviara un mesaje json al cliente con el contenido 'Registro creado correctamente'
- ESTADO: Metodo terminado
- Middlewares y validaciones implementados: incompleto

## URL: 'http://localhost:8000/admin/students'
- Metodo http que se usa: 'GET'
- Para que sirve: Al llamar al la url el servidor le envia todos los orientados al cliente
- ESTADO: Metodo terminado
- Middlewares y validaciones implementados: incompleto

## URL: 'http://localhost:8000/admin/adminLogin'
- Metodo http que se usa: 'POST'
- Para que sirve: El cliente le envia el 'email' y la 'pass' para iniciar sesion. El servidor verifica si el el email se encuentra en la base de datos, si se encuentra, verifica que la contraseña sea igual, en caso de error, se mandaja un mensaje Json 'Credenciales invalidas' si no se le enviara un objeto JSON con algunos datos del admin
- ESTADO: Metodo terminado
- Middlewares y validaciones implementados: COMPLETO

## URL: 'http://localhost:8000/admin/students/:id'
- Metodo http que se usa: 'GET'
- Para que sirve: Al llamar a la URL, el servidor le envia un orientado en especifico al cliente con sus datos.
- ESTADO : Metodo terminado
- Middlewares y validaciones implementados: middleware implementado - adminCheck - para usarlo debera estar logueado el amnistrador de otra manera no le enviara la respuesta.

## URL: http://localhost:8000/admin/logOut
- Metodo http que se usa: 'GET'.
- Para que sirve: Al llamar a la URL, el servidor elimina tanto la sesion del usuario como su cookie.
- ESTADO: Metodo terminado.
- Middlewares y validaciones implementados: middleware implementado - adminCheck - para usarlo debera estar logueado el amnistrador de otra manera no le enviara la respuesta.

## URL: 'http://localhost:8000/admin/advisers'
- Metodo http que se usa: 'GET'
- Para que sirve: Al llamar al la url el servidor le envia todos los orientadores al cliente
- ESTADO: Metodo terminado
- Middlewares: middleware - adminCheck - implementado, para usarlo el administrador debera estar logueado.

## URL: 'http://localhost:8000/admin/assignAdviser/:id'
- Metodo http que se usa: 'PUT'
- Para que sirve: Con este metodo el administrador podrá asignar un orientador(id pasado por req.body) a un estudiante, mediante su id pasado por la url
- ESTADO: Metodo en fase de prueba
- Middlewares: Aun no 

## URL: 'http://localhost:8000/admin/addEvent'
- Metodo http que se usa: 'POST'.
- Para que sirve: El administrador(cliente) le envia cierta cantidad de datos al servidor para crear un evento entro ellos estan:
    - Un array de objetos llamada 'students' que tienen la propiedad 'id' con su numero de id
    - El nombre del evento
    - La fecha del evento con este formato (YYYY-MMMM-DDDD)
    - La hora del evento con el formato (HH:MM)
    - El tiempo que dura el evento con como int
    - EL detalle del evento,
    - El id del orientador que dara el evento

- ESTADO: Metodo en fase de prueba
- Middlewares o validaciones: Aun no
## URL: 'http://localhost:8000/admin/events'
- Metodo http que se usa: 'GET'.
- Para que sirve: El cliente va a poder ver todos los eventos creados hasta el momento
- ESTADO: Metodo en fase de prueba
- Middlewares: Aun no

## URL: 'http://localhost:8000/admin/deleteEvent/:id'
- Metodo http que se usa: 'DELETE'.
- Para que sirve: El cliente va a poder eliminar el evento mediante su id.
- ESTADO: Metodo en fase de prueba
- Middlewares: Aun no
