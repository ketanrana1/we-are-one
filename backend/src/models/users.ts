import mongoose from 'mongoose';
const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const {v4 : uuidv4} = require('uuid')


const userSchema = new Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email:String,
  password: String,
  telephone: Number,
  fax: Number, 
  role: String,
  company: String,
  companyId: String,
  address_1: String,
  address_2: String,
  city: String,      
  state: String,
  zip: String,
  country: String,
  }, 
  {timestamps: true}
  );
  
  userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next();
    }
  });
  
  userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };
  
export default mongoose.model('User', userSchema);