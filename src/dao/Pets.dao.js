import petModel from "./models/Pet.js";

export default class Pet {

    getAll = (params) =>{
        return petModel.find(params)
    }

    getById = (params) =>{
        return petModel.findById(params);
    }

    save = (doc) =>{
        return petModel.create(doc);
    }

    saveMany = (docs) =>{
        return petModel.insertMany(docs);
    }

    update = (id,doc) =>{
        return petModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return petModel.findByIdAndDelete(id);
    }
}