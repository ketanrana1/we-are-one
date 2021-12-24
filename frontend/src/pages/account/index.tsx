import React from 'react'
import Index from '../../components/about/Index';
import LayoutNew from 'components/common/LayoutNew';
import axios from 'axios';
import { useRouter } from 'next/router'

const baseUrl = process.env.BACKEND_BASE_URL; 

export default function Account() {

    const router = useRouter()
    const handleLogout = async (e) => {
        if (typeof window !== "undefined") sessionStorage.removeItem("token")
        
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

    return (
        <>
            <div className="container p-md-5">
                <h2 style={{textAlign: "center"}}>You are successfully Logged in.</h2>
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
