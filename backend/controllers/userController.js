import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'No image provided' });
  }
  console.log("Received image:", image.substring(0, 50));  // log first few characters


  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'chargeev/profiles',
      width: 300,
      height: 300,
      crop: 'fill'
    });

    res.status(200).json({ profileImage: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};
