import React, { useState } from 'react'
import LayoutNew from 'components/common/LayoutNew'
import ProductNew from 'components/product/ProductNew'
import ProductNewImage from 'components/product/common/ProductNewImage'
import Router from 'next/router';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { addToCart, incrementQuantity, removeFromCart } from 'redux/cart.slice'



const Product = ({ product, relatedProducts  }) => {


  if (product.length < 1) {
    Router.push('/shop');
  }


  const [counter, setCounter] = useState(1) 
  const handleClickInc = () => {
    setCounter(counter + 1)
  }
  const handleClickDec = () => {
    if(counter > 1 ) {
        setCounter(counter - 1)
    }   
  }

    const dispatch = useDispatch();

    const router = useRouter()

    const [quantityState, setQuantityState] = useState(1)

    const item = {
      product_name:product[0]?.art_name,
      product_image_name: product[0]?.art_image_1_name,
      product_price: product[0]?.size_small_price,
      id: product[0]?.artId,
      quantity: counter
    }

    const handleAtc = () => {
        dispatch(addToCart(item));
        router.push('/cart')
    }




    return (
        <div className="product-detail-cont container">
            <div className="row gx-5">
                <div className="col-12 col-md-7">
                  <div className="each-image pr-md-3">
                      <img className="each-product-image" src={product[0]?.art_image_1_name} />
                  </div>
                  <div className="each-image pr-md-3">
                      <img className="each-product-image" src={product[0]?.art_image_2_name} />
                  </div>
                  <div className="each-image pr-md-3">
                      <img className="each-product-image" src={product[0]?.art_image_3_name} />
                  </div>
                  <div className="each-image pr-md-3">
                      <img className="each-product-image" src={product[0]?.art_image_4_name} />
                  </div>
                </div>
                <div className="col-12 col-md-5">

                <div className="product-info-cont">

<h2 className="prouct-name">{product[0]?.art_name}</h2>
<p className="product-by">by Jennifer Black</p>
<p className="price">${product[0]?.size_small_price}</p>
<form>
    <div className="size-selector">
        <p>Size:</p>
        <select>
            <option disabled>Select Size:</option>
            <option value="Small">Small - 73cm X 36cm</option>
        </select>
    </div>

    <div className="cart">
      <div className="cart-inner-cont">Qty:
          <div className="counter-cont-main">
              <div className="counter-cont">
                  {counter}
              </div>
              <div className="counter-btn-div">
                  <div className="each-col top-incr" onClick={handleClickInc}>+</div>
                  <div className="each-col btm-dec" onClick={handleClickDec}>-</div>
              </div>
          </div>
          <input onClick={handleAtc} type="button" value="Add to Cart" id="button-cart" className="button btn-artprnts" />
      </div>
  </div>



    {/* <div className="quantity-selector">
    <p>Qty:</p>
        <input type="number" id="quantitySelector" className="slectr-qty" placeholder="1" />
    </div>
    <input type="submit" value="ADD TO CART" /> */}


</form>
<div className="product-details-content-cont">
    <h4>Description:</h4>
    {<div dangerouslySetInnerHTML={{__html: product[0]?.art_description}}></div>}
</div>

</div>
                </div>
            </div>    
        </div>
    ) 
}




export async function getServerSideProps({ query }) {

  const baseUrl = process.env.BACKEND_BASE_URL; 
  const res = await axios.get(`${baseUrl}api/artprints/singleArtprintDetails/?id=${query.slug}`)
  console.log(res.data.singleArtprint)
  return { props: { product: res.data.singleArtprint } }

}

export default Product;

Product.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 