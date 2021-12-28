import React from 'react'
import Index from '../../components/register/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Register() {
    return (
        <>
            <Index />
        </>
    )
}

Register.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
