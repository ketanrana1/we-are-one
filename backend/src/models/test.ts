import mongoose from 'mongoose';

const {v4 : uuidv4} = require('uuid')
const { Schema } = mongoose;

const testSchema = new Schema({  

  testId: {   
    type: String,
    default: uuidv4
  },
  test: String,
  image: String,
  image_name: String,
  new_image: [Object],
  video: String,   
  video_name: String,
},
{timestamps: true}
);
  
export default mongoose.model('Test', testSchema);