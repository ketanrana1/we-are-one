import React from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'

export default function EditCard() {
    return (
             <div className="admin-cmmn-frm addBook-form">
                <h3 className="mb-4">Edit Card</h3>
                 <form>

                    <div className="custom-file mt-3 mb-4">
                        <input type="file" className="custom-file-input" id="validatedCustomFile" />
                        <label className="custom-file-label" >Choose Card Image</label>
                    </div>
                    <div className="form-group">
                        <label >Card Content</label>
                        <textarea className="form-control" rows={8} />
                    </div>
                    <div className="custom-file mt-3 mb-4">
                        <input type="file" className="custom-file-input" id="validatedCustomFile" />
                        <label className="custom-file-label" >Choose Card Video</label>
                    </div>
                    <div className="form-group">
                        <label >Card Type</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label >Card Mode</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label >Card Status</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>              
                    </form>
                  </div>
    )
}


EditCard.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
