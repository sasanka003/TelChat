import { Router } from "express";
import * as VoicePackageHandlers from "./voicepackages.handlers";

const router = Router();

router.get('/', VoicePackageHandlers.findAll);
router.get('/:id', VoicePackageHandlers.findById);
router.post('/', VoicePackageHandlers.createOne);

export default router;