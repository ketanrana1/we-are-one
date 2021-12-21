import React, { useState} from 'react'
import LoginLayout from 'components/admin/LoginLayout'
import Joi from "joi-browser";
import axios from 'axios';

const initialDataState = { email: "", password: ""};


const initialResponseState: any = [];

const schema = {

    email: Joi.string().required(),
    password: Joi.string().required(),

};




export default function Login() {

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
      


      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate());

        if(typeof validate() === 'undefined') {

            try {
                const request : any = await axios({
                method: 'post',    
                url: 'http://localhost:4000/api/login',
                data: dataState,
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
        setDataState({ ...dataState, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
      };

      console.log("STATE", dataState)


    return (
        <div className="login-form-cont px-5 pb-5 pt-3">
            
            <form className="form-signin" onSubmit={handleSubmit}>


                <h1 className="h2 mb-3 font-weight-normal text-center"><b>Log in</b></h1>
                <div className="response-cont py-2">
                    <h6>{responseState?.data?.message}</h6> 
                </div>
                <input type="email" id="inputEmail" name="email" className="form-control my-3" placeholder="Email address" onChange={handleChange} value={dataState.email} autoFocus />
                {errors && <small>{errors.email}</small>}

                <input type="password" id="inputPassword" name="password" className="form-control  my-3" placeholder="Password" onChange={handleChange} value={dataState.password} />
                {errors && <small>{errors.password}</small>}

                <button className="btn btn-lg btn-primary btn-block my-3" type="submit">Log in</button>
            </form>
        </div>
    )
}


Login.getLayout = function getLayout(page) {
    return (
      <LoginLayout>
            {page}
      </LoginLayout>
    )
  }