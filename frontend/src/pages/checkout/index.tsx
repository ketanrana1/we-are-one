import React, { useState} from 'react'
import LayoutNew from 'components/common/LayoutNew'
import Joi from "joi-browser";
import axios from 'axios';   
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { cartReducer } from 'redux/cart.slice';

const initialShippingState = { shipping_firstname: "", shipping_lastname: "", shipping_address_1: "", shipping_address_2: "", shipping_city: "", shipping_state: "", shipping_zip: "", shipping_country:'', shipping_telephone: "", shipping_email: "", billing_firstname: "", billing_lastname: "", billing_address_1: "", billing_address_2: "", billing_city: "", billing_state: "", billing_zip: "", billing_country:'', billing_telephone: "", billing_email: "" };


const initialResponseState: any = [];

const schema = {

    shipping_firstname: Joi.string().required(),
    shipping_lastname: Joi.string().required(),
    shipping_address_1: Joi.string().required(),
    shipping_address_2: Joi.string(),
    shipping_city: Joi.string().required(),
    shipping_state: Joi.string().required(),
    shipping_zip: Joi.string().required(),
    shipping_country: Joi.string().required(),
    shipping_telephone: Joi.number().required(),
    shipping_email: Joi.string().required(),

    billing_firstname: Joi.string().required(),
    billing_lastname: Joi.string().required(),
    billing_address_1: Joi.string().required(),
    billing_address_2: Joi.string(),
    billing_city: Joi.string().required(),
    billing_state: Joi.string().required(),
    billing_zip: Joi.string().required(),
    billing_country: Joi.string().required(),
    billing_telephone: Joi.number().required(),
    billing_email: Joi.string().required()

};




export default function Checkout() {
    const cart = useSelector((state: any) => state.cart);

    const router = useRouter();

    const [shippingState, setShippingState] = useState(initialShippingState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(shippingState, schema, options);
        const errorsObj = {};
        if (!error) return;
        for (let detail of error.details) {
          const { path, message } = detail;
          errorsObj[path[0]] = message;
        }
        return errorsObj;
      }; 

      const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors(validate());

        // let form = new FormData();

       const formBody = {
            items: cart.map((item: any) => ({
                productId: item.productId,
                variant: item.variant ? item.variant : null,
                quantity: item.quantity,
                orderRepeat: item.orderRepeat,
                orderRepeatValue: item.orderRepeatValue,
    
            })),
            shipping_firstname:shippingState.shipping_firstname,
            shipping_lastname : shippingState.shipping_lastname,
            shipping_address_1 : shippingState.shipping_address_1,
            shipping_address_2: shippingState.shipping_address_2,
            shipping_city: shippingState.shipping_city,
            shipping_state: shippingState.shipping_state,
            shipping_zip: shippingState.shipping_zip,
            shipping_country:shippingState.shipping_country,
            shipping_telephone: shippingState.shipping_telephone,
            shipping_email: shippingState.shipping_email,
    
            billing_firstname: shippingState.billing_firstname,
            billing_lastname: shippingState.billing_lastname,
            billing_address_1: shippingState.billing_address_1,
            billing_address_2: shippingState.billing_address_2,
            billing_city: shippingState.billing_city,
            billing_state: shippingState.billing_state,
            billing_zip: shippingState.billing_zip,
            billing_country:shippingState.billing_country,
            billing_telephone: shippingState.billing_telephone,
            billing_email: shippingState.billing_email,
       }

      

        if( (typeof validate() === 'undefined') ) {

        try {
            const request : any = await axios({
            method: 'post',    
            url: 'http://localhost:4000/api/checkout',
            data: formBody,
            // headers: {
            //     // 'Content-Type': 'multipart/form-data'
            //     }            
            });
            window.location.href = request?.data.url;
        } catch (error) {
            console.log(error)  
        }
        console.log(responseState);
       

    }
      };

      const validateField = (name, value) => {
        const fieldObj = { [name]: value };
        const fieldSchema = { [name]: schema[name] };
        const { error } = Joi.validate(fieldObj, fieldSchema);
        const { message } = error?.details[0] || {};
        return error ? message : null;
      };

      const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingState({ ...shippingState, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
      };

      function handleCopyingAddress (e) {

        shippingState.billing_firstname = shippingState.shipping_firstname
        shippingState.billing_lastname = shippingState.shipping_lastname 
        shippingState.billing_address_1 = shippingState.shipping_address_1
        shippingState.billing_address_2 = shippingState.shipping_address_2
        shippingState.billing_city = shippingState.shipping_city
        shippingState.billing_state = shippingState.shipping_state
        shippingState.billing_zip = shippingState.shipping_zip
        shippingState.billing_country = shippingState.shipping_country
        shippingState.billing_telephone = shippingState.shipping_telephone
        shippingState.billing_email = shippingState.shipping_email

        return router.push(router.asPath)     
      }

    return (
       
        <div className="container checkout-page py-4 py-md-5">
            <div className="checkout-content">
                <form onSubmit={handleSubmit} >
                    <div className="response-cont col-12 px-md-5 mb-3">
                        <h6>{responseState?.data?.message}</h6>
                    </div>   
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-md-6 left px-md-5">
                            <div className="row d-flex justify-content-between">
                            <h2 className="mb-4">Your Shipping Details</h2>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> First Name:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_firstname" value={shippingState.shipping_firstname} className="large-field" />
                                {errors && <small>{errors.shipping_firstname}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> Last Name:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_lastname" value={shippingState.shipping_lastname} className="large-field" />
                                {errors && <small>{errors.shipping_lastname}</small>}
                                </div>
                                <div className="col-12 mb-3">
                                <span className="required">*</span> Address Line 1:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_address_1" value={shippingState.shipping_address_1} className="large-field"  />
                                {errors && <small>{errors.shipping_address_1}</small>}
                                </div>
                                <div className="col-12 mb-3">
                                Address Line 2(optional):<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_address_2" value={shippingState.shipping_address_2} className="large-field" />
                                {errors && <small>{errors.shipping_address_2}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> City:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_city" value={shippingState.shipping_city} className="large-field" />
                                {errors && <small>{errors.shipping_city}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> State:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_state" value={shippingState.shipping_state} className="large-field" />
                                {errors && <small>{errors.shipping_state}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> Zip code:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_zip" value={shippingState.shipping_zip} className="large-field" />
                                {errors && <small>{errors.shipping_zip}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> Country:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_country" value={shippingState.shipping_country} className="large-field" />
                                {errors && <small>{errors.shipping_country}</small>}
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> Phone Number:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_telephone" value={shippingState.shipping_telephone} className="large-field" />
                                {errors && <small>{errors.shipping_telephone}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> E-Mail:<br/>
                                <input onChange={handleShippingChange} type="text" name="shipping_email" value={shippingState.shipping_email} className="large-field" />
                                {errors && <small>{errors.shipping_email}</small>}
                                </div>
                                <div className="col-12 mb-3">
                                <a onClick={handleCopyingAddress} className="common-button">Copy to Billing Address</a>
                                </div>                                
                            </div>
                        </div>

                        <div className="col-12 col-md-6 px-md-5 left">
                            <div className="row d-flex justify-content-between">
                            <h2 className="mb-4">Your Billing Details</h2>
                                <div className="col-12 col-md-6 mb-3">
                                    <span className="required">*</span> First Name:<br/>
                                    <input onChange={handleShippingChange} type="text" name="billing_firstname" value={shippingState.billing_firstname} className="large-field" />
                                    {errors && <small>{errors.billing_firstname}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <span className="required">*</span> Last Name:<br/>
                                    <input onChange={handleShippingChange} type="text" name="billing_lastname" value={shippingState.billing_lastname} className="large-field" />
                                    {errors && <small>{errors.billing_lastname}</small>}
                                </div>
                                <div className="col-12 mb-3">
                                    <span className="required">*</span> Address Line 1:<br/>
                                    <input onChange={handleShippingChange} type="text" name="billing_address_1" value={shippingState.billing_address_1} className="large-field" />
                                    {errors && <small>{errors.billing_address_1}</small>}
                                </div>
                                <div className="col-12 mb-3">
                                Address Line 2(optional):<br/>
                                <input onChange={handleShippingChange} type="text" name="billing_address_2" value={shippingState.billing_address_2} className="large-field"/>
                                {errors && <small>{errors.billing_address_2}</small>}
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> City:<br/>
                                <input onChange={handleShippingChange} type="text" name="billing_city" value={shippingState.billing_city} className="large-field" />
                                {errors && <small>{errors.billing_city}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> State:<br/>
                                <input onChange={handleShippingChange} type="text" name="billing_state" value={shippingState.billing_state} className="large-field" />
                                {errors && <small>{errors.billing_state}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> Zip code:<br/>
                                <input onChange={handleShippingChange} type="text" name="billing_zip" value={shippingState.billing_zip} className="large-field" />
                                {errors && <small>{errors.billing_zip}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> Country:<br/>
                                <input onChange={handleShippingChange} type="text" name="billing_country" value={shippingState.billing_country} className="large-field" />
                                {errors && <small>{errors.billing_country}</small>}
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> Phone Number:<br/>
                                <input onChange={handleShippingChange} type="text" name="billing_telephone" value={shippingState.billing_telephone} className="large-field" />
                                {errors && <small>{errors.billing_telephone}</small>}
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                <span className="required">*</span> E-Mail:<br/>
                                <input onChange={handleShippingChange} type="text" name="billing_email" value={shippingState.billing_email} className="large-field" />
                                {errors && <small>{errors.billing_email}</small>}
                                </div>                            
                            </div>
                        </div>
                        <div className="col-12 px-md-5 mt-3 response-cont">
                            <h6>{responseState?.data?.message}</h6>
                        </div> 
                    </div>
                    <div className="row px-md-5 mb-3">
                        <h2>Payment Method</h2>
                        <h4 style={{textAlign:"center"}} >Paypal</h4>
                        <div className="payment-information">
                            <p>You will be redirected to PayPal to complete payment.</p>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="right">
                                <input type="checkbox" name="agree" value="1" /> I have read and agree to the <a className="colorbox cboxElement" href=""><b>Terms & Conditions</b></a>
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="form-group">
                                <button className="common-button" type="submit">Submit</button>
                            </div>
                        </div>  
                        <div className="col-12">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}




Checkout.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  }  
