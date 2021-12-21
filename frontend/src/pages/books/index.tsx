import React from 'react'
import LayoutNew from 'components/common/LayoutNew'
import Index from '../../components/books/Index'

export default function Books() {
    return (
        <div>
            <Index />
        </div>
    )
}



Books.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
