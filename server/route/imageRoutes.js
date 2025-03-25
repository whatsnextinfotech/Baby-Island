import express from 'express';
import { uploadImage, getAllImages } from '../controllers/imageController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/images', getAllImages);

export default router;
