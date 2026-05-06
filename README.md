# Tripleten web_project_api_full

Esta es la versión completa y desplegada del proyecto Around The U.S., que incluye una API en el backend y una aplicación interactiva en el frontend, conectadas y funcionando bajo un dominio propio con seguridad SSL.

El proyecto ha sido desplegado exitosamente y se puede acceder en:

# Frontend:

https://yasa.chickenkiller.com

# API Backend:

https://api.yasa.chickenkiller.com

# Tecnologías Utilizadas

# Backend

-Node.js & Express.js: Servidor y manejo de rutas.
-MongoDB & Mongoose: Base de datos NoSQL y modelado de datos.
-JSON Web Tokens (JWT): Autenticación segura.
-Bcryptjs: Encriptación de contraseñas.
-Winston: Registro de logs (peticiones y errores).
-PM2: Gestión de procesos y recuperación automática.

# Frontend

-React: Biblioteca principal para la interfaz.
-React Router: Gestión de navegación.
-APIs REST: Comunicación con el servidor propio.
-CSS: Diseño responsivo y animaciones.

# Infraestructura (DevOps)

-Google Cloud Platform (VM Instance): Servidor remoto.
-Nginx: Proxy inverso para servir el frontend y la API.
-Certbot (Let's Encrypt): Certificados SSL/HTTPS.
-FreeDNS: Gestión de dominio y subdominios.

# Funcionalidades

# Usuarios

-Registro (`/signup`) e Inicio de sesión (`/signin`).
-Edición de perfil (nombre, ocupación y avatar).
-Protección de rutas mediante middleware de autorización.

# Tarjetas (Cards)

-Obtención de tarjetas de la comunidad.
-Creación de nuevas tarjetas con nombre y URL de imagen.
-Sistema de "Likes" dinámico.
-Eliminación de tarjetas propias.

# Autor

Alejandra Sichaca
