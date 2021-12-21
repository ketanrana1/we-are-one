import React from 'react'

const Checkout = () => {
    return (
        <div className="checkout-page">
            <div id="content" className="container p-5">  
                <div className="breadcrumb wao-breadcrumb px-0 mb-0">
                    <a href="/home">Home</a>
                    » <a href="/cart">Shopping Cart</a>
                    » <a href="/checkout">Checkout</a>
                </div>
                <h1>Checkout</h1>
                <div className="checkout">
                    <div id="checkout">
                        <div className="checkout-heading">
                            Step 1: Checkout Options 
                        </div>
                        <div className="checkout-content">
                            <div className="left col-12 col-md-6 px-0">
                                <h2>New Customer</h2>
                                <p>Checkout Options:</p>
                                <label >
                                    <input type="radio" name="account" value="register" id="register" checked={true} />
                                    <b>Register Account</b>
                                </label>
                                <br/>
                                <br/>
                                <p> By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.</p>
                                <input type="button" value="Continue" id="button-account" className="button" />
                                <br/>
                                <br/>
                            </div>
                            <div id="login" className="right">
                                <h2>Returning Customer</h2>
                                <p>I am a returning customer</p>
                                <b>E-Mail:</b><br/>
                                <input type="text" name="email" value="" />
                                <br/>
                                <br/>
                                <b>Password:</b><br/>
                                <input type="password" name="password" value="" />
                                <br/>
                                <a className="frgt-psswd" href="">Forgotten Password</a><br/>
                                <br/>
                                <input type="button" value="Login" id="button-login" className="button" /><br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div id="payment-address">
                        <div className="checkout-heading">
                            <span>Step 2: Account &amp; Billing Details</span>
                        </div>
                        <div className="checkout-content">
                        <div className="left">
                        <h2>Your Personal Details</h2>
                        <span className="required">*</span> First Name:<br/>
                        <input type="text" name="firstname" value="" className="large-field" />
                        <br/>
                        <br/>
                        <span className="required">*</span> Last Name:<br/>
                        <input type="text" name="lastname" value="" className="large-field" />
                        <br/>
                        <br/>
                        <span className="required">*</span> E-Mail:<br/>
                        <input type="text" name="email" value="" className="large-field" />
                        <br/>
                        <br/>
                        <span className="required">*</span> Telephone:<br/>
                        <input type="text" name="telephone" value="" className="large-field" />
                        <br/>
                        <br/>
                        Fax:<br/>
                        <input type="text" name="fax" value="" className="large-field" />
                        <br/>
                        <br/>
                        <h2>Your Password</h2>
                        <span className="required">*</span> Password:<br/>
                        <input type="password" name="password" value="" className="large-field" />
                        <br/>
                        <br/>
                        <span className="required">*</span> Password Confirm: <br/>
                        <input type="password" name="confirm" value="" className="large-field" />
                        <br/>
                        <br/>
                        <br/>
                        </div>
                        <div className="right">
                        <h2>Your Address</h2>
                        Company:<br/>
                        <input type="text" name="company" value="" className="large-field" />
                        <br/>
                        <br/>
                        <div id="company-id-display"><span id="company-id-required" className="required" >*</span> Company ID:<br/>
                        <input type="text" name="company_id" value="" className="large-field" />
                        <br/>
                        <br/>
                        </div>
                        <div id="tax-id-display"><span id="tax-id-required" className="required">*</span> Tax ID:<br/>
                        <input type="text" name="tax_id" value="" className="large-field" />
                        <br/>
                        <br/>
                        </div>
                        <span className="required">*</span> Address 1:<br/>
                        <input type="text" name="address_1" value="" className="large-field" />
                        <br/>
                        <br/>
                        Address 2:<br/>
                        <input type="text" name="address_2" value="" className="large-field" />
                        <br/>
                        <br/>
                        <span className="required">*</span> City:<br/>
                        <input type="text" name="city" value="" className="large-field" />
                        <br/>
                        <br/>
                        <span id="payment-postcode-required" className="required" >*</span> Post Code:<br/>
                        <input type="text" name="postcode" value="" className="large-field" />
                        <br/>
                        <br/>
                        <span className="required">*</span> Country:<br/>
                        <select name="country_id" className="large-field">
                            <option value=""> --- Please Select --- </option>
                            <option value="244">Aaland Islands</option>
                            <option value="1">Afghanistan</option>
                            <option value="2">Albania</option>
                            <option value="3">Algeria</option>
                            <option value="4">American Samoa</option>
                            <option value="5">Andorra</option>
                            <option value="6">Angola</option>
                            <option value="7">Anguilla</option>
                            <option value="8">Antarctica</option>
                            <option value="9">Antigua and Barbuda</option>
                            <option value="10">Argentina</option>
                            <option value="11">Armenia</option>
                        </select>
                        <br/>
                        <br/>
                        <span className="required">*</span> Region / State:<br/>
                        <select name="zone_id" className="large-field"><option value=""> --- Please Select --- </option><option value="191">Australian Capital Territory</option><option value="192">New South Wales</option><option value="193">Northern Territory</option><option value="194">Queensland</option><option value="195">South Australia</option><option value="196">Tasmania</option><option value="197">Victoria</option><option value="198">Western Australia</option></select>
                        <br/>
                        <br/>
                        <br/>
                        </div>
                        <div style={{clear: "both", paddingTop: "15px", borderTop: "1px solid #EEEEEE"}}>
                        <input type="checkbox" name="newsletter" value="1" id="newsletter" />
                        <label>I wish to subscribe to the We Are One newsletter.</label>
                        <br/>
                            <input type="checkbox" name="shipping_address" value="1" id="shipping" />
                        <label>My delivery and billing addresses are the same.</label>
                        <br/>
                            <br/>
                        <br/>
                        </div>
                        <div className="buttons new">
                        <div className="right">I have read and agree to the <a className="colorbox cboxElement" href="" ><b>Privacy Policy</b></a>    <input type="checkbox" name="agree" value="1" />
                            <input type="button" value="Continue" id="button-register" className="button" />
                        </div>
                        </div>
                        
                        
                        </div>
                    </div>
                    <div id="shipping-address">
                        <div className="checkout-heading">Step 3: Delivery Details </div>
                        <div className="checkout-content"></div>
                    </div>
                    <div id="shipping-method">
                        <div className="checkout-heading">Step 4: Delivery Method</div>
                        <div className="checkout-content"></div>
                    </div>
                    <div id="payment-method">
                        <div className="checkout-heading">Step 5: Payment Method</div>
                        <div className="checkout-content"><p>Please select the preferred payment method to use on this order.</p>
                            <table className="radio">
                                <tbody><tr className="highlight">
                                <td>            <input type="radio" name="payment_method" value="pp_standard" id="pp_standard" />
                                </td>
                                <td><label >PayPal</label></td>
                            </tr>
                            </tbody></table>
                            <br/>
                            <b>Add Comments About Your Order</b>
                            <textarea name="comment" rows={2} style={{width: "98%"}}></textarea>
                            <br/>
                            <br/>
                            <div className="buttons new">
                            <div className="right">I have read and agree to the <a className="colorbox cboxElement" href="https://www.worldofweareone.com/index.php?route=information/information/info&amp;information_id=5"><b>Terms &amp; Conditions</b></a><input type="checkbox" name="agree" value="1" />
                            <input type="button" value="Continue" id="button-payment-method" className="button" />
                            </div>
                            </div>
                            </div>
                    </div>
                    <div id="confirm">
                        <div className="checkout-heading">Step 6: Confirm Order</div>
                        <div className="checkout-content"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
