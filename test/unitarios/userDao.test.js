import Users from "../../src/dao/Users.dao.js";
import mongoose from "mongoose"; // para cuando ejecutemos el test nuestra capa de persistencia se conecte a Mongo
import { expect } from "chai";

mongoose.connect('mongodb+srv://admin:123@coder.zu2v8jq.mongodb.net/adoptme');

// Describir nuestro test
describe('Test UserDao', () => {
    const userDao = new Users();
    let userTest;

    //Método que se ejecuta antes de TODOS los test: "before"
    before(() => {
        console.log("Inicio de todos los test");
    })
    
    //Método que se ejecuta antes de CADA test: "beforEach"
    beforeEach(() => {
        console.log("Se ejecuta un test individual");
    })

    //Test individual
    it('Debe retornar todos los usuarios', async() => {
        const users = await userDao.getAll();
        expect(users).to.be.an("array"); //corroboramos con los conectores de "chai" que el valor esperado sea un array
    })

    it('Debe crear y retornar un usuario', async() => {
        const newUser = {
            first_name: "Solange",
            last_name: "Fano",
            email: "email6@myemail.com",
            password: "coder123",
            age: 38,
            birthDate: new Date()
        }
        const user = await userDao.save(newUser);
        userTest = user; 
        
        //Afirmaciones:
        expect(user).to.be.an("object");
        expect(user).to.be.property("_id"); //cuando el user se guarde en la BD deberia agregarse la propiedad ObjectId
        expect(user.first_name).to.be.equal(newUser.first_name);
        expect(user.last_name).to.be.equal(newUser.last_name);
        expect(user.email).to.be.equal(newUser.email);
        expect(user.password).to.be.equal(newUser.password);
        expect(user.role).to.be.equal("user");

        //Negaciones:
        expect(user).to.not.have.property("age");
        expect(user).to.not.have.property("birthDate");
        expect(user).to.not.be.null;
        expect(user).to.not.be.an("array")
        expect(user.role).to.not.be.equal("admin");
    })

    it('Debe retornar un usuario por su id', async() => {
        const user = await userDao.getById(userTest._id);
        
        expect(user).to.be.an("object");
        expect(user).to.be.property("_id"); //cuando el user se guarde en la BD deberia agregarse la propiedad ObjectId
        expect(user.first_name).to.be.equal(userTest.first_name);
        expect(user.last_name).to.be.equal(userTest.last_name);
        expect(user.email).to.be.equal(userTest.email);
        expect(user.password).to.be.equal(userTest.password);
    })

    it('Debe actualizar un usuario', async() => {
        const updateData = {
            first_name: "Eugenia",
            password: "hola123"
        }

        const user = await userDao.update(userTest._id, updateData);

        expect(user).to.be.an("object");
        expect(user).to.be.property("_id"); //cuando el user se guarde en la BD deberia agregarse la propiedad ObjectId
        expect(user.first_name).to.be.equal("Eugenia");
        expect(user.last_name).to.be.equal(userTest.last_name);
        expect(user.email).to.be.equal(userTest.email);
        expect(user.password).to.be.equal("hola123");
    })

    it('Debe eliminar un usuario', async() => {
        await userDao.delete(userTest._id);
        const user = await userDao.getById(userTest._id);

        expect(user).to.be.null
    })
    
    // Método que se ejecuta al finalizar CADA test: "afterEach"
    afterEach(() => {
        console.log("Test individual finalizado");
    })
    
    // Método que se ejecuta al finalizar TODOS los test: "after"
    after(() => {
        console.log("Test finalizados");
        mongoose.disconnect(); // para no tener que estar finalizando el proceso y volver a consola
    })
})