
import React from 'react'
import { useDispatch } from 'react-redux';
import { resetCart } from 'redux/cart.slice';

import LayoutNew from 'components/common/LayoutNew';

export default function paymentFailed() {

    return (
        <>
            <div className='mt-5 mb-5 thankyou-component'>
                <div className='flex d-inline-flex success-container'>
                {/* <i className="fa fa-check-circle ml-4" style={{fontSize: 48, color: "green" }}></i> */}
                    <h1 className='ml-4 thankyou-message'>Your payment has beeen failed.</h1>
                </div>
            </div>
        </>
    )

}


paymentFailed.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
