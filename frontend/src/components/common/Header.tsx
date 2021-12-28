import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import headerStyles from '../styles/header.module.css';
import { useRouter } from "next/router";

const Header = (props) => { 


    const router = useRouter();
    const [check, setCheck] = useState(false);

    function handleRadioChange() {
        setCheck(true);
    }
    const cart = useSelector((state: any) => state.cart);



    const [navCollapsed, setNavCollapsed] = useState(true);

    const handleNavCollapse = () => setNavCollapsed(false);
    const handleNavCollapseTwo = () => setNavCollapsed(true);
    

  return (
    <header className="headerMain">
        <div className="topHeaderBar">
            <p><img src="/assets/images/heart.png" className="heart-icon" alt="" /> FREE SHIPPING 2+ books to AUS/USA</p>
        </div>
        <nav className="headerNav navbar navbar-expand-lg">
            <a className="navbar-brand" href="/"><img src="/assets/images/logo.png" className="logo" /> </a>
            <button className={`${navCollapsed ? 'collapsed' : 'collapsed'} navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={navCollapsed ? false : true}  aria-label="Toggle navigation" onClick={handleNavCollapseTwo}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${navCollapsed ? 'ktr navbar-collapse collapse' : 'ktr-rna navbar-collapse collapse'}`} id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">

                    <li className={router.pathname == "/" ? "nav-item active" : "nav-item"}>
                        <Link href='/'>
                            <a className='nav-link' onClick={handleNavCollapse}>Home</a>
                        </Link>
                    </li>

                    <li className={router.pathname == "/about" ? "nav-item active" : "nav-item"}>
                        <Link href='/about'>
                            <a className='nav-link' onClick={handleNavCollapse}>About</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/books" ? "nav-item active" : "nav-item"}>
                        <Link href='/books'>
                            <a className='nav-link' onClick={handleNavCollapse}>Books</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/artprints" ? "nav-item active" : "nav-item"}>
                        <Link href='/artprints'>
                            <a className='nav-link' onClick={handleNavCollapse}>ArtPrints</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/application" ? "nav-item active" : "nav-item"}>
                        <Link href='/application'>
                            <a className='nav-link' onClick={handleNavCollapse}>App</a>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link href='/shop'>
                            <a className='nav-link' onClick={handleNavCollapse}>Shop</a>
                        </Link>
                    </li> */}
                    <li className={router.pathname == "/printables" ? "nav-item active" : "nav-item"}>
                        <Link href='/printables'>
                            <a className='nav-link' onClick={handleNavCollapse}>Colouring</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/channel" ? "nav-item active" : "nav-item"}>
                        <Link href='/channel'>
                            <a className='nav-link' onClick={handleNavCollapse}>Shows</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/contact" ? "nav-item active" : "nav-item"}>
                        <Link href='/contact'>
                            <a className='nav-link' onClick={handleNavCollapse}>Contact</a>
                        </Link>
                    </li>
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hi! it's <span style={{fontStyle: "italic"}}>Jennifer!</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link href='/about'>
                                <a className='dropdown-item' onClick={handleNavCollapse}>About Me</a>
                            </Link>
                            <Link href='/awards'>
                                <a className='dropdown-item' onClick={handleNavCollapse}>Awards</a>
                            </Link>
                            <Link href='/contact'>
                                <a className='dropdown-item' onClick={handleNavCollapse}>Contact</a>
                            </Link>
                        </div>
                    </li> */}
                   <div className="inline-wrap-menu">
                        <li className="nav-item">
                            <Link href='/cart'>
                                <a className='nav-link cart-image_number' onClick={handleNavCollapse}>
                                <img src="/assets/images/cart.png" className="nav-item-image"/><div className="number-on-cart">{cart.length}</div>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/login'>
                                <a className='nav-link' onClick={handleNavCollapse}>
                                    <img src="/assets/images/account.png" className="nav-item-image" />
                                </a>
                            </Link>
                        </li>
                   </div>
                </ul>              
            </div>
        </nav>
    </header>
  );
}

export default Header