import React from 'react'
import Index from '../../components/shop/Index'
import Layout from 'components/common/Layout'

export default function Shop() {
    return (
        <Index />
    )
}

Shop.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  } 
