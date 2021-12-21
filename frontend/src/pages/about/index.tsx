import React from 'react'
import Index from '../../components/about/Index';
import LayoutNew from 'components/common/LayoutNew';

export default function About() {
    return (
			<>
				<Index />
			</>
    )
}

About.getLayout = function getLayout(page) {
   return (
      <LayoutNew>
         {page}
      </LayoutNew>
   )
  }  