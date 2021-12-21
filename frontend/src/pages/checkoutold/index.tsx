import React from 'react'
import Index from '../../components/checkoutold/Index'
import Layout from 'components/common/Layout'

export default function Checkout () {
    return (
        <>
            <Index />
        </>
    )
}

Checkout.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  } 