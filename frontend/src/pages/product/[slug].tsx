import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import LayoutNew from 'components/common/LayoutNew'


const Product = ({ product, relatedProducts  }) => {
  if (product.length < 1) {
    Router.push('/shop');
  }
  return (
    <div className="p-md-5 p-2 container">
      <h1>{product[0]?.book_name}</h1>
    </div>
  )
}; 

export async function getServerSideProps({ query }) {

  const res = await axios.get(`http://localhost:4000/api/books/singleBookDetails/?id=${query.slug}`)
  console.log(res.data.singleBook)
  return { props: { product: res.data.singleBook } }

}

export default Product;



Product.getLayout = function getLayout(page: any) {
  return (
    <LayoutNew>
      {page}
    </LayoutNew>
  )
}

