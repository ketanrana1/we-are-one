import React from 'react'
import Index from '../../components/password/Index'
import Layout from 'components/common/Layout'

export default function Password() {
    return (
        <>
            <Index />
        </>
    )
}

Password.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  } 
