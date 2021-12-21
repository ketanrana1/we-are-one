import React from 'react'
import Index from 'components/app/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Application() {
    return (
        <div>
            <Index />
        </div>
    )
}


Application.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
