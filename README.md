# Skate Park Prueba M8

## Descripción

La Municipalidad de Santiago ha organizado una competencia de Skate para impulsar el nivel deportivo de los jóvenes que desean representar a Chile en los X Games del próximo año. Esta plataforma web permite a los participantes registrarse y revisar el estado de su solicitud. El proyecto involucra habilidades de desarrollo Full Stack, consolidando competencias en frontend y backend.

## Tecnologías y Herramientas Utilizadas

- Express
- Handlebars
- PostgreSQL
- JWT
- Express-fileupload

## Requerimientos

1. Crear una API REST con el Framework Express.
2. Servir contenido dinámico con express-handlebars.
3. Ofrecer la funcionalidad Upload File con express-fileupload.
4. Implementar seguridad y restricción de recursos o contenido con JWT.

## Base de Datos

### Creación de la Base de Datos y Tabla de Participantes

```sql
CREATE DATABASE skatepark;

CREATE TABLE skaters (
  id VARCHAR PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  nombre VARCHAR(25) NOT NULL,
  password VARCHAR(255) NOT NULL,
  anos_experiencia INT NOT NULL,
  especialidad VARCHAR(50) NOT NULL,
  foto VARCHAR(255) NOT NULL,
  estado BOOLEAN NOT NULL
);


```
## DATABASE_URL=db_18_skaters_prueba_m8-g73_lm.sql
## JWT_SECRET_KEY=mi_clave_skatepark_lm_g73

## EL TOKEN SE CREA SOLO AL INICIAR SESION 
(no al regristrar).

## Inicia el servidor
- npm start
- npm run dev

## "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-fileupload": "^1.5.0",
    "express-handlebars": "^7.1.3",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "nanoid": "^5.0.7",
    "node-fetch": "^3.3.2",
    "pg": "^8.12.0",
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
```
El servidor se ejecutará en http://localhost:3000.

## MUY IMPORTANTE, PRESENTA LAG EN CARGAR EL DOM ASI QUE SI APARECEN ERRORES,
## EN LA CONSOLA DEL NAVEGADOR SOLO HAY QUE ACTUALIZAR HASTA QUE DESAPAREZCAN.

Rutas Principales
Rutas Públicas
POST /login: Inicia sesión y recibe un accessToken en una cookie. Redirige a /participantes.
POST /registro: Registra un nuevo skater.
Rutas Protegidas
Estas rutas requieren un accessToken válido en la cookie para acceder.

GET /participantes: Muestra una lista de todos los skaters registrados. R
GET /participantes/:id: Muestra los detalles de un skater específico. 
PUT /participantes/:id: Actualiza la información de un skater específico. 
DELETE /participantes/:id: Elimina un skater específico. Requiere autenticación.


## Estructura del Proyecto
18-skate-park-prueba-m8/
┣ config/
┃ ┣ db.js
┃ ┗ queries.sql
┣ controllers/
┃ ┣ renderController.js
┃ ┗ skaterController.js
┣ models/
┃ ┗ skaterModel.js
┣ node_modules/
┣ public/
┃ ┗ assets/
┃   ┣ css/
┃ ┃ ┃ ┗ style.css
┃   ┣ img/
┃ ┃ ┃ ┣ Alan Harper.jpg
┃ ┃ ┃ ┣ alan.jpg
┃ ┃ ┃ ┣ andrew.jpg
┃ ┃ ┃ ┣ bam.jpg
┃ ┃ ┃ ┣ bob.jpg
┃ ┃ ┃ ┣ chris.jpg
┃ ┃ ┃ ┣ daewon.jpg
┃ ┃ ┃ ┣ danny.jpg
┃ ┃ ┃ ┣ evelien.jpg
┃ ┃ ┃ ┣ favicon.jpg
┃ ┃ ┃ ┣ haslam.jpg
┃ ┃ ┃ ┣ luis.jpg
┃ ┃ ┃ ┣ mark.jpg
┃ ┃ ┃ ┣ nyjah.jpg
┃ ┃ ┃ ┣ rob.jpg
┃ ┃ ┃ ┣ rodney.jpg
┃ ┃ ┃ ┣ stacy.jpg
┃ ┃ ┃ ┗ tony.jpg
┃   ┗ js/
┃ ┃   ┗ app.js
┣ routes/
┃ ┣ renderRoutes.js
┃ ┗ skaterRoutes.js
┣ utils/
┃ ┣ config.js
┃ ┣ jwt.js
┃ ┗ middleware.js
┣ views/
┃ ┣ layouts/
┃ ┃ ┗ main.hbs
┃ ┣ partials/
┃ ┃ ┣ footer.hbs
┃ ┃ ┗ header.hbs
┃ ┣ 404.hbs
┃ ┣ 500.hbs
┃ ┣ admin.hbs
┃ ┣ index.hbs
┃ ┣ login.hbs
┃ ┣ participantes.hbs
┃ ┗ registro.hbs
┣ .env
┣ .gitignore
┣ db_18_skaters_prueba_m8-g73_lm.sql
┣ package-lock.json
┣ package.json
┣ README.md
┗ server.js
```
## Funciones Principales
generateToken(skater)
Genera un accessToken para un skater, incluyendo el id, email, y nombre en el payload.

