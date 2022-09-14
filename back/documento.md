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
- Middlewares y validaciones implementados: incompleto

## URL: 'http://localhost:8000/admin/students/:id'
- Metodo http que se usa: 'GET'
- Para que sirve: Al llamar a la URL, el servidor le envia un orientado en especifico al cliente con sus datos.
- ESTADO : Metodo terminado
- Middlewares y validaciones implementados: middleware implementado - adminCheck - para usarlo debera estar logueado el amnistrador de otra manera no le enviara la respuesta.
