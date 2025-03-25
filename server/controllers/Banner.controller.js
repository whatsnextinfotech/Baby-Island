// import uploadImageClodinary from "./uploadImage.controller.js";
// import Banner from "../models/Banner.model.js";

// const uploadBannerController = async (request, response) => {
//   try {
//     const { title, description } = request.body;
//     const file = request.file;

//     if (!file) {
//       return response.status(400).json({ message: "No file uploaded", success: false, error: true });
//     }

//     const uploadImage = await uploadImageClodinary(file);

//     const newBanner = new Banner({
//       url: uploadImage.url,
//       public_id: uploadImage.public_id,
//       title,
//       description,
//     });

//     await newBanner.save();

//     return response.json({
//       message: "Banner upload successful",
//       data: newBanner,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || "Internal Server Error",
//       error: true,
//       success: false,
//     });
//   }
// };

// const getBannersController = async (request, response) => {
//   try {
//     const banners = await Banner.find();
//     return response.json({
//       message: "Banners fetched successfully",
//       data: banners,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || "Internal Server Error",
//       error: true,
//       success: false,
//     });
//   }
// };

// export { uploadBannerController, getBannersController };
