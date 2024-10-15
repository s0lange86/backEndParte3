import { createLogger, format, transports } from 'winston';

//desestructuramos las propiedades del "formayteo" que le queremos dar:
const { combine, timestamp, printf, colorize } = format;

//CUSTOM FORMAT:
const customFormat = printf( ({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}` //asi sera el formato de como deberia verse en consola, es como armamos el "mensaje", como lo queremos estructurar
});

//configuración:
export const logger = createLogger({
    level: "info", //nivel minimo de Log que va a tener
    format: combine(
        colorize(), //va a tener colores
        timestamp({ format: "YYYY-MM-DD HH:mm:ss"}), //el "timestamp" tendra este formato definido de fecha y hora
        customFormat //utilizará el "custom format" que especificamos arriba
    ),
    transports: [
        new transports.Console(), //que nos muestre por consola los logs
        new transports.File({ filename: "logs/error.log", level: "error" }), //creara un archivo donde se guardaran los logs del tipo "error"
        new transports.File({ filename: "logs/combined.log" }) //creara un archivo donde se guardaran todos los tipos de logs, por eso tampoco se especifica el "level"
    ]
})