import Adoption from "../dao/Adoption.js";
import { customError } from "../errors/customError.js";

export class AdoptionServices {
    constructor() {
        this.adoptionDao = new Adoption();
    }

    async getAll() {
        const adoptions = await this.adoptionDao.getAll();
        return adoptions;
    }

    async getById(id) {
        const adoption = await this.adoptionDao.getById(id);
        if(!adoption) throw customError.notFoundError(`Adoption id ${id} not found`)
        return adoption;
    }

    async create(data) {
        const adoption = await this.adoptionDao.save(data);
        return adoption;
    }

    async createMany(data) {
        const adoptions = await this.adoptionDao.saveMany(data)
    }

    async updateAdoption(id, data) {
        const adoption = await this.adoptionDao.update(id, data);
        return adoption;
    }

    async deleteAdoption(id) {
        const adoption = await this.adoptionDao.delete(id);
        return adoption;
    }
}