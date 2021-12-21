import mongoose from 'mongoose';
const {v4 : uuidv4} = require('uuid')

const { Schema } = mongoose;

const puzzleListSchema = new Schema({
  puzzle_uuid: {
    type: String,
    default: uuidv4
  },
  paid_status: String,
  puzzle_image: String,
  puzzle_image_name: String,
  type: String, 
  puzzle_parts: [Object]                  
  });


  
export default mongoose.model('PuzzleList', puzzleListSchema);
