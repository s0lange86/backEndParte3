import Pet from "../dao/Pets.dao.js";
import { customError } from "../errors/customError.js";


export class PetServices {
    constructor() {
        this.petDao = new Pet();
    }
    
    async getAll() {
        const pets = await this.petDao.getAll();
        return pets;
    }

    async getById(id) {
        const pet = await this.petDao.getById(id);
        if (!pet) throw customError.notFoundError(`Pet id ${id} not found`);        
        return pet;
    }

    async create(data) {
        const pet = await this.petDao.save(data);
        return pet;
    }

    async createMany(data) {
        const pets = await this.petDao.saveMany(data);
        return pets;
    }
    
    async update(id, data) {
        const pet = await this.petDao.update(id, data);
        if (!pet) throw customError.notFoundError(`Pet id ${id} not found`);  
        return pet;
    }

    async remove(id) {
        const pet = await this.petDao.delete(id);
        return "ok"; //no devolvemos la data el pet eliminado, solo un string confirmando que se procesó OK.
    }

    async createMocks() {
        const pets = generatepetsMock(10);
        const petsDB = await this.petDao.saveMany(pets);
        return petsDB;
    }
}