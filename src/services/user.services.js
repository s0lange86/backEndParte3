import Users from "../dao/Users.dao.js";
import { customError } from "../errors/customError.js";

export class UserServices {
    constructor() {
        this.userDao = new Users();
    }
    
    async getAll() {
        const users = await this.userDao.getAll();
        return users;
    }

    async getById(id) {
        const user = await this.userDao.getById(id);
        if (!user) throw customError.notFoundError(`User id ${id} not found`);
        return user;
    }

    async getByEmail(email) {
        const userEmail = await this.userDao.getByEmail(email);
        return userEmail;
    }

    async create(data) {
        const user = await this.userDao.save(data);
        return user;
    }

    async createMany(data) {
        const users = await this.userDao.saveMany(data);
        return users;
    }

    async update(id, data) {
        const user = await this.userDao.update(id, data);
        if (!user) throw customError.notFoundError(`User id ${id} not found`);
        return user;
    }

    async remove(id) {
        const user = await this.userDao.delete(id);
        return "ok"; //no devolvemos la data el usuario eliminado, solo un string confirmando que se procesó OK.
    }
}