import React, { useEffect, useState } from 'react';
import Logo from '../img/netflix_logo.png';
import User from '../img/netflix_user.png';

import './nav.css';

const Nav = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", ()=> {
            if(window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }
    },[])

    return ( 
        <nav className={`nav ${show && 'nav__black'}`}>
            <img src={Logo} alt="Netflix Logo" className='nav__logo' />

            <img src={User} alt="Netflix Logo" className='nav__avatar' />
        </nav>
     );
}
 
export default Nav;