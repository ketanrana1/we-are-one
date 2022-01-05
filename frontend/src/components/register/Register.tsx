import React, { useState } from 'react'
import Joi from "joi-browser"
import axios from 'axios';
import InputField from "./InputField"
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const initialDataState = { firstName: "", lastName: "", email: "", password: "" };
const initialResponseState: any = [];

const baseUrl = process.env.BACKEND_BASE_URL; 

const schema = {

    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()

};

const Register = () => {

    const [dataState, setDataState] = useState(initialDataState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(dataState, schema, options);
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

        form.append('firstName', dataState.firstName);
        form.append('lastName', dataState.lastName);
        form.append('email', dataState.email);
        form.append('password', dataState.password);

        if(typeof validate() === 'undefined') {
            try {
                const request : any = await axios({ 
                method: 'post',    
                url: `${publicRuntimeConfig.backendBaseUrl}api/register`,
                data: form,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                });

                setResponseState(request);
                // console.log(request);
    
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
        setDataState({ ...dataState, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
      };

    //   console.log("STATE", dataState);


    return (
        <div className="register-page p-5">
            <div className="container wao-common-vertical-pad">
            
                <div className="row">
                
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    <div className="response-cont">
                <h6>{responseState?.data?.message}</h6> 
            </div>
                        <div className="common-account-form-wrapper-main">
                            <h1 className="sec-title">Register Account</h1>
                            <p className="description">If you already have an account with us, please login at the <a href="/login">login page</a>.</p>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2 className="sec-sub-title">Your Personal Details</h2>
                                        </div>
                                        <InputField 
                                            required="*"
                                            label="First Name" 
                                            type="text" 
                                            name="firstName"
                                            onChange={handleChange}
                                            value={dataState.firstName}
                                            error={errors && <small>{errors.firstName}</small>}
                                        />
                                        
                                        <InputField 
                                            required="*"
                                            label="Last Name" 
                                            type="text" 
                                            name="lastName"
                                            onChange={handleChange}
                                            value={dataState.lastName}
                                            error={errors && <small>{errors.lastName}</small>}
                                        />
                                        <InputField 
                                            required="*"
                                            label="E-Mail" 
                                            type="text" 
                                            name="email"
                                            onChange={handleChange}
                                            value={dataState.email}
                                            error={errors && <small>{errors.email}</small>} 
                                        />
                                        <InputField 
                                            required="*"
                                            label="Password" 
                                            type="password" 
                                            name="password"onChange={handleChange}
                                            value={dataState.password}
                                            error={errors && <small>{errors.password}</small>} 
                                        />
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="submit-input-field-wrapper mt-4">
                                        <input type="submit" value="Continue" className="button" />
                                    </div>
                                </div>
                            </div>
                        </form>
                       <div className="response-cont pt-3">
                            <h6>{responseState?.data?.message}</h6> 
                        </div> 
                    </div>
                    <div className="col-md-3"></div>
                </div>     
    </div>
        </div>
    )
}

export default Register
