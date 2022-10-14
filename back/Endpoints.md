# Documentacion 

## API Rutas para el lado de administrador.

### URL: 'http://localhost:8000/admin/auth/login'
- Metodo http: 'POST'
- Login admin
- Ejemplo body:
```json
{
    "email":"sofiaSerrano@gmail.com",
    "pass": "4R8u$t47"
}
```
### URL: http://localhost:8000/admin/auth/logOut
- Metodo http: 'GET'.
- Logout admin

### URL: 'http://localhost:8000/admin/students'
- Metodo http: 'POST'
- Crear estudiate
- Ejemplo body:
```json
{
    "fullName":"fullName",
    "email":"email@gmail.com",
    "phoneNumber":"1111111111",
    "program":"String caracteres",
    "dni": "2222222",
    "school":"Escuela del estudiante",
    "age": "18",
    "address": "Calle falsa 123",
    "motive": "Para mejorar como persona",
    "user": "igual que el dni",
    "pass": "123456789",
    "confirmPass": "igual que el campo 'pass' ",
    "avatar": "image.jpg"
}
```
- Si se va a probar en backend lo mejor será cargar el formulario como form-data para poder cargar la imagen requerida
- Si al enviar el formulario hay un tipo de error, este devolvera el siguente bloque de ej:
```json
{
    "status": "400 Bad request",
    "message": "",
    "data": {
        "errors": {
            "fullName": {
                "msg": "Ingrese su nombre y apellido",
                "param": "fullName",
                "location": "body"
            },
            "email": {
                "msg": "Debe ingresar un email en el campo",
                "param": "email",
                "location": "body"
            }
        }
    }
}
```
### URL: 'http://localhost:8000/admin/students'
- Metodo http: 'GET'
- Ver todos los estudiantes

### URL: 'http://localhost:8000/admin/students/:id'
- Metodo http: 'GET'
- Mostrar un estudiante
- El params ':id' es el id del estudiante

### URL: 'http://localhost:8000/admin/advisers'
- Metodo http: 'GET'
- Mostrar a todos los orientadores

### URL: 'http://localhost:8000/admin/advisers/student/:id'
- Metodo http: 'PUT'
- Asignar un orientador a un estudiante
- El params ':id' es el id del estudiante
- Ejemplo del body:
```json
{
    "idAdviser":"3"
}
```
### URL: 'http://localhost:8000/admin/events'
- Metodo http: 'POST'.
- Crear un evento
- Ejemplo del body:

```json
{
    "studentsId":["1","2","3"],
    "name":"Nombre del evento",
    "date": "2022-09-26",
    "time":"13:30",
    "detail":"Detalle del evento",
    "duration":"02:00",
    "adviser_event_id":"4"
}
```
- "studentsId" es un array de id de los estudiantes

### URL: 'http://localhost:8000/admin/events'
- Metodo http: 'GET'.
- Mostrar todos los eventos
### URL: 'http://localhost:8000/admin/events/:id'
- Metodo http: 'DELETE'.
- Eliminar un evento
- El params ":id" es el id del evento a eliminar
