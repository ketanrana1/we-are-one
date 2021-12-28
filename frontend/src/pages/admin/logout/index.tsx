import React from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import axios from 'axios';
import { useRouter } from 'next/router'

const baseUrl = process.env.BACKEND_BASE_URL; 

export default function Account() {

    const router = useRouter()
    const handleLogout = async (e) => {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("token") 
            sessionStorage.removeItem("role")
        }
        
        try {
            const request : any = await axios({
            method: 'post',    
            url: `${baseUrl}api/admin-logout`
            });                                           
        } catch (error) {
            console.log(error)
        }
        router.push('/admin/login')
      }

    return (
        <>
            <div className="container p-md-5">
                <button className="mt-3" onClick={handleLogout}>Logout</button>
            </div>        
        </>       
    )
}


Account.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}  
