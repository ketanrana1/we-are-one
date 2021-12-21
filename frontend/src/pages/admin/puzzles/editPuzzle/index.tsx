import React from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'

export default function EditPuzzle() {
    return (
      <div className="admin-cmmn-frm addBook-form">
      <h3 className="mb-4">Edit Puzzle</h3>
      <form>

          <div className="custom-file mt-3 mb-4">
              <input type="file" className="custom-file-input" id="validatedCustomFile" />
              <label className="custom-file-label" >Choose Puzzle Image</label>
          </div>
          <div className="form-group">
              <label>Paid Status</label>
              <input type="text" className="form-control" />
          </div>
          <div className="form-group">
              <label>Type</label>
              <input type="text" className="form-control" />
          </div>
          <div className="form-group">
              <label >URLs for puzzles with four pieces</label>
              <textarea className="form-control" rows={8} />
          </div>
          <div className="form-group">
              <label >URLs for puzzles with eight pieces</label>
              <textarea className="form-control" rows={8} />
          </div>
          <div className="form-group">
              <label >URLs for puzzles with sixteen pieces</label>
              <textarea className="form-control" rows={8} />
          </div>
          <div className="form-group">
              <label >URLs for puzzles with thirty two pieces</label>
              <textarea className="form-control" rows={8} />
          </div>
          <div className="form-group">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>             
          </form>

      
        </div>
    )
}



EditPuzzle.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }