import { UserServices } from "../services/user.services.js";

export class UserControllers {

    constructor() {
        this.userServices = new UserServices();
    }

    getAllUsers = async(req, res, next) => {
        try {
            const users = await this.userServices.getAll();
            res.status(200).json({status:"success",payload:users});

        } catch (error) {
            next(error); //hace que se active el middleware "errorHandler" que esta en app.js            
        }
    }
    
    getUser = async(req, res, next) => {
        try {
            const userId = req.params.uid;
            const user = await this.userServices.getById(userId);

            res.status(200).json({status:"success",payload:user})

        } catch (error) {
            next(error);
        }
    }

    createUser = async(req, res, next) => {
        try {
            const {first_name, last_name, email, password} = req.body;
            if(!first_name||!last_name||!email||!password) return res.status(400).send({status:"error",error:"Incomplete values"})
            
            const user = {
                first_name: first_name,
                last_name: last_name,
                email: email, 
                password: password
            };
            const result = await this.userServices.create(user);

            res.status(201).json({status:"success",payload:result})

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
    
            res.status(200).json({status:"success", result})

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