javascript
Copiar código
export const generateToken = (skater) => {
    if (!JWT_SECRET_KEY) {
        throw new Error('La clave secreta de JWT no está definida en las variables de entorno');
    }

    const payload = {
        skater_id: skater.id,
        email: skater.email,
        nombre: skater.nombre
    };

    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '7h' });
};
verifyToken(token)
Verifica un accessToken y devuelve el contenido del token si es válido.
```
javascript
Copiar código
export const verifyToken = (token) => {
    if (!JWT_SECRET_KEY) {
        throw new Error('La clave secreta de JWT no está definida en las variables de entorno');
    }
    return jwt.verify(token, JWT_SECRET_KEY);
};
authenticateToken(req, res, next)
Middleware que protege rutas privadas verificando el accessToken.
```
javascript
Copiar código
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/login');  // Redirige al login si no hay token
    }

    try {
        const decoded = verifyToken(token);
        req.skater_id = decoded.skater_id;
        req.email = decoded.email;
        req.nombre = decoded.nombre;
        next();
    } catch (err) {
        console.error('Token inválido:', err);
        res.status(403).redirect('/login');  // Redirige al login si el token es inválido
    }
};
Ejemplos de Uso
Iniciar Sesión
bash
Copiar código
POST /login
{
    "email": "bam@skate.com",
    "password": "password123"
}
Registrar un Skater
bash
Copiar código
POST /registro

## Ejemplo de que datos se ingresan para registrar un nuevo skater
## En public/assets/img/ejemplo.jpg, estan todas las imagenes con cada nombre 
## Usar esos mismos nombres para registrar skaters.

{
  "email": "bam@skate.com",
  "nombre": "Bam",
  "password": "bam123",
  "repitaPassword": "bam123",
  "anos_experiencia": 5,
  "especialidad": "Street Skating",
  "foto":"/assets/img/bam.jpg",
  "estado": true
}


Ver la Página de Participantes (Protegida)
bash
Copiar código
GET /participantes
Actualizar un Skater (Protegida)
bash
Copiar código
PUT /participantes/:id
{
    "nombre": "Skater Actualizado",
    "anos_experiencia": 4,
    "especialidad": "Vert"
}
Eliminar un Skater (Protegida)
bash
Copiar código
DELETE /participantes/:id
```
## Backend SE TRABAJO CON VARIAS ERRAMIENTAS DE NODE.JS, NPM, entre otras:
1. Express.js

2. Handlebars (.hbs) 
## Se utilizo la estructura completa de los handlebars .hbs usando views, layouts y partials.

## Funcionalidades del Frontend
Estructura de Vistas con Handlebars
Las vistas en Handlebars (.hbs) permiten la creación de contenido dinámico y reutilizable.
```
views/layouts/main.hbs
Estructura base para todas las páginas, incluyendo cabecera, pie de página, y scripts de JavaScript.
```
views/partials/header.hbs y views/partials/footer.hbs
Partials reutilizables para la cabecera y pie de página de la aplicación.
```
Vistas Específicas
views/index.hbs: Muestra la lista de participantes registrados y su estado de revisión.
views/admin.hbs: Panel de administración para aprobar o rechazar solicitudes de participantes.
views/login.hbs: Formulario de inicio de sesión para participantes.
views/participantes.hbs: Permite a los participantes actualizar su perfil, excepto el correo electrónico y la foto.
views/registro.hbs: Formulario de registro para nuevos participantes.
Integración de Archivos estáticos
Los archivos estáticos (CSS y JS) se cargan desde la carpeta public/assets. Los scripts específicos para cada página se incluyen en el layout principal (main.hbs).
```
```
3. PostgreSQL

4. JSON Web Tokens (JWT)

5. express-fileupload

1. HTML, CSS y Bootstrap

2. Axios

3. Scripts JavaScript (admin.js, login.js, participantes.js, registro.js)
```
## MODULARIZACIÓN, PARAMETRIZACIÓN Y BUENAS PRACTICAS DENTRO DE LO POSIBLE
## CASI TODO COMENTADO PARA  MEJOR COMPRENCIÓN.
```
```
## Notas Finales
Este proyecto demuestra una aplicación web completa con capacidades CRUD, autenticación JWT, y manejo de archivos, proporcionando una base sólida para futuros desarrollos y mejoras en la plataforma de competencia de Skate.
```