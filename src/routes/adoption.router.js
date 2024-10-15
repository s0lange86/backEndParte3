import { Router} from 'express';
import { AdoptionControllers } from '../controllers/adoptions.controller.js';

const adoptionsController = new AdoptionControllers();
const router = Router();

router.get('/', adoptionsController.getAllAdoptions);
router.get('/:aid', adoptionsController.getAdoptionById);
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;