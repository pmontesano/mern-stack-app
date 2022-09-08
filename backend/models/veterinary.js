import mongoose from 'mongoose';
import generateId from '../helpers/generateId.js';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const veterinarySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: generateId(),
  },
  confirm: {
    type: Boolean,
    default: false,
  },
});

veterinarySchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log(this);
});

veterinarySchema.methods.verifyPassword = async function (formPassword) {
  return await bcrypt.compare(formPassword, this.password);
};

const Veterinary = mongoose.model('Veterinary', veterinarySchema);

export default Veterinary;
