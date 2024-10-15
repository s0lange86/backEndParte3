import { fakerES_MX as faker } from "@faker-js/faker"; //importamos "faker" en idioma español mexico;
import { createHash } from "../utils/index.js";

export const generateUsersMock = async (amount) => {
    const users = [];

    for(let i = 0; i < amount ; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash("coder123"), // los usuarios tendran por defecto la misma contraseña: "coder123" pero hasheada
            role: faker.datatype.boolean() ? "user" : "admin", // faker devolvera un booleando (TRUE/FALSE) y dependiendo el valor si es TRUE sera "user", si es FALSE sera "admin"
            pets: [],        
        }

        users.push(user);
    }

    return users;
}