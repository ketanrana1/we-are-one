import React from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import adminLogin from 'services/adminLogin'

export default function Admin (){
    return (
        <div>
            <h1>Dashboard</h1>  
        </div>
    )
}

Admin.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }  