// controllers/imageController.js
import Image from '../models/Image.js';







export const uploadImage = async (req, res) => {
  try {
    cloudinary.uploader.upload_stream({}, async (error, result) => {
      if (error) return res.status(500).json({ error });
      const newImage = new Image({ url: result.secure_url });
      await newImage.save();
      res.json(newImage);
    }).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllImages = async (req, res) => {
  const images = await Image.find();
  res.json(images);
};