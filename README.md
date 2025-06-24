
2. **Instalar las dependencias necesarias**
		
		$ npm run install-all-dependencies

3. **Conectar con los servicios necesarios**  
	Crear un archivo `.env` en el directorio base del proyecto. Este archivo se encarga de suministrar la información sensible necesaria. Dentro del archivo, agregar los campos:
	
		MONGODB_URL=tu_url_de_mongo
		SECRETO_TOKEN_ACCESO=tu_secreto_acceso
		SECRETO_TOKEN_REACCESO=tu_secreto_reacceso
	El `MONGODB_URL` conecta con tu propia BBDD, mientras que los `SECRETO`s se usan para verificar la veracidad de las sesiones de usuario, por lo que pueden ser cualquier contraseña (se recomienda un hash SHA256).

¡Listo, el proyecto debería estar configurado correctamente!

<br />

## Comandos

* `npm run client`: Inicia la aplicación React en `localhost:3000`
* `npm run node-server`: Inicia el servidor de backend en `localhost:5000`
* `npm run server`: Inicia el servidor de backend en `localhost:5000`, pero usando nodemon
* `npm run dev`: Inicia tanto el cliente como el servidor
* `npm run server-install-dependencies`: Instala las dependencias del backend
* `npm run client-install-dependencies`: Instala las dependencias del cliente
* `npm run install-all-dependencies`: Instala todas las dependencias

<br />
