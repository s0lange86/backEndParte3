import { Router } from "express";
import { generateUsersMock } from "../mocks/user.mock.js";
import { UserServices } from "../services/user.services.js";
import { generatePetsMock } from "../mocks/pets.mocks.js";
import { PetServices } from "../services/pets.services.js";

const userServices = new UserServices();
const petServices = new PetServices();
const router = Router();

router.get('/mockingUsers', async(req, res, next) => {
    try {
        const users = await generateUsersMock(50); //genera los usuarios por medio de faker
        const response = await userServices.createMany(users); //guardamos los usuarios generados en nuestra BD

        res.status(201).json({ status: "success", payload: response });
    } catch (error) {
        // error.path = "[GET] api/mocks/mockingUsers";
        next(error);
    }
})

router.get('/mockingPets', async(req, res, next) => {
    try {
        const pets = generatePetsMock(100); //genera los pets por medio de faker
        const response = await petServices.createMany(pets); //guardamos los pets generados en nuestra BD

        res.status(201).json({ status: "success", payload: response });
    } catch (error) {
        // error.path = "[GET] api/mocks/mockingPets";
        next(error);
    }
})

router.get('/generateData/:cu/:cp', async(req, res, next) => {
    try {
        const { cu, cp } = req.params;
        const users = await generateUsersMock(Number(cu));
        const pets = generatePetsMock(Number(cp))
        const userResponse = await userServices.createMany(users);
        const petsResponse = await petServices.createMany(pets);

    res.status(201).json({ status: "success", payload: { userResponse, petsResponse } });
    } catch (error) {
        // error.path = "[GET] api/mocks/generateData/:cu/:cp";
        next(error);
    }
})

export default router;