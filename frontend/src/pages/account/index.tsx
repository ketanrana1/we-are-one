import React from 'react'
import Index from '../../components/about/Index';
import LayoutNew from 'components/common/LayoutNew';
import axios from 'axios';
import { useRouter } from 'next/router'




export default function Account() {


    const router = useRouter()


    const handleLogout = async (e) => {


        if (typeof window !== "undefined") sessionStorage.removeItem("token")


        try {
            const request : any = await axios({
            method: 'post',    
            url: 'http://localhost:4000/api/logout'
            });                                           
        } catch (error) {
            console.log(error)
        }

        router.push('/login')

      }



    return (
        <>

<div className="p-md-5">
            You are Logged in.
        </div>

<button onClick={handleLogout}>Logout</button>
        
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
