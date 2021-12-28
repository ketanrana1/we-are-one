import mongoose from 'mongoose';
const {v4 : uuidv4} = require('uuid');

const { Schema } = mongoose;

const orderSchema = new Schema({
    order_amount: String,
    email: String,
    userId: String,
   transactionId:{
     type: String,
     ref: 'Transaction'
   },
   orderId: {
     type: String,
     default: uuidv4
   },
  
   orderStatus: String,
   shipping_firstname: String,
   shipping_lastname: String,
   shipping_address_1: String,
   shipping_address_2: String,
   shipping_city: String,      
   shipping_state: String,
   shipping_zip: String,
   shipping_country: String,
   shipping_telephone: String,
   shipping_email: String,
   billing_firstname: String,
   billing_lastname: String,
   billing_address_1: String,
   billing_address_2: String,
   billing_city: String,
   billing_state: String,
   sbilling_zip: String,
   billing_country: String,
   billing_telephone: String,
   billing_email: String,
   ordered_items: [Object],
   payment_method: String,
   paypal_transaction_details: String,
   total_amount: Number,
   shipping_cost: Number,
   sub_amount: Number,
   
  },{timestamps: true},);
  
export default mongoose.model('Order', orderSchema);