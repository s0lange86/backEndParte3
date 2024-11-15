import { AdoptionServices } from "../services/adoptions.services.js";
import { PetServices } from "../services/pets.services.js";
import { UserServices } from "../services/user.services.js";

export class AdoptionControllers {
    constructor() {
        this.usersService = new UserServices();
        this.adoptionsService = new AdoptionServices();
        this.petsService = new PetServices();
    }

    getAllAdoptions = async(req,res, next)=>{
        try {
            const result = await this.adoptionsService.getAll();
            
            res.send({status:"success",payload:result})
        } catch (error) {
            next(error) //activa el middleware "errorHandler" que esta en app.js   
        }
    }
    
    getAdoptionById = async(req,res,next)=>{
        try {
            const adoptionId = req.params.aid;
            const adoption = await this.adoptionsService.getById({_id:adoptionId})
            
            res.send({status:"success",payload:adoption})

        } catch (error) {
            next(error);
        }
    }
    
    createAdoption = async(req,res,next)=>{
        try {
            const {uid,pid} = req.params;
            
            const user = await this.usersService.getById(uid);
    
            // const pet = await this.petsService.getById({_id:pid});
            const pet = await this.petsService.getById(pid);
            
            if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
            user.pets.push(pet._id);
            
            await this.usersService.update(user._id,{pets:user.pets})
            await this.petsService.update(pet._id,{adopted:true,owner:user._id})
            const adoption = await this.adoptionsService.create({owner:user._id,pet:pet._id})
            
            res.status(201).json({status:"success", payload: adoption})
        } catch (error) {
            next(error);
        }
    }
}