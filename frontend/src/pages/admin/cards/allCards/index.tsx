import React, { useState, useEffect} from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import { useRouter } from 'next/router';
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()   

const initialResponseState: any = [];

export default function AllCards(props) {
    const router = useRouter(); 
    const { AllCards } = props

    const [responseState, setResponseState] = useState(initialResponseState);

    async function handleDeleteClick(id: any) {

        try { 


        // const response = await axios.post(`${publicRuntimeConfig.backendBaseUrl}api/card/delete/${id}`);
        // setResponseState(response);
        // return router.push(router.asPath)

        const response : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/card/delete/${id}`,
            headers: {
                'Authorization': `${sessionStorage.getItem('token')}`
            }            
            });

            setResponseState(response);
            return router.push(router.asPath) 


        } catch (error) {
            console.log(error);
        }

    }


    return (      
        <div className="all-books-cont">
            <h3 className="mb-3">All Cards</h3>
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6>  
            </div>
            <div className="row py-3">
                {AllCards.map( (data:any, index) => {                       
                    return (
                        <div className="col-12 each-book" key={index}>
                            <h6>{data.video_file}</h6>
                            <div className="d-flex">
                                <p className="link-items">
                                    <span className="link-item-red"><a onClick={() => handleDeleteClick(data.id)}>Delete</a></span>
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
    let res: any;

    try { 
     res = await axios.get(`${process.env.BACKEND_BASE_URL}api/card/allCards`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          AllCards : res.data.Cards
      }, 
    }
  }
  

AllCards.getLayout = function getLayout(page: any) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }

