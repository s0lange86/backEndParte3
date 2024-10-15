import { fakerES_MX as faker } from "@faker-js/faker"; //importamos "faker" en idioma español mexico;


export const generatePetsMock = (amount) => {
    const pets = [];

    for(let i = 0; i < amount ; i++) {
        const pet = {
            name: faker.person.firstName(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(),
            adopted: false,
            image: faker.image.avatar(),        
        }

        pets.push(pet);
    }

    return pets;
}