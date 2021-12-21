import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';


const initialState = { puzzle_image_file: "", puzzle_image:"", paid_status: "", type:"", pp_one_image_file: {}, pp_one_image: "", pp_one_mode: "", pp_one_direction: "", pp_one_sort_order: "",
pp_two_image_file: {}, pp_two_image: "", pp_two_mode: "", pp_two_direction: "", pp_two_sort_order: "",
pp_three_image_file: {}, pp_three_image: "", pp_three_mode: "", pp_three_direction: "", pp_three_sort_order: "",
pp_four_image_file: {}, pp_four_image: "", pp_four_mode: "", pp_four_direction: "", pp_four_sort_order: "" };

const initialResponseState: any = [];

const schema = {

    puzzle_image_file: Joi.any(),
    puzzle_image: Joi.any(),
    paid_status: Joi.string().required(),
    type: Joi.string().required(),
    pp_one_image_file: Joi.any(),
    pp_one_image: Joi.any(),
    pp_one_mode: Joi.any(),
    pp_one_direction: Joi.any(),
    pp_one_sort_order: Joi.any(),
    pp_two_image_file: Joi.any(),
    pp_two_image: Joi.any(),
    pp_two_mode: Joi.any(),
    pp_two_direction: Joi.any(),
    pp_two_sort_order: Joi.any(),
    pp_three_image_file: Joi.any(),
    pp_three_image: Joi.any(),
    pp_three_mode: Joi.any(),
    pp_three_direction: Joi.any(),
    pp_three_sort_order: Joi.any(),
    pp_four_image_file: Joi.any(),
    pp_four_image: Joi.any(),
    pp_four_mode: Joi.any(),
    pp_four_direction: Joi.any(),
    pp_four_sort_order: Joi.any(),
    
};
 
export default function AddFourTypePuzzle() { 

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);


    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
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

        
        form.append('puzzle_image_file', file);
        form.append('puzzle_image', fileName);
        form.append('paid_status', state.paid_status);
        form.append('type', state.type);
        form.append('pp_one_image_file', file);
        form.append('pp_one_image_file', fileName);
        form.append('pp_one_mode', state.pp_one_mode);
        form.append('pp_one_direction', state.pp_one_direction);
        form.append('pp_one_sort_order', state.pp_one_sort_order)





        if(typeof validate() === 'undefined') {
            try {
                    const request : any = await axios({
                    method: 'post',    
                    url: 'http://localhost:4000/api/addTypeFourPuzzle',
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

      console.log("STATE", state)

      function handlePuzzleType(e) {

        state.type = e.target.value;

      }

      function handlePaidStatus(e) {
          state.paid_status = e.target.value;
      }

      function handlePpOneMode(e) {
        state.pp_one_mode = e.target.value;
    }


    return (
            <div className="admin-cmmn-frm addBook-form">
                <h3 className="mb-3">Add Puzzle with Four Parts</h3>
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

                    

                    



                    {/* <div className="form-group">
                        <label >Name</label>
                        <input name="name" type="text" className="form-control" onChange={handleChange} value={state.name} />
                        {errors && <small>{errors.name}</small>}
                    </div>
                    <div className="form-group">
                        <label >Type</label>
                        <input name="type" type="text" className="form-control" onChange={handleChange} value={state.type} />
                        {errors && <small>{errors.type}</small>}
                    </div>            
                    <div className="form-group">
                        <label>Puzzle Images</label>
                        <input name="puzzleImages" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFile} multiple />
                        {errors && <small>{errors.puzzleImages}</small>}
                    </div> */}

                    <div className="each-image p-3 border my-5">
                        <h5>Puzzle Part One</h5>
                        <div className="form-group">
                            <label >Image</label>
                            <input name="pp_one_image" type="file" className="form-control-file" onChange={saveFile} />
                            {errors && <small>{errors.pp_one_image}</small>}
                        </div>
                        <div className="form-group">
                            <label >Mode</label><br/>
                            <select onChange={handlePpOneMode}>
                                <option hidden>Select</option>
                                <option value="Potrait">Potrait</option>
                                <option value="Landscape">Landscape</option>
                            </select><br/>
                            {errors && <small>{errors.pp_one_mode}</small>}
                        </div>
                        <div className="form-group">
                            <label>Direction</label>
                            <input name="pp_one_direction" type="text" className="form-control" onChange={handleChange} value={state.pp_one_direction}/>
                            {errors && <small>{errors.book_download}</small>}
                        </div>
                        <div className="form-group">
                            <label>Sort Order</label>
                            <input name="pp_one_sort_order" type="text" className="form-control" onChange={handleChange} value={state.pp_one_sort_order}/>
                            {errors && <small>{errors.book_download}</small>}
                        </div>
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

AddFourTypePuzzle.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
