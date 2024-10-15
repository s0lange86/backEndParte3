//cualquier error que se produzca en nuestra aplicacion lo va a atrapar y brindara una respuesta al cliente

import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) =>{
    const status = err.status || 500; //recibe el status del error. Si viene "undefined" el status es 500
    logger.error(`${err.message}`);
    const message = status === 500 ? "Internal server error" : err.message; //recibe el mensaje del error. Tiene una validacion en el caso que sea status 500
    res.status(status).json({ status: "error", error: message });
}