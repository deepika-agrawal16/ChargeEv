import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
export async function signup(req, res) {
  const { username, email, phoneNumber, password, confirmPassword } = req.body;

  // Basic backend validation (optional but recommended)
  if (!username || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user - confirmPassword NOT saved in schema, so no need to pass
    const user = await User.create({ username, email, phoneNumber, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


// Get complete user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

