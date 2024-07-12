import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import datapackages from './data-packages/datapackages.route';
import voicepackages from './voice-packages/voicepackages.route';
import users from './users/users.route';


const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Telcom API',
  });
});

// router.use('/emojis', emojis);
router.use('/data', datapackages);
router.use('/voice', voicepackages);
router.use('/users', users);

export default router;
