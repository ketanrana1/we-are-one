import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';
 

const initialState = { content: "" };

// const initialResponseState = { success: "", message: ""};

const initialResponseState: any = [];

const schema = {

    page_name: Joi.any(),
    content: Joi.string().required()
};

export default function AddTermsContent() { 

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

        form.append('page_name', "Terms and Conditions");
        form.append('content', state.content);


        if(typeof validate() === 'undefined') {

        try {
            const request : any = await axios({
            method: 'post',    
            url: 'http://localhost:4000/api/addContent/termsAndConditions/',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }            
            });
            setResponseState(request);
        } catch (error) {
            // console.log(error)
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
            <div className="admin-cmmn-frm addBook-form">
                <h3 className="mb-3">Add Terms and Conditions Content</h3>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6> 
                </div>
                <form className="mt-3" onSubmit={handleSubmit} encType="multipart/form-data">


                <div className="form-group">
                        <label >Description</label><br/>
                        <textarea className="form-control" rows={10} id="story" name="content" style={{width: "100%"}} onChange={handleChange} value={state.content}> </textarea>
                        {errors && <small>{errors.content}</small>}
                    </div>
                
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div> 
                                       
                </form>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6>
                </div>               
            </div>
    )
}

AddTermsContent.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
