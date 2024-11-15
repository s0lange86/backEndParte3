import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import envs from "./config/envs.config.js"

import router from "./routes/index.js";
import { errorHandler } from './errors/errorHandler.js';
import { logger } from './utils/logger.js';
import swaggerUiExpress from "swagger-ui-express"; //llamamos al método que utilizara la interfaz grafica
import { specs } from './config/swagger.config.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(envs.MONGO_URL)

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs)) //ruta a la cual se accede a la documentacion de nuestra API

app.use('/api', router);

//Middleware de manejo de errores
app.use(errorHandler); //siempre se coloca despues de las rutas


app.listen(PORT,()=>logger.info(`Listening on ${PORT}`)) //utilizamos logger en vez de console.log
