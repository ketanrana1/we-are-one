import mongoose from 'mongoose';

const {v4 : uuidv4} = require('uuid')
const { Schema } = mongoose;

const artprintSchema = new Schema({

  artId: {   
    type: String,
    default: uuidv4
  },
  art_name: String,
  art_description: String,
  art_image_1: String,
  art_image_2: String,
  art_image_3: String,
  art_image_4: String,
  art_image_1_name: String,
  art_image_2_name: String,
  art_image_3_name: String,
  art_image_4_name: String,
  size_small_price: String,
  size_large_price: String,
  size_xlarge_price: String,

},
{timestamps: true}
);
  
export default mongoose.model('Artprint', artprintSchema);