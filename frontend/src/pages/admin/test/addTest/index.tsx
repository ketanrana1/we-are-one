import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
const axios = require('axios');

const initialState = { image: {}, image_name: "", video: {}, video_name: "", test: "", test_two: "" };


const initialResponseState: any = [];

const schema = {

  test: Joi.string().required(),
  test_two: Joi.string().required(),
  image: Joi.any(),
  image_name: Joi.any(),
  video: Joi.any(),
  video_name: Joi.any(),
    

};

export default function AddCard() {

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);


    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    };

    const [videoFile, setVideoFile] = useState();
    const [videoFileName, setVideoFileName] = useState("");

    const saveVideoFile = (e) => {
      setVideoFile(e.target.files[0]);
      setVideoFileName(e.target.files[0].name);
    };


    //RESPONSE  

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

        form.append('image', file);
        form.append('image_name', fileName)

        form.append('video', videoFile);
        form.append('video_name',videoFileName);
        form.append('test', state.test);
        form.append('test_two', state.test_two);


        // if(typeof validate() === 'undefined') {

        try {
            const request : any = await axios({
            method: 'post',    
            url: 'http://localhost:4000/api/addTest',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            
            });
            setResponseState(request); 
        } catch (error) {
            console.log(error)
        }
      // }
      };

      const validateField = (name: string | number, value: any) => {
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

      console.log("STATE", state); 

    return (
      <div className="admin-cmmn-frm addBook-form">
      <h3 className="mb-4">Add New test</h3>
      <div className="response-cont">
          <h6>{responseState?.data?.message}</h6> 
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
            <label>Image</label>
            <input name="image" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFile} />
            {errors && <small>{errors.image}</small>}
        </div>
        <div className="form-group">
            <label>Video</label>
            <input name="video" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveVideoFile} />
            {errors && <small>{errors.video}</small>}
        </div>

        <div className="form-group">
            <label>Test Input</label>
            <input name="test" type="text" className="form-control" id="exampleFormControlFile1" onChange={handleChange} value={state.test}/>
            {errors && <small>{errors.test}</small>}
        </div>

        <div className="form-group">
            <label>Test Input Two</label>
            <input name="test_two" type="text" className="form-control" id="exampleFormControlFile1" onChange={handleChange} value={state.test_two}/>
            {errors && <small>{errors.test_two}</small>}
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



AddCard.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
        {page}
      </AdminLayout>
    )
  }