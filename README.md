# WainyTech
Proyecto de Gestión de Usuarios
Este proyecto consiste en una aplicación web para la gestión de usuarios, con un frontend desarrollado en React y un backend en .NET. A continuación se detallan los pasos necesarios para la instalación y configuración de cada parte del proyecto.

Requisitos Previos
Asegúrate de tener instalados los siguientes programas antes de comenzar la instalación:

Node.js (versión 14 o superior) y npm
Visual Studio (con el SDK de .NET 6.0)
SQL Server o cualquier otro gestor de base de datos SQL compatible
Postman (opcional, para probar las API)

1. Clonar el Repositorio
Clona el repositorio desde GitHub

2. Configuración del Backend
El backend está desarrollado en .NET y utiliza una base de datos SQL Server.

3. Instalación de Dependencias
Abre la carpeta del backend en Visual Studio.
Restaura los paquetes NuGet:
-- dotnet restore

4. Configuración de la Base de Datos
Crea una base de datos en SQL Server. Puedes usar una herramienta como SQL Server Management Studio (SSMS).
Actualiza el archivo appsettings.json en el proyecto del backend con tu cadena de conexión:
-- "ConnectionStrings": {
--   "DefaultConnection": "Server=localhost.;Database=WayniTech;Trusted_Connection=True;Trusted_Connection=SSPI;MultipleActiveResultSets=true;TrustServerCertificate=True"
-- }

5. Aplica las migraciones para generar las tablas necesarias en la base de datos:
-- dotnet ef database update

6. Ejecuta el backend en la terminal
-- dotnet run

7. Configuración del Frontend
El frontend está desarrollado en React utilizando Material-UI.

8. Instalación de Dependencias
Navega a la carpeta del frontend:
-- cd frontend
9. Instala las dependencias con npm:
-- npm install

10. Configuración de Variables de Entorno
Crea un archivo .env en la raíz del proyecto frontend con la siguiente configuración:
REACT_APP_API_URL=http://localhost:5238/api/
Esto le indica al frontend dónde encontrar la API del backend.

11. Ejecutar el Frontend
Finalmente, inicia el servidor de desarrollo de React:
npm start
npm run dev

-- IMPORTANTE --
Para visualizar la tabla con los datos, implementé un api para creación de usuario (solo backend)
Si ingresan desde Swagger ingresen a este link
http://localhost:5238/swagger/index.html

Si es desde POSTMAN, solo pegar este url request
http://localhost:5238/api/Usuario
para la prueba pueden pegar insertar este objeto

{
  "name": "Usuario",
  "userName": "UsuarioPrueba",
  "email": "usuarioprueba@gmail.com",
  "phoneNumber": "987654321",
  "password": "prueba123",
  "notification": true
}

13. Uso de la Aplicación
Abre el navegador y navega a http://localhost:3000.

14. Pruebas con Postman (Opcional)
Si deseas probar la API del backend de forma independiente, puedes usar Postman:

Importa las colecciones de Postman en el proyecto para realizar pruebas CRUD en los endpoints del backend.
Asegúrate de estar apuntando a http://localhost:5238/api/.

** Tecnologías Utilizadas **
Frontend: React, Material-UI
Backend: .NET 6.0, Entity Framework Core
Base de Datos: SQL Server



