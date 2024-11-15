import swaggerJSDoc from "swagger-jsdoc";

//configuramos Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación: API Adopciones", 
            version: "1.0.0", 
            description: "Proyecto Backend de Fano Solange - CODERHOUSE"
        },
    },

    apis: ["./src/docs/**/*.yaml"]
}

export const specs = swaggerJSDoc(swaggerOptions);