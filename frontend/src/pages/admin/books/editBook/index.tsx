import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';
const baseUrl = process.env.BASE_URL;

export async function getServerSideProps(context) {

    let res: any;
    const { id } = context.query;

    try { 
     res = await axios.get(`${baseUrl}/api/books/singleBook/?id=${id}`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          singleBook : res.data.singleBook,
          ID : id
      }, 
    }
  }




const initialResponseState: any = [];

const schema = {

    book_name: Joi.string().required(),
    slug: Joi.string().required(),
    book_description: Joi.string().required(),
    book_price: Joi.number().required(),
    book_status: Joi.number().required(),
    book_content: Joi.string().required(),
    book_image: Joi.any(),
    book_image_name: Joi.any(),
    book_download: Joi.string().required(),
    book_quantity: Joi.number().required()

};

export default function AddBook(props) { 

    const { singleBook, ID } = props

    const initialState = { book_name: singleBook[0].book_name, slug: singleBook[0].slug, book_description: singleBook[0].book_description, book_price: singleBook[0].book_price, book_status: singleBook[0].book_status, book_content: singleBook[0].book_content, book_image: {}, book_image_name: singleBook[0].book_image_name, book_download: singleBook[0].book_download, book_quantity: singleBook[0].book_quantity };


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

        form.append('book_name', state.book_name);
        form.append('slug', state.slug);
        form.append('book_description', state.book_description);
        form.append('book_price', state.book_price);
        form.append('book_status', state.book_status);
        form.append('book_content', state.book_content);
        // @ts-ignore
        form.append('book_image', file);
        form.append('book_image_name',fileName)
        form.append('book_download', state.book_download);
        form.append('book_quantity', state.book_quantity);

        if(typeof validate() === 'undefined') {

        try {
            const request : any = await axios({
            method: 'post',    
            url: `http://localhost:4000/api/books/editBook/?id=${ID}`,
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

    return (
            <div className="admin-cmmn-frm addBook-form">
                <h3 className="mb-3">Edit Book</h3>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6> 
                </div>
                <form className="mt-3" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label >Book Name</label>
                        <input name="book_name" type="text" className="form-control" onChange={handleChange} value={state.book_name} />
                        {errors && <small>{errors.book_name}</small>}
                    </div>
                    <div className="form-group">
                        <label >Slug</label>
                        <input name="slug" type="text" className="form-control" onChange={handleChange} value={state.slug} />
                        {errors && <small>{errors.slug}</small>}
                    </div>
                    <div className="form-group">
                        <label >Book Description</label>
                        <textarea name="book_description" className="form-control" rows={8} onChange={handleChange} value={state.book_description} />
                        {errors && <small>{errors.book_description}</small>}
                    </div>
                    <div className="form-group">
                        <label >Book Price</label> 
                        <input name="book_price" type="number" className="form-control" onChange={handleChange} value={state.book_price}/>
                        {errors && <small>{errors.book_price}</small>}
                    </div>
                    <div className="form-group">
                        <label >Book Status</label>
                        <input name="book_status" type="number" className="form-control" onChange={handleChange} value={state.book_status} />
                        {errors && <small>{errors.book_status}</small>}
                    </div>
                    <div className="form-group">
                        <label >Book Content</label>
                        <input name="book_content" type="text" className="form-control" onChange={handleChange} value={state.book_content} />
                        {errors && <small>{errors.book_content}</small>}
                    </div>
                    {/* <div className="form-group">
                        <label >Book Image</label>
                        <input name="book_image" type="text" className="form-control" onChange={handleChange} value={state.book_image} />
                        {errors && <small>{errors.book_image}</small>}
                    </div> */}
                    <div className="form-group">
                        Current Image <br/>
                        <img src={ state.book_image_name } style={{ maxWidth: "200px"}} />
                    </div>

                    <div className="form-group">
                        <label>Update Book Image</label>
                        <input name="book_image" type="file" className="form-control-file" id="exampleFormControlFile1" onChange={saveFile} />
                        {errors && <small>{errors.book_image}</small>}
                    </div>
                    <div className="form-group">
                        <label>Book Download</label>
                        <input name="book_download" type="text" className="form-control" onChange={handleChange} value={state.book_download}/>
                        {errors && <small>{errors.book_download}</small>}
                    </div>
                    <div className="form-group">
                        <label>Book Quantity</label>
                        <input name="book_quantity" type="number" className="form-control" onChange={handleChange} value={state.book_quantity} />
                        {errors && <small>{errors.book_quantity}</small>}
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

AddBook.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
