import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  googleId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('User', userSchema);
