import React, { useState } from 'react'
import ImageBanner from 'components/common/ImageBanner'
import Joi from "joi-browser";
import axios from 'axios';

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const initialState = { first_name: "", last_name: "", email: "", enquiry: "" };


const initialResponseState: any = [];

const schema = {

    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    enquiry: Joi.string().required()

};
 

const Contact = () => {

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(state, schema, options);
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

           

        let form = new FormData();

        form.append('first_name', state.first_name);
        form.append('last_name', state.last_name);
        form.append('email', state.email);
        form.append('enquiry', state.enquiry);

        if(typeof validate() === 'undefined') {
            const baseUrl = process.env.BACKEND_BASE_URL; 

        try {
            const request : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/contact`,
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }            
            });
            setResponseState(request);
        } catch (error) {
            console.log(error)
        }

    }
      };


      const validateField = (name, value) => {
        const fieldObj = { [name]: value };
        const fieldSchema = { [name]: schema[name] };
        const { error } = Joi.validate(fieldObj, fieldSchema);
        const { message } = error?.details[0] || {};
        return error ? message : null;
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
      };







    return (
        <div className="contact-page">
            <ImageBanner imgURL="/assets/images/contact-us-banner.png" />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-8">
                        <form className="contact-us-form-wrapper" onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="title">Contact Form</h2>
                                </div>
                                <div className="col-md-6">
                                    <div className="common-input-field-wrapper">
                                        <label>First Name:</label>
                                        <input type="text" onChange={handleChange} name="first_name" value={state.first_name} />
                                        {errors && <small>{errors.first_name}</small>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="common-input-field-wrapper">
                                        <label>Last Name:</label>
                                        <input type="text" onChange={handleChange} name="last_name" value={state.last_name} />
                                        {errors && <small>{errors.last_name}</small>}
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="common-input-field-wrapper">
                                        <label>E-Mail Address:</label>
                                        <input type="text" onChange={handleChange} name="email" value={state.email} />
                                        {errors && <small>{errors.email}</small>}
                                    </div>
                                </div>
                                <div className="col-md-12 py-3">
                                    <div className="common-input-field-wrapper">
                                        <label>Enquiry:</label>
                                        <textarea name="enquiry" onChange={handleChange} cols={40} rows={4} style={{width: "99%"}}></textarea>
                                        {errors && <small>{errors.enquiry}</small>}
                                    </div>
                                </div>
                                <div className="col-md-12 pt-4">
                                    <div className="submit-input-field-wrapper">
                                        <div className="right">
                                            <input type="submit" value="Submit" className="button" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-2">
                    </div>
                    <div className="col-8 mt-3">
                    <div className="response-cont">
                        <h6>{responseState?.data?.message}</h6>
                    </div>
                    <div className="col-lg-2">
                    </div>
                    </div>
                </div>
                 
            </div>
        </div>
    )
}

export default Contact
