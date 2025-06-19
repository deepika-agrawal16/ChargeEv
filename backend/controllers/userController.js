import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'profile_images',
      resource_type: 'image'
    });

    const user = await User.findById(req.user.id);
    user.profileImage = uploadResponse.secure_url;
    await user.save();

    res.status(200).json({
      message: 'Image uploaded successfully',
      profileImage: user.profileImage
    });

  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    res.status(500).json({ message: 'Image upload failed' });
  }
};
