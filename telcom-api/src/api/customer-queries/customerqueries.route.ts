import { Router } from "express";
import * as CustomerQueryHandlers from "./customerqueries.handlers";

const router = Router();

router.get('/', CustomerQueryHandlers.getCustomerQueries);
router.get('/:id', CustomerQueryHandlers.getCustomerQuery);
router.get('/type/:type', CustomerQueryHandlers.getCustomerQueryByType);
router.post('/', CustomerQueryHandlers.createCustomerQuery);

export default router;
