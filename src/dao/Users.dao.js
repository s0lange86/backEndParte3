import userModel from "./models/User.js";


export default class Users {
    
    getAll = (params) =>{
        return userModel.find(params);
    }

    getById = (params) =>{
        return userModel.findById(params);
    }

    getByEmail = (email) =>{
        return userModel.find({email: email});
    }

    save = (doc) =>{
        return userModel.create(doc);
    }

    saveMany = (docs) =>{
        return userModel.insertMany(docs);
    }

    update = (id,doc) =>{
        return userModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return userModel.findByIdAndDelete(id);
    }
}