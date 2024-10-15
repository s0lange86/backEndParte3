import Adoption from "../dao/Adoption.js";
import { customError } from "../errors/customError.js";

export class AdoptionServices {
    constructor() {
        this.adoptionDao = new Adoption();
    }

    async getAll() {
        const adoptions = this.adoptionDao.getAll();
        return adoptions;
    }

    async getById(id) {
        const adoption = this.adoptionDao.getById(id);
        if(!adoption) throw customError.notFoundError(`Adoption id ${id} not found`)
        return adoption;
    }

    async create(data) {
        const adoption = this.adoptionDao.save(data);
        return adoption;
    }

    async create(data) {
        const adoptions = this.adoptionDao.saveMany(data)
    }

    async updateAdoption(id, data) {
        const adoption = this.adoptionDao.update(id, data);
        return adoption;
    }

    async deleteAdoption(id) {
        const adoption = this.adoptionDao.delete(id);
        return adoption;
    }
}