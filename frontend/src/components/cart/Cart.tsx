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
            <h1>Shopping Cart (0.00kg)</h1>

            <form action="" method="post" encType="multipart/form-data">
                <div className="cart-info common-table-wrapper table-responsive">
                    <table>
                        <thead><tr>
                            <td className="image">Image</td>
                            <td className="name">Product Name</td>
                            <td className="model">Model</td>
                            <td className="quantity">Quantity</td>
                            <td className="price">Unit Price</td>
                            <td className="total">Total</td>
                        </tr></thead>
                        <tbody>

                            {cart.map((item, index) => {
                                return (
                                    <tr>
                                    <td className="image">
                                <a href=""><img src="/assets/images/we-are-one-book-new-47x47.png" alt="We Are One book (Hardcover)" title="We Are One book (Hardcover)" /></a>
                            </td>
                            <td className="name">
                                <a href="">{item.id}</a>
                            </td>
                            <td className="model">We Are One</td>
                            <td className="quantity">
                                <input  type="text" name="quantity[50::]" value={item.quantity} size={1} />
                                &nbsp;
                                &nbsp;
                                <a href="">
                                    <img onClick={() =>  {dispatch(removeFromCart(item.id))}} src="/assets/images/remove.png" alt="Remove" title="Remove" />
                                </a>
                            </td>
                            <td className="price">$24.00</td>
                            <td className="total">$24.00</td>
                            </tr>
                                );
                            })}                           
                        </tbody>
                    </table>
                </div>
            </form>

            <h2 className="pt-4 pt-md-0">What would you like to do next?</h2>
            <div className="content">
                <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                <table className="radio">
                    <tbody>
                        <tr className="highlight" style={{display: "none"}}>
                            <td>
                                <input type="radio" name="next" value="coupon" id="use_coupon" />
                            </td>
                            <td><label >Use Coupon Code</label></td>
                        </tr>
                        <tr className="highlight" style={{display: "none"}}>
                            <td>
                                <input type="radio" name="next" value="voucher" id="use_voucher" />
                            </td>
                            <td>
                                <label>Use Gift Voucher</label>
                            </td>
                        </tr>
                        <tr className="highlight">
                            <td>
                                <input onChange={handleRadioChange} type="radio" name="next" value="shipping" id="shipping_estimate" />
                            </td>
                            <td>
                                <label>Estimate Shipping &amp; Taxes</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="cart-module">
                <div id="shipping" className="content" style={{display: check === false ? "none" : "block"}}>
                    <p>Enter your destination to get a shipping estimate.</p>
                    <table>
                        <tbody>
                            <tr>
                                <td><span className="required">*</span> Country:</td>
                                <td>
                                    <select name="country_id">
                                        <option value=""> --- Please Select --- </option>
                                        <option value="244">Aaland Islands</option>
                                        <option value="1">Afghanistan</option>
                                        <option value="2">Albania</option>
                                        <option value="3">Algeria</option>
                                        <option value="4">American Samoa</option>
                                        <option value="239">Zimbabwe</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><span className="required">*</span> Region / State:</td>
                                <td>
                                    <select name="zone_id">
                                        <option value=""> --- Please Select --- </option>
                                        <option value="191">Australian Capital Territory</option>
                                        <option value="192">New South Wales</option>
                                        <option value="193">Northern Territory</option>
                                        <option value="194">Queensland</option>
                                        <option value="195">South Australia</option
                                        ><option value="196">Tasmania</option>
                                        <option value="197">Victoria</option>
                                        <option value="198">Western Australia</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span id="postcode-required" className="required" style={{display: "none"}}>*</span> Post Code:
                                </td>
                                <td>
                                    <input type="text" name="postcode" value="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="button" value="Get Quotes" id="button-quote" className="button" />
                </div>
            </div>

            <div className="cart-total">
                <table id="total">
                    <tbody>
                        <tr>
                            <td className="right"><b>Sub-Total:</b></td>
                            <td className="right">$24.00</td>
                        </tr>
                        <tr>
                            <td className="right"><b>Total:</b></td>
                            <td className="right">$24.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <div className="right"><a href="" className="button">Checkout</a></div>
                <div className="center"><a href="" className="button">Continue Shopping</a></div>
            </div>
        </div>
    </div>
);
}

export default Cart;

