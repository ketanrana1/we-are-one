import React from 'react'
import Index from '../../components/login/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Login() {
    return (
        <>
            <Index />
        </>
    )
}

Login.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
