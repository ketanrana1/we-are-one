import React, { useState, useEffect } from 'react'
import LayoutNew from 'components/common/LayoutNew';
import axios from 'axios';
import { useRouter } from 'next/router'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import userLogin from 'services/userLogin';

const baseUrl = process.env.BACKEND_BASE_URL; 

export default function Account(props) {

    const router = useRouter()   
    const handleLogout = async (e) => {

        if (typeof window !== "undefined") {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem('firstName')
            sessionStorage.removeItem('lastName')
            sessionStorage.removeItem('userId') 
            sessionStorage.removeItem('email')  
        }
        
        try {
            const request : any = await axios({
            method: 'post',    
            url: `${baseUrl}api/logout`
            });
                                                     
        } catch (error) {
            console.log(error)
        }
        router.push('/login')
      }

      

    if(!userLogin() && typeof window !== "undefined") router.push('/login')

      const firstName = sessionStorage.getItem("firstName");
      const lastName = sessionStorage.getItem("lastName");
      const email = sessionStorage.getItem("email");
      const userId = sessionStorage.getItem("userId");


    const [response, setResponse] = useState([])

    const API = async () => {
        const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/account?id=${userId}`); 
        setResponse(data.allOrderDetails)

    }

    useEffect(() => {     
        API(); 
    },[]);


    return (
        <>
            <div className="container p-md-5">
                <h2 style={{textAlign: "center"}}>You are successfully Logged in.</h2>
                <ul className="account-user-details pt-md-3">
                    <li><strong>Name: </strong>{firstName} {lastName}</li>
                    <li><strong>Email: </strong>{email}</li>
                </ul>
                <hr />
                <div className="all-orders"> 
                <h2 className="pt-5">All Orders</h2>
                {
                    response?.map( (data:any, index) => {                       
                        return (
                            <div className="card my-5">
                            
                            <div className="col-12 card-body">
                                <ul className="account-user-details order-details">
                                    <li><strong>Order ID: </strong>{data.orderId}</li>
                                    <li><strong>Amount Paid: $</strong>{data.total_amount}</li>
                                    <li><strong>Shipping Cost: $</strong>{data.shipping_cost}</li>
                                    <li> <strong>Products Ordered:</strong>

                                    {
                                    data.ordered_items.map( (datas:any, index) => { 
                                     return  (
                                         <ul> 
                                         <li>{datas.product_name}</li>
                                         </ul>
                                     )
                                     })  }
                                     </li>
                                </ul>
                                
                            </div>
                            </div>
                        );
                    })
                }
                </div>
                <button className="common-button mt-3" onClick={handleLogout}>Logout</button>
            </div>        
        </>       
    )
}


Account.getLayout = function getLayout(page) {
    return (
        <LayoutNew>
            {page}
        </LayoutNew>
    )
}  
