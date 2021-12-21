import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';
const baseUrl = process.env.BASE_URL;

export async function getServerSideProps(context) {

    let res: any;
    const { id } = context.query;

    try { 
     res = await axios.get(`${baseUrl}/api/artprints/singleArtprint/?id=${id}`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          singleArtprint: res.data.singleArtprint,
          ID : id
      }, 
    }
  }
 




const initialResponseState: any = [];

const schema = {

    art_name: Joi.string().required(),
    art_description: Joi.string().required(),
    art_image_1: Joi.any(),
    art_image_2: Joi.any(),
    art_image_3: Joi.any(),
    art_image_4: Joi.any(),
    art_image_1_name: Joi.any(),
    art_image_2_name: Joi.any(),
    art_image_3_name: Joi.any(),
    art_image_4_name: Joi.any(),
    size_small_price: Joi.number().required(),
    size_large_price: Joi.number().required(),
    size_xlarge_price: Joi.number().required()

};

export default function AddArtprint(props) { 

    const { singleArtprint, ID } = props

    const initialState = { art_name: singleArtprint[0].art_name, art_description: singleArtprint[0].art_description, art_image_1: "", art_image_2: "", art_image_3: "", art_image_4: "", art_image_1_name: singleArtprint[0].art_image_1_name, art_image_2_name: singleArtprint[0].art_image_2_name, art_image_3_name: singleArtprint[0].art_image_3_name, art_image_4_name: singleArtprint[0].art_image_4_name, size_small_price: singleArtprint[0].size_small_price, size_large_price: singleArtprint[0].size_large_price, size_xlarge_price: singleArtprint[0].size_xlarge_price};

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);


    const [fileOne, setFileOne] = useState();
    const [fileOneName, setFileOneName] = useState("");

    const saveFileOne = (e) => {
    setFileOne(e.target.files[0]);
    setFileOneName(e.target.files[0].name);
    };

    const [fileTwo, setFileTwo] = useState();
    const [fileTwoName, setFileTwoName] = useState("");
 
    const saveFileTwo = (e) => {
    setFileTwo(e.target.files[0]);
    setFileTwoName(e.target.files[0].name);
    };

    const [fileThree, setFileThree] = useState();
    const [fileThreeName, setFileThreeName] = useState("");
 
    const saveFileThree = (e) => {
    setFileThree(e.target.files[0]);
    setFileThreeName(e.target.files[0].name);
    };

    const [fileFour, setFileFour] = useState();
    const [fileFourName, setFileFourName] = useState("");
 
    const saveFileFour = (e) => {
    setFileFour(e.target.files[0]);
    setFileFourName(e.target.files[0].name);
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

        form.append('art_name', state.art_name);
        form.append('art_description', state.art_description);
        form.append('size_small_price', state.size_small_price);
        form.append('size_large_price', state.size_small_price);
        form.append('size_xlarge_price', state.size_small_price);

        form.append('art_image_1', fileOne);
        form.append('art_image_1_name',fileOneName);
        form.append('art_image_2', fileTwo);
        form.append('art_image_2_name',fileTwoName);
        form.append('art_image_3', fileThree);
        form.append('art_image_3_name',fileThreeName);
        form.append('art_image_4', fileFour);
        form.append('art_image_4_name',fileFourName);


        if(typeof validate() === 'undefined') {

        try {
            const request : any = await axios({
            method: 'post',    
            url: 'http://localhost:4000/api/artprints/addArtprint',
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


    return (
            <div className="admin-cmmn-frm addBook-form">
                <h3 className="mb-3">Edit ArtPrint</h3>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6> 
                </div>
                <form className="mt-3" onSubmit={handleSubmit} encType="multipart/form-data">

                    <div className="form-group">
                        <label >Art Name</label>
                        <input name="art_name" type="text" className="form-control" onChange={handleChange} value={state.art_name} />
                        {errors && <small>{errors.art_name}</small>}
                    </div>

                    <div className="form-group">
                        Current Image One<br/>
                        <img src={ state.art_image_1_name } style={{ maxWidth: "200px"}} />
                    </div>



                   

                    

                    <div className="form-group">
                        <label>Update ArtPrint Image One</label>
                        <input name="art_image_1" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFileOne} />
                        {errors && <small>{errors.art_image_1}</small>}
                    </div>

                    <div className="form-group">
                        Current Image Two<br/>
                        <img src={ state.art_image_2_name } style={{ maxWidth: "200px"}} />
                    </div>


                    <div className="form-group">
                        <label>Update ArtPrint Image Two</label>
                        <input name="art_image_1" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFileTwo} />
                        {errors && <small>{errors.art_image_1}</small>}
                    </div>

                    <div className="form-group">
                        Current Image Three<br/>
                        <img src={ state.art_image_3_name } style={{ maxWidth: "200px"}} />
                    </div>


                    <div className="form-group">
                        <label>Update ArtPrint Image Three</label>
                        <input name="art_image_1" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFileThree} />
                        {errors && <small>{errors.art_image_1}</small>}
                    </div>

                    <div className="form-group">
                        Current Image Four<br/>
                        <img src={ state.art_image_4_name } style={{ maxWidth: "200px"}} />
                    </div>
                    <div className="form-group">
                        <label>Update ArtPrint Image Four</label>
                        <input name="art_image_1" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFileFour} />
                        {errors && <small>{errors.art_image_1}</small>}
                    </div>

                    <div className="form-group">
                        <label >Price for size Small</label> 
                        <input name="size_small_price" type="number" className="form-control" onChange={handleChange} value={state.size_small_price}/>
                        {errors && <small>{errors.size_small_price}</small>}
                    </div>
                    <div className="form-group">
                        <label >Price for size Large</label> 
                        <input name="size_large_price" type="number" className="form-control" onChange={handleChange} value={state.size_large_price}/>
                        {errors && <small>{errors.size_large_price}</small>}
                    </div>
                    <div className="form-group">
                        <label >Price for size Xlarge</label> 
                        <input name="size_xlarge_price" type="number" className="form-control" onChange={handleChange} value={state.size_xlarge_price}/>
                        {errors && <small>{errors.size_xlarge_price}</small>}
                    </div>



                    <div className="form-group">
                        <label >Content</label><br/>
                        <textarea className="form-control" rows={10} id="story" name="art_description" style={{width: "100%"}} onChange={handleChange} value={state.art_description}> </textarea>
                        {errors && <small>{errors.art_description}</small>}
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

AddArtprint.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
