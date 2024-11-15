import { expect } from "chai";
import supertest from "supertest";

const petRequest = supertest("http://localhost:8080/api/pets");
const userRequest = supertest("http://localhost:8080/api/sessions");
const adoptionsRequest = supertest("http://localhost:8080/api/adoptions");

describe('Test de integracion ADOPTIONS', () => {
    let testPet
    let testUser
    let testAdoption

    it('[POST] /api/pets - Debe crear una nueva mascota', async() => {
        const newPet = {
            name: "Pet Test",
            specie: "dog",
            birthDate: "01/09/2023",
            image: "asd"
        }
        
        const { status, body } = await petRequest.post("/").send(newPet); //con "send" estariamos enviando el cuerpo de body
        testPet = body.payload

        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Pet Test");
        expect(body.payload.specie).to.be.equal("dog");
        expect(body.payload.adopted).to.be.equal(false);
        
    })

    it('[POST] /api/sessions - Debe registrar/crear un nuevo usuario', async() => {
        const newUser = {
            first_name: "Solange",
            last_name: "Fano",
            email: "email4@email.com",
            password: "abc123"
        }
        
        const { status, body } = await userRequest.post("/register").send(newUser); //con "send" estariamos enviando el cuerpo de body
        testUser = body.payload;

        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.first_name).to.be.equal(newUser.first_name);
        expect(body.payload.last_name).to.be.equal(newUser.last_name);
        expect(body.payload.email).to.be.equal(newUser.email);
        expect(body.payload.password).to.not.be.equal(newUser.password);
        
    })

    
    
    it('[POST] /api/adoptions/:uid/:pid - Debe crear una adopcion', async() => {
        const { status, body } = await adoptionsRequest.post(`/${testUser._id}/${testPet._id}`);
        testAdoption = body.payload;
        
        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.owner).to.be.equal(testUser._id);
        expect(body.payload.pet).to.be.equal(testPet._id);
    })
    
    
    it('[GET] /api/adoptions - Debe devolver un array de adopciones', async() => {    
        const { status, body } = await adoptionsRequest.get("/")
        
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("array");
    })

    it('[GET] /api/adoptions/:aid - Debe devolver una adopcion segun su Id', async() => {      
        const { status, body } = await adoptionsRequest.get(`/${testAdoption._id}`)

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.owner).to.be.equal(testUser._id);
        expect(body.payload.pet).to.be.equal(testPet._id);
    })  
})