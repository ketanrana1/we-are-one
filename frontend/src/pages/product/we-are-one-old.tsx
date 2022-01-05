
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addToCart, incrementQuantity } from 'redux/cart.slice'






const Product = () => {

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

    const bookId = "id_2";
    

    const item = {
        id: "id_22",
        quantity: counter
    }
   


    const handleAtc = () => {
        dispatch(addToCart(item));
        router.push('/cart')

    }

    return (
        <div className="single-product p-3 p-md-5" >
            <div id="content" className="container pt-3"> 

               


                <h1>We Are One book (Hardcover)</h1>
                <div className="product-info row">
                    <div className="left col-12 col-md-6">
                        <div className="image">
                            <a href="/" title="We Are One book (Hardcover)" className="colorbox cboxElement">
                                <img src="/assets/images/we-are-one-book-new-300x380.png" title="We Are One book (Hardcover)" alt="We Are One book (Hardcover)" id="image" />
                            </a>
                        </div>
                    </div>
                    <div className="right col-12 col-md-6">
                        <div className="price">Price: $24.00<br/>
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
                                <input onClick={handleAtc} type="button" value="Add to Cart" id="button-cart" className="button" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="tab-description" className="tab-content py-5">
                    <p><strong>AWARDED GOLD in MOM’S CHOICE AWARDS</strong>
                    <br/>‘We Are One’ is a rhythmic poem accompanied by vibrant illustrations that speaks to children and the child within us all of unity. It is a gentle reminder that no matter what our nationality, gender, faith, species, shape, size, color, or that we make different sounds and see things individually, we are all essentially the same.<br/>
                    ‘We are all one but different. Different but the same. Created by the one light, we are each given a name.’<br/>
                    In remembrance of our unity we respect and love each other to establish peace and harmony in our lives and on the planet.<br/>
                    <strong>AVAILABLE in E-BOOK, PAPERBACK and HARDCOVER</strong></p>
                </div>     
            </div>
        </div>
    )
}

export default Product
