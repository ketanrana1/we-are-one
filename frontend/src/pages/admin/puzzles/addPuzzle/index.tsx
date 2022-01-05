import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig() 


const initialState = { puzzle_image_file: "", puzzle_image:"", paid_status: "", puzzle_parts: "" };



const initialResponseState: any = [];

const schema = {

    puzzle_image_file: Joi.any(),
    puzzle_image: Joi.any(),
    paid_status: Joi.string().required(),
    puzzle_parts: Joi.any(),
};
 
export default function AddPuzzle() { 

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);


    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

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

        
        form.append('puzzle_image_file', file);
        form.append('puzzle_image', fileName);
        form.append('paid_status', state.paid_status);
  
        if(typeof validate() === 'undefined') {

        try {
            const request : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/addPuzzle`,
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

      function handlePaidStatus(e) {
          state.paid_status = e.target.value;

      }


    return (
            <div className="admin-cmmn-frm addBook-form">
                <h3 className="mb-3">Add New Puzzle</h3>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6> 
                </div>
                <form className="mt-3" onSubmit={handleSubmit} encType="multipart/form-data">
                    

                    <div className="form-group">
                        <label >Puzzle Image</label>
                        <input name="puzzle_image_file" type="file" className="form-control-file" onChange={saveFile} />
                        {errors && <small>{errors.puzzle_image_file}</small>}
                    </div>
                    <div className="form-group">
                        <label >Paid or Free</label><br/>
                        <select onChange={handlePaidStatus}>
                            <option hidden>Select</option>
                            <option value="Paid">Paid</option>
                            <option value="Free">Free</option>
                        </select><br/>
                        {errors && <small>{errors.paid_status}</small>}
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

AddPuzzle.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
