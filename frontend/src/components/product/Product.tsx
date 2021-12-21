import React, { useState } from 'react'
import { useRouter } from 'next/router'






const Product = () => {
    
    const router = useRouter()

    const [quantityState, setQuantityState] = useState(1)

    const bookId = "9e2a18ce-2378-4bf9-a732-f510adcfe71a";

    const handleQuantityChange = (e) => {
        setQuantityState( e.target.value);
    }


    const handleAtc = () => {
        const productsInCart = { "quantity": quantityState, "id": bookId }

        if (typeof window !== "undefined") sessionStorage.setItem("productInfo", JSON.stringify(productsInCart))


        //router.push('/account')

        const test = JSON.parse(sessionStorage.getItem("productInfo"));

    }


    return (
        <div className="single-product p-3 p-md-5" >
            <div id="content" className="container pt-3"> 
                {/* <div className="breadcrumb wao-breadcrumb px-0 mb-0">
                    <a href="/">Home</a>
                    » <a href="/shop">Books</a>
                    » <a href="/">We Are One book (Hardcover)</a>
                </div> */}
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
                            <div>Qty:
                                <input onChange={handleQuantityChange} type="number" value={quantityState} />
                                <input onClick={handleAtc} type="button" value="Add to Cart" id="button-cart" className="button" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="tab-description" className="tab-content py-5">
                    <p>
                        <strong>AWARDED GOLD in MOM’S CHOICE AWARDS</strong>
                        <br/>‘We Are One’ is a rhythmic poem accompanied by vibrant illustrations that speaks to children and the child within us all of unity. It is a gentle reminder that no matter what our nationality, gender, faith, species, shape, size, color, or that we make different sounds and see things individually, we are all essentially the same.<br/>
                        ‘We are all one but different. Different but the same. Created by the one light, we are each given a name.’<br/>
                        In remembrance of our unity we respect and love each other to establish peace and harmony in our lives and on the planet.<br/>
                        <strong>AVAILABLE in E-BOOK, PAPERBACK and HARDCOVER</strong>
                    </p>
                </div>     
            </div>
        </div>
    )
}

export default Product
