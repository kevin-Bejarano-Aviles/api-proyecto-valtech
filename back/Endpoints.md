# Documentacion 

## API Rutas para el lado de administrador.

### URL: 'http://localhost:8000/admin/auth/login'
- Metodo http: 'POST'
- Login admin

### URL: http://localhost:8000/admin/auth/logOut
- Metodo http: 'GET'.
- Logout admin
### URL: 'http://localhost:8000/admin/students'
- Metodo http: 'POST'
- Crear estudiate
### URL: 'http://localhost:8000/admin/students'
- Metodo http: 'GET'
- Ver todos los estudiantes

### URL: 'http://localhost:8000/admin/students/:id'
- Metodo http: 'GET'
- Mostrar un estudiante

### URL: 'http://localhost:8000/admin/advisers'
- Metodo http: 'GET'
- Mostrar a todos los orientadores

### URL: 'http://localhost:8000/admin/advisers/student/:id'
- Metodo http: 'PUT'
- Asignar un orientador a un estudiante

### URL: 'http://localhost:8000/admin/events'
- Metodo http: 'POST'.
- Crear un evento
### URL: 'http://localhost:8000/admin/events'
- Metodo http: 'GET'.
- Mostrar todos los eventos
### URL: 'http://localhost:8000/admin/events/:id'
- Metodo http: 'DELETE'.
- Eliminar un evento
