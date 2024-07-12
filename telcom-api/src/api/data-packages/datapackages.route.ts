import { Router } from "express";
import * as DataPackageHandlers from "./datapackages.handlers";

const router = Router();

router.get('/', DataPackageHandlers.findAll);
router.get('/:id', DataPackageHandlers.findById);
router.post('/', DataPackageHandlers.createOne);
router.get('/type/:type', DataPackageHandlers.findByType);


export default router;