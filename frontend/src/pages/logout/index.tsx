import React from 'react'
import Index from '../../components/logout/Index'
import Layout from 'components/common/Layout'

export default function Logout() {
    return (
        <>
            <Index />
        </>
    )
}

Logout.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  } 
