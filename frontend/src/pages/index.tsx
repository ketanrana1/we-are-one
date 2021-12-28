import type { ReactElement } from 'react'
import Index from '../components/home/Index';
import Layout from '../components/common/Layout'
import LayoutNew from 'components/common/LayoutNew';



export default function Home() {
    return (
        <>
          <Index />
        </>
    )
}
 
Home.getLayout = function getLayout( page: ReactElement ) {
    return (
      <LayoutNew>
        {page}
      </LayoutNew>
    )
  }


