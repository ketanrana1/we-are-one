import mongoose from 'mongoose';

const { Schema } = mongoose;

const contentSchema = new Schema({
    about_us: String,   
    contact_us: String,
    privacy_policy: String
});
  
export default mongoose.model('Content', contentSchema);