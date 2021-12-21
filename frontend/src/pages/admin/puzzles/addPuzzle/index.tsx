import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';


const initialState = { puzzle_image_file: "", puzzle_image:"", paid_status: "", type:"", puzzle_parts: "" };

// const initialResponseState = { success: "", message: ""};

const initialResponseState: any = [];

const schema = {

    puzzle_image_file: Joi.any(),
    puzzle_image: Joi.any(),
    paid_status: Joi.string().required(),
    type: Joi.string().required(),
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
        //@ts-ignore
        // form.append('puzzle_parts', new_puzzle_parts);

        
        // for (var x = 0; x < new_puzzle_parts.length; x++) {
        //     form.append('puzzle_parts[]', new_puzzle_parts[x].image);
        //     form.append('puzzle_parts[]', new_puzzle_parts[x].mode);
        //     form.append('puzzle_parts[]', new_puzzle_parts[x].direction);
        //     form.append('puzzle_parts[]', new_puzzle_parts[x].image);
        // }


        if(typeof validate() === 'undefined') {

        try {
            const request : any = await axios({
            method: 'post',    
            url: 'http://localhost:4000/api/addPuzzle',
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
                        <label >Type</label><br/>
                        <select onChange={handlePuzzleType}>
                            <option hidden>Select</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                        </select><br/>
                        {errors && <small>{errors.type}</small>}
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
