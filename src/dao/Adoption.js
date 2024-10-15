import adoptionModel from "./models/Adoption.js";

export default class Adoption {

    getAll = (params) =>{
        return adoptionModel.find(params);
    }

    getById = (params) =>{
        return adoptionModel.findOne(params);
    }

    save = (doc) =>{
        return adoptionModel.create(doc);
    }

    saveMany = (docs) =>{
        return adoptionModel.create(docs)
    }

    update = (id,doc) =>{
        return adoptionModel.findByIdAndUpdate(id,{$set:doc})
    }
    
    delete = (id) =>{
        return adoptionModel.findByIdAndDelete(id);
    }
}