import mongoose from 'mongoose';
const {v4 : uuidv4} = require('uuid');

const { Schema } = mongoose;

const transactionSchema = new Schema({

   transactionId: {
    type: String,
    default: uuidv4
  },
   status: String,
   info: [Object],
  }, {timestamps: true},);
  
export default mongoose.model('Transaction', transactionSchema);
