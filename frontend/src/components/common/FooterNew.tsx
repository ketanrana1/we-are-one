import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig() 

const FooterNew = () => {

    const [ responseState, setResponseState] = useState("");

    const [mail, setMail] = useState("")
    const handleClick = async() => {
        const data = {email: mail}
        try {
            const response : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}subscribe`,
            data: data,
            // headers: {
            //     // 'Content-Type': 'multipart/form-data'
            //     }            
            });
            if(response) {                
                console.log("RESPONSE DATA", response.data)
                setResponseState(response.data)
            }
        } catch (error) {
            console.log(error)  
        }
    }


  return (
    <>
    <div className="child-image-cont">
        <img src="/assets/images/line of children new.png" />
    </div>
    <footer className="mainFooter footer-new" >
        <div className="footer-container">
            <div className="row">
                <div className="col-md-12">
                    <div className="footer-bckdr-sec">
                        <img src="/assets/images/sign box(2).png" alt="" className="ft-sign-up-bg" />
                        <div className="wao-ft-form_wrapper">
                            <div className="selectmain">
                                <label>Email Address</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email address." value={mail} onChange={(e) => {
                                    setMail(e.target.value)
                                }}/><br />
                                <div id="newsletter_msg" className="pt-2"> { responseState }</div>
                            </div>                            
                           <div className="mobi_go"><a onClick={handleClick} ><input type="image" src="/assets/images/go-rainbow-btn.png" value="" /></a></div>
                        </div>     
                    </div>
                </div>
                <div className="col-12">
                    <p className="top-para">Check out our Privacy Policy,  I only send out good news for stuff you’ll love!</p>
                </div>
            </div>
            <div className="row footer-new-bottom-text-cont">
                <div className="col-12 col-lg-4 top-new-text-cont">                   
                    <h5 className="title-hd">Contact</h5>
                    <a href="mailto:jennifer@worldofweareone.com"> jennifer@worldofweareone.com</a>
                    <p className="btm-para">I’m always grateful to hear from you & your loved ones!</p>
                </div>
                <div className="col-12 col-lg-4 social-text-cont">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="title-hd">Let’s be friends on</h4>
                            <ul className="footer-social-list-wrapper">
                                <li>
                                    <a href="https://www.instagram.com/worldofweareone_/" target="_blank">
                                        <img src="/assets/images/instagram.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/pages/We-Are-One/160342653631" target="_blank">
                                        <img src="/assets/images/facebook.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://pin.it/3i4QhaN" target="_blank">
                                        <img src="/assets/images/pinterest.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UCmQiaZw6_1zAmVgB9bIYoSw" target="_blank">
                                        <img src="/assets/images/channel-icon.png" alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12">
                            <div className="new-payment-mehtods">
                                <p className="title-hd-2">Secure Payment Methods</p>
                                <img className="foot-pay-methods-img" src="/assets/images/payment-methods.png" />
                            </div>
                        </div>
                    </div>                   
                </div>
                <div className="col-12 col-lg-4 menu-new-links">
                    <h2 className="title-hd">More things of interest</h2>
                    <ul>
                        <li><a href="/wholesale-and-distribution">Wholesale & Distribution </a></li>
                        <li><a href="/help-and-support">  Help & Support</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
                        <li><a href="/shipping">Shipping</a></li>
                    </ul>
                </div>              
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <p className="wao-ft-copy-right-text">Copyright © The World of We Are One.  All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default FooterNew;