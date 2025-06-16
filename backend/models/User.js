import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  username: {  // make sure frontend sends username
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {  // keep naming consistent with frontend
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  // New profile fields
  firstName: {
    type: String,
    trim: true,
    default: '',
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  city: {
    type: String,
    trim: true,
    default: '',
  },
  state: {
    type: String,
    trim: true,
    default: '',
  },
  country: {
    type: String,
    trim: true,
    default: '',
  },
  postcode: {
    type: String,
    trim: true,
    default: '',
  },
  profileImage: {
    type: String,
    default: 'https://via.placeholder.com/100',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model('User', userSchema);
