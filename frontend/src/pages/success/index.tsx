import React from 'react'
import Index from '../../components/success/index'
import Layout from 'components/common/Layout'

export default function success() {
    return (
        <Index />
    )
}

success.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  } 
