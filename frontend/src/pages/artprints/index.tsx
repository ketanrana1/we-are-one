import React from 'react'
import LayoutNew from 'components/common/LayoutNew'
import Index from 'components/artprints/Index'

export default function ArtPrints() {
    return (
        <>
            <Index />
        </>
    )
}


ArtPrints.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
