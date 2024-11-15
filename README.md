# PROYECTO BACKEND 3: Solange Fano

## Enlaces Importantes
- **Repositorio en GitHub**: [https://github.com/s0lange86/backEndParte3](https://github.com/s0lange86/backEndParte3)
- **Swagger (Documentación de API)**: [http://localhost:8080/api-docs/#/](http://localhost:8080/api-docs/#/)
- **DockerHub**: [solange86/adoption-fano](https://hub.docker.com/r/solange86/adoption-fano)

## Endpoints
- Archivo de Postman adjunto con los endpoints necesarios para la creación de "mocks".

---

## Variables de Entorno
- **MongoDB**: La URL será incluida en el campo de observaciones al momento de entregar el proyecto.

---

## Configuración y Uso de Docker

### Dependencias
- Se instaló **bcryptjs** para evitar problemas al ejecutar Docker. 
- Se reemplazó la importación de `bcrypt` por `bcryptjs` en el archivo `/utils/index.js`.
- Si hay errores al hashear contraseñas, podría deberse a que **bcrypt** debería usarse en lugar de **bcryptjs**.

### Creación del Dockerfile
1. Definir una imagen base de Node.js:
    ```dockerfile
    FROM node:20.12.2
    ```
2. Establecer el directorio de trabajo dentro del contenedor:
    ```dockerfile
    WORKDIR /app
    ```
3. Copiar el archivo `package.json` al directorio de trabajo:
    ```dockerfile
    COPY package.json .
    ```
4. Instalar dependencias necesarias:
    ```dockerfile
    RUN npm install
    RUN npm install bcryptjs
    ```
5. Copiar el resto de los archivos al directorio de trabajo:
    ```dockerfile
    COPY . .
    ```
6. Exponer el puerto 8080:
    ```dockerfile
    EXPOSE 8080
    ```
7. Definir el comando para iniciar la aplicación:
    ```dockerfile
    CMD ["npm", "start"]
    ```

---

### Construcción y Ejecución de la Imagen Docker

1. **Construir la imagen**:
    ```bash
    docker build -t nombre-de-la-imagen .
    ```
    Reemplazar `nombre-de-la-imagen` por el nombre que desees asignar a tu imagen.

2. **Ejecutar el contenedor**:
    ```bash
    docker run -p 8080:8080 nombre-de-la-imagen
    ```
    El primer `8080` es el puerto en tu máquina local, y el segundo `8080` es el puerto expuesto en el contenedor.

---

### Publicación en DockerHub

1. **Iniciar sesión en DockerHub**:
    ```bash
    docker login
    ```

2. **Crear un tag para la imagen**:
    ```bash
    docker tag <nombre_imagen> <nombre_usuario_dockerhub>/<nombre_repositorio>:<tag>
    ```

3. **Subir la imagen a DockerHub**:
    ```bash
    docker push <nombre_usuario_dockerhub>/<nombre_repositorio>:<tag>
    ```

4. **Descargar la imagen desde DockerHub**:
    - De forma privada:
        ```bash
        docker pull solange86/adoption-fano
        ```
    - Versión específica:
        ```bash
        docker pull solange86/adoption-fano:1.0.0
        ```

---

## Notas
- Asegúrate de verificar que todas las dependencias estén correctamente instaladas.
- Documentación de los endpoints está disponible en el archivo de Postman adjunto y mediante Swagger.
