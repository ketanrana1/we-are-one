import React from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'

export default function AllPuzzles() {
    return (
        <div>

        <div className="all-books-cont">
            <div className="row">
                <div className="col-12 each-book">
                    <h6>We Are One book (Hardcover)</h6>
                    <div className="d-flex">
                        <p className="link-items">
                            <span><a href="">Edit</a></span>
                            <span><a href="">View</a></span>
                            <span className="link-item-red"><a href="">Delete</a></span>
                        </p>
                    </div>
                </div>
                <div className="col-12 each-book">
                    <h6>We Are One book (Hardcover)</h6>
                    <div className="d-flex">
                        <p className="link-items">
                            {/* <span><a href="">Edit</a></span>
                            <span><a href="">View</a></span> */}
                            <span className="link-item-red"><a href="">Delete</a></span>
                        </p>
                    </div>
                </div>
            </div>            
        </div>
            
        </div>
    )
}


AllPuzzles.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
