const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '0.0.1',
            description: 'Documentación de la API para el E-commerce',
        },
        servers: [
            {
                url: "http://localhost:5000", // Corrige "urls" a "url"
                description: "Servicio local",
            },
        ],
    },
    apis: ["./src/routes/*.js"] // Ruta a los archivos de rutas donde se encuentran las anotaciones de Swagger
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;