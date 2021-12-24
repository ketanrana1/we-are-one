import React, { useState, useEffect} from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import { useRouter } from 'next/router';
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const initialResponseState: any = [];

export default function AllContacts(props) {
  
    const router = useRouter();
    const { AllContacts } = props;

    const [responseState, setResponseState] = useState(initialResponseState);

    return (      
        <div className="all-books-cont">
            <h3 className="mb-3">All Contacts</h3>
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6>  
            </div>
            <div className="row py-3">
                {AllContacts.map( (data:any, index) => {                       
                    return (
                        <div className="col-12 each-book" key={index}>
                            <h6>{data.book_name}</h6>
                            <div className="d-flex">
                                <p className="link-items">
                                    <ul className="each-contact-entry-item">
                                        <li><strong>First Name:</strong> { data.first_name }</li>
                                        <li><strong>Last Name:</strong> { data.last_name }</li>
                                        <li><strong>Email:</strong> { data.email }</li>
                                        <li><strong>Enquiry:</strong> { data.enquiry }</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    );
                })} 
            </div> 
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6> 
            </div>           
        </div>
    )
} 


export async function getServerSideProps(context) {

    const baseUrl = process.env.BACKEND_BASE_URL;
    let res: any;

    try { 
     res = await axios.get(`${baseUrl}api/allContacts`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          AllContacts : res.data.response
      }, 
    }
  }
  

AllContacts.getLayout = function getLayout(page: any) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
