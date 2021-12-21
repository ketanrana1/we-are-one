import React from 'react'
import Index from '../../components/register/Index'
import Layout from 'components/common/Layout'

export default function Register() {
    return (
        <>
            <Index />
        </>
    )
}

Register.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  } 
