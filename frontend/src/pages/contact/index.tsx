import React from 'react'
import Index from '../../components/contact/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Contact() {
    return (
        <>
        <Index />
        </>
    )
}

Contact.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
