import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cartReducer, removeFromCart } from 'redux/cart.slice';

const Cart = () => {
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);

    function handleRadioChange() {
        setCheck(true);
    }
    const cart = useSelector((state: any) => state.cart);
    console.log(cart)
  
return (



    <div className="cart-page">
        <div id="content" className="container remove-gradient-bg cart-page-wrapper py-4 px-md-5">
            {/* <div className="breadcrumb wao-breadcrumb px-0 my-0">
                <a href="/home">Home</a> » <a href="/cart">Shopping Cart</a>
            </div> */}
            <h1>Shopping Cart</h1>

            <form className="mb-4" action="" method="post" encType="multipart/form-data">
                <div className="cart-info common-table-wrapper table-responsive">
                    <table>
                        <thead><tr>
                            <td className="image">Image</td>
                            <td className="name">Product Name</td>
                            <td className="quantity">Quantity</td>
                            <td className="price">Unit Price</td>
                        </tr></thead>
                        <tbody>

                            {cart.map((item, index) => {
                                return (
                                    <tr>
                                    <td className="image-product-cart">
                                <a href=""><img src={item.product_image_name} /></a>
                            </td>
                            <td className="name">
                                <p>{item.product_name}</p>
                            </td>
                            <td className="quantity">
                                <input  type="text" name="quantity[50::]" value={item.quantity} size={1} />
                                &nbsp;
                                &nbsp;
                                <a href="">
                                    <img onClick={() =>  {dispatch(removeFromCart(item.id))}} src="/assets/images/remove.png" alt="Remove" title="Remove" />
                                </a>
                            </td>
                            <td className="price">${item.product_price}</td>
                            </tr>
                                );
                            })}                           
                        </tbody>
                    </table>
                </div>
            </form>

            <div className="cart-total">
                <table id="total">
                    <tbody>
                        <tr>
                            <td className="right"><b>Total:</b></td>
                            <td className="right">$24.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <div className="right"><a href="/checkout" className="button">Checkout</a></div>
                <div className="center"><a href="/books" className="button">Continue Shopping</a></div>
            </div>
        </div>
    </div>
);
}

export default Cart;

