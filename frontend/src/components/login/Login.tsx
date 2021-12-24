import React, { useState } from 'react'
import Joi from "joi-browser";
import axios from 'axios';
import { useRouter } from 'next/router'




const initialDataState = { email: "", password: ""};


const initialResponseState: any = [];

const schema = {

    email: Joi.string().required(),
    password: Joi.string().required(),

};

const Login = () => { 

    const router = useRouter()

    const [dataState, setDataState] = useState(initialDataState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);


    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(dataState, schema, options);
        const errorsObj = {};
        if (!error) return ;
        for (let detail of error.details) {
          const { path, message } = detail;
          errorsObj[path[0]] = message;
        }
        return errorsObj;
      };
      

    //   const handleLogout = async (e) => {


    //     if (typeof window !== "undefined") sessionStorage.removeItem("token")


    //     try {
    //         const request : any = await axios({
    //         method: 'post',    
    //         url: 'http://localhost:4000/api/logout'
    //         });                                           
    //     } catch (error) {
    //         console.log(error)
    //     }

    //   }


      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate());

        let form = new FormData();

        form.append('email', dataState.email);
        form.append('password', dataState.password);


        if(typeof validate() === 'undefined') {

            try {
                const request : any = await axios({
                method: 'post',    
                url: 'http://localhost:4000/api/login',
                data: form,
                });
                setResponseState(request);
                console.log(request)
                if (typeof window !== "undefined") {
                    sessionStorage.setItem("token",request.data.response.token) 
                    sessionStorage.setItem("user", request.data.user )
                 } 
                router.push('/account')
                        
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




    return (
        <div className="login-page"> 
            <div className="container">
                <div className="row">
                    <div className="col-lg-1">
                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div className="new-user-register-account-wrapper">
                                    <h2 className="sec-title">New Customer</h2>
                                    <div className="content">
                                        <p className="sub-title">Register Account</p>
                                        <p className="description">By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.</p>
                                        <div className="submit-input-field-wrapper">
                                            <a href="/register" className="continue-btn button">Continue</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="common-account-form-wrapper-main">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-10">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                    <div className="response-cont">
                                                        <h6>{responseState?.data?.message}</h6> 
                                                    </div>
                                                        <h2 className="sec-title">Returning Customer</h2>
                                                        <p className="description">I am a returning customer</p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="common-input-field-wrapper">
                                                            <label>E-Mail Address:</label>
                                                            <input onChange={handleChange} type="text" name="email" value={dataState.email} />
                                                            {errors && <small>{errors.email}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="common-input-field-wrapper">
                                                            <label>Password:</label>
                                                            <input onChange={handleChange} type="password" name="password" value={dataState.password} />
                                                            {errors && <small>{errors.password}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="common-input-field-wrapper forgot-password-wrapper">
                                                            <a href="">Forgotten Password</a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="submit-input-field-wrapper">
                                                            <input type="submit" value="Login" className="button" />
                                                            <input type="hidden" name="redirect" value="" />
                                                        </div>
                                                    </div>

                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
