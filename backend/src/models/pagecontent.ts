import mongoose from 'mongoose';
const {v4 : uuidv4} = require('uuid')

const { Schema } = mongoose;

const pagecontentSchema = new Schema({
    id : {   
        type: String,
        default: uuidv4
    },
    page_name: String,
    content: String,   
});
  
export default mongoose.model('Pagecontent', pagecontentSchema);