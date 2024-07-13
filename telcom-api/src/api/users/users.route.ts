import { Router } from "express";
import * as UserHandlers from  "./users.handlers";

const router = Router();

router.get('/', UserHandlers.findAll);
router.get('/id/:id', UserHandlers.findById);
router.post('/', UserHandlers.createOne);
router.get('/:connectionNumber', UserHandlers.findByConnectionNumber);
router.put('/:connectionNumber', UserHandlers.updateByConnectionNumber);
router.get('/:connectionNumber/balance', UserHandlers.getBalance);
router.post('/:connectionNumber/recharge', UserHandlers.rechargeBalance);
router.get('/:connectionNumber/data_packages', UserHandlers.getDataPackages);
router.get('/:connectionNumber/voice_packages', UserHandlers.getVoicePackages);
router.get('/:connectionNumber/data_packages/active', UserHandlers.getActiveDataPackages);
router.get('/:connectionNumber/voice_packages/active', UserHandlers.getActiveVoicePackages);
router.get('/:connectionNumber/data_packages/expired', UserHandlers.getExpiredDataPackages);
router.get('/:connectionNumber/voice_packages/expired', UserHandlers.getExpiredVoicePackages);

router.post('/:connectionNumber/data_packages/activate', UserHandlers.activateDataPackage);
router.post('/:connectionNumber/voice_packages/activate', UserHandlers.activateVoicePackage);
router.get('/:connectionNumber/loan', UserHandlers.checkIsOnLoan);
router.post('/:connectionNumber/loan', UserHandlers.getLoan);


export default router;


