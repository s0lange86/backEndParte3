import { UserServices } from "../services/user.services.js";

export class UserControllers {

    constructor() {
        this.userServices = new UserServices();
    }

    getAllUsers = async(req, res, next) => {
        try {
            const users = await this.userServices.getAll();
            res.send({status:"success",payload:users});

        } catch (error) {
            next(error); //hace que se active el middleware "errorHandler" que esta en app.js            
        }
    }
    
    getUser = async(req, res, next) => {
        try {
            const userId = req.params.uid;
            const user = await this.userServices.getById(userId);

            res.send({status:"success",payload:user})

        } catch (error) {
            next(error);
        }
    }
    
    updateUser =async(req, res, next) => {
        try {
            const updateBody = req.body;
            const userId = req.params.uid;
    
            const user = await this.userServices.getById(userId);
            const result = await this.userServices.update(userId,updateBody);
    
            res.send({status:"success",message:"User updated"})

        } catch (error) {
            next(error)
        }
    }
    
    deleteUser = async(req, res, next) => {
        try {
            const userId = req.params.uid;
            const result = await this.userServices.remove(userId);

            res.send({status:"success",message:"User deleted"})
            
        } catch (error) {
            next(error)
        }
    }
}



