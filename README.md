# Proyecto Node Express y Vite React

Este proyecto consiste en una aplicación web que utiliza Node.js con Express como backend y Vite con React como frontend. A continuación se detallan las instrucciones para correr ambos entornos de desarrollo.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## Probar funcionalidades

Puedes clonar el repositorio en el siguiente Link

- [GitHub](https://github.com/miller0702/eventos.git)

En el siguiente Link encontraras todas las rutas del backend documentadas

- [Postman](https://documenter.getpostman.com/view/20358776/2sAXxJguFo) 


## Instrucciones para Correr el Proyecto

### 1. Clona el Repositorio

Si aún no lo has hecho, clona el repositorio en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd mi-proyecto
```

2. Configura el Backend
Navega al directorio del backend:

```bash
cd backend
```

Instala las dependencias necesarias:

```bash
npm install
```

Configura el archivo de entorno (opcional). Si tienes variables de entorno, crea un archivo .env y agrega tus configuraciones.

Inicia el servidor de backend:

```bash
nodemon server
```

El servidor de Express debería estar corriendo en http://localhost:5000 (o el puerto configurado en tu aplicación).

3. Configura el Frontend
Abre una nueva terminal y navega al directorio del frontend:

```bash
cd frontend
```

Instala las dependencias necesarias:

```bash
npm install
```

Inicia el servidor de desarrollo de Vite:

```bash
npm run dev
```

La aplicación React debería estar corriendo en http://localhost:5173 (o el puerto configurado por Vite).

4. Accede a la Aplicación
Ahora puedes acceder a la aplicación desde tu navegador:

Frontend: http://localhost:5173
Backend: http://localhost:5000

5. Notas Adicionales
Asegúrate de que ambos servidores (backend y frontend) estén corriendo para que la aplicación funcione correctamente.
Puedes ajustar las configuraciones de puerto en los archivos correspondientes si es necesario.
Contribuciones

Si deseas contribuir a este proyecto, siéntete libre de abrir un "issue" o enviar un "pull request".

Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.


### Notas

1. **Estructura del Proyecto**: La sección de estructura del proyecto ayuda a los usuarios a entender cómo está organizado el código.
2. **Instrucciones Detalladas**: Cada paso es claro y específico, desde la clonación del repositorio hasta la ejecución de ambos entornos.
3. **Notas Adicionales**: Incluye información relevante que puede ser útil para los desarrolladores que trabajan en el proyecto.
4. **Contribuciones y Licencia**: Facilita la colaboración y proporciona información sobre la licencia del proyecto.

Siente libre de modificar cualquier parte para que se ajuste mejor a tu proyecto.