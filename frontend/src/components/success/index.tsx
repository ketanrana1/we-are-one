
import React from 'react'
import { useDispatch } from 'react-redux';
import { resetCart } from 'redux/cart.slice';

const Index = () => {
    const dispatch = useDispatch();
    dispatch(resetCart());
    return (
        <div >
        <div className='mt-5 mb-5 thankyou-component'>
        <div className='flex d-inline-flex success-container'>
        <i className="fa fa-check-circle ml-4 mt-3" style={{fontSize: 48, color: "green" }}></i>
            <h1 className='ml-4 thankyou-message'>Thank You for the purchase! Your order has been confirmed and it will arrive soon!</h1>
        </div>
        </div>
        </div>
    )
}

export default Index
