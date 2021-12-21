import React from 'react'
import Index from '../../components/cart/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Cart() {
    return (
        <>
            <Index />
        </>
    )
}

Cart.getLayout = function getLayout(page) {
    return (
        <LayoutNew>
            {page}
        </LayoutNew>
    )
  } 
