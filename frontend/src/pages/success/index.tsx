import React from 'react'
import Index from '../../components/success/index'
import LayoutNew from 'components/common/LayoutNew'

export default function success() {
    return (
        <Index />
    )
}

success.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
