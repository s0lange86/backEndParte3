# Definimos una imagen base de node y su version para nuestro contenedor
FROM node:20.12.2

#Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

#Copiamos el archivo package.json a la carpeta de trabajo. El puntito del final importante: "para que copie TODO" del package.json
COPY package.json .

#Instalamos las dependencias del proyecto. (Nota: instalamos bcryptjs porque bcrypt trae problemas al querer correr la imagen)
#Tambien modificamos en nuestro /utils/index.js la dependencia bcrypt por bcryptjs
RUN npm install
RUN npm install bcryptjs

#Copiamos el resto de los archivos a la carpeta de trabajo (importante los 2 puntitos)
COPY  . .

#Exponemos el puerto 8080. Para cuando se levante nuestro servidor en que puerto vamos a "exponer" el contendor
EXPOSE 8080

#Definimos los comandos para correr nuestra aplicación
CMD ["npm", "start"]

#Luego de crear el DockerFile, debemos construir la imagen de nuestro contenedor
#Para esto debemos ejecutar el siguiente comando en la terminal:
#docker build -t nombre-de-la-imagen . (reemplazar "nombre-de-la-imagen" por el nombre que quieras para darle a tu imagen)

#Una vez que la imagen se haya construido, podemos correr un contenedor a partir de ella
#Para esto, debemos ejecutar el siguiente comando en el terminal:
#docker run -p 8080:8080 nombre-de-la-imagen (reemplazar "nombre-de-la-imagen" por el nombre que le diste a tu imagen). El primer puerto "8080" es el puerto de nuestra #computadora que vamos a usar, y el segundo puerto "8080" es el puerto que nosotros hemos expuesto para nuestro contenedor

#Loguearse con la cuenta de docker desde la consola
#docker login 

#Crear el tag de la imagen
#docker tag <nombre_imagen> <nombre_usuario_dockerhub>/<nombre_repositorio>:<tag>

#Subir la imagem a dockerhub
#docker push <nombre_usuario_dockerhub>/<nombre_respositorio>:<tag>

#Descargar la imagen
#docker pull <nombre_usuario_dockerhub>/<nombre_respositorio>:<tag>

#Descargar de manera publica la imagen
#docker pull <nombre_repositorio>:<tag>

