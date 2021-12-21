import React from 'react'

import Layout from 'components/common/Layout'

export default function Shop() {
    return (
        <>
        <h1>Test</h1>
        </>
        
    )
}

Shop.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  } 
