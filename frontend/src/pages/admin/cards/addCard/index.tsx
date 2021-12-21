import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
const axios = require('axios');

const initialState = { card_image_file: {}, card_content: "", card_image: "", type: "", cardType: "", mode: "", status: "", video_file: "", file_video: {} };


const initialResponseState: any = [];

const schema = {

    card_image_file: Joi.any(),
    card_image: Joi.any(),
    file_video: Joi.any(),
    video_file: Joi.any(),
    card_content: Joi.string().required(),
    type: Joi.string().required(),
    // cardType: Joi.string().required(),
    mode: Joi.string().required(),
    status: Joi.string().required(),
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

        form.append('card_image_file', file);
        form.append('card_image',fileName);
        form.append('file_video', videoFile);
        form.append('video_file',videoFileName);
        form.append('card_content', state.card_content);
        form.append('type', state.type);
        // form.append('cardType', state.cardType);
        form.append('mode', state.mode);
        form.append('status', state.status);

        // if(typeof validate() === 'undefined') {

        try {
            const request : any = await axios({
            method: 'post',    
            url: 'http://localhost:4000/api/card/addCard',
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

      function handleType(e) {

        state.type = e.target.value;

      }

      // function handleCardType(e) {
      //   state.cardType = e.target.value;

      // }


    return (
      <div className="admin-cmmn-frm addBook-form">
      <h3 className="mb-4">Add New Card</h3>
      <div className="response-cont">
          <h6>{responseState?.data?.message}</h6> 
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="form-group">
            <label>Card Image</label>
            <input name="card_image_file" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFile} />
            {errors && <small>{errors.card_image_name}</small>}
        </div>
        <div className="form-group">
            <label>Video File</label>
            <input name="file_video" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveVideoFile} />
            {errors && <small>{errors.videoFile}</small>}
        </div>
          <div className="form-group">
              <label >Card Content</label>
              <textarea name="card_content" className="form-control" rows={8} onChange={handleChange} value={state.card_content} />
              {errors && <small>{errors.card_content}</small>}
          </div>
          <div className="form-group">
              <label >Paid or Free</label><br/>
              <select onChange={handleType}>
                  <option hidden>Select</option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
              </select><br/>
              {errors && <small>{errors.type}</small>}
          </div>

          <div className="form-group">
              <label >Card Mode</label>
              <input name="mode" type="text" className="form-control" onChange={handleChange} value={state.mode} />
              {errors && <small>{errors.mode}</small>}
          </div>
          <div className="form-group">
              <label >Card Status</label>
              <input name="status" type="text" className="form-control" onChange={handleChange} value={state.status} />
              {errors && <small>{errors.status}</small>}
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