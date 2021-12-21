import Index from'../../components/awards/Index'
import Layout from 'components/common/Layout';

export default function Awards() {
    return (
        <>
            <Index />
            </>
    );
}

Awards.getLayout = function getLayout(page) {
    return (
      <Layout>
            {page}
      </Layout>
    )
  }  
