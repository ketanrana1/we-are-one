import mongoose from 'mongoose';

const {v4 : uuidv4} = require('uuid')
const { Schema } = mongoose;

const bookSchema = new Schema({

  bookId: {   
    type: String,
    default: uuidv4
  },
  book_name: String,
  slug: String,
  book_description: String,
  book_quantity: Number,
  book_image: String,
  book_image_name: String,
  book_price: Number, 
  book_status: String,
  book_content: String,
  book_download: String,
},
{timestamps: true}
);
  
export default mongoose.model('Book', bookSchema);