import express from 'express'
import {getAllPitches, sendPitch } from '../controllers/pitchContoller.js';
import { isUserAuthenticated } from '../middlewares/auth.js';
const router = express.Router();
router.post('/send', isUserAuthenticated,sendPitch)
router.get('/getall', isUserAuthenticated, getAllPitches)
export default router;