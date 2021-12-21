import Link from 'next/link';

const Header = () => {
  return (
    <footer className="mainFooter" >
        <div className="footer-container">
        <div className="row">
            <div className="col-md-12">
                <div className="footer-bckdr-sec">
                    <img src="/assets/images/ft-sign-up-bg.png" alt="" className="ft-sign-up-bg" />
                    <div className="wao-ft-form_wrapper">
                        <div className="selectmain">
                            <label>Email Address</label>
                            <input id="email" name="email" type="text" placeholder="Enter your email address." /><br />
                            <div id="newsletter_msg"></div>
                        </div>
                        
                        <div className="mobi_go"><a ><input type="image" src="/assets/images/go-rainbow-btn.png" value="" /></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row d-flex align-items-center mb-lg-2 mt-lg-0 mb-3 mt-3 pt-4 pb-4">
            <div className="col-md-6">
                <ul className="footer-social-list-wrapper">
                    <li>Find us on</li>
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
            <div className="col-md-6">
                <p className="wao-ft-inspire-text">Inspire others by sharing</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <p className="wao-ft-copy-right-text">Contact us / Copyright © The World of We Are One.  All Rights Reserved.</p>
            </div>
        </div>
    </div>
    </footer>
  )
}

export default Header