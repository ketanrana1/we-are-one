import mongoose from 'mongoose';
const {v4 : uuidv4} = require('uuid') 

const { Schema } = mongoose; 

const cardSchema = new Schema({
    id: {
      type: String,
      default: uuidv4
    },
    card_image_file: String,
    card_image: String,
    video_file: String,
    file_video: String,
    card_content: String,
    type: String,
    mode: String,
    status: String
  },
  { timestamps: { createdAt: 'date_added', updatedAt: 'date_modified' } }
  ); 
  
export default mongoose.model('Card', cardSchema);