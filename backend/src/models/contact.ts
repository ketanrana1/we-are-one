import mongoose from 'mongoose';

const {v4 : uuidv4} = require('uuid')
const { Schema } = mongoose;

const contactSchema = new Schema({

  contactId: {   
    type: String,
    default: uuidv4
  },
  first_name: String,
  last_name: String,
  email: String,
  enquiry: String,
},
{timestamps: true}
);
  
export default mongoose.model('Contact', contactSchema);