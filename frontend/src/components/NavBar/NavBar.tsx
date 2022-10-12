import React from 'react';

import Link from '../Form/Link/Link';
import Logo from '../../assets/logo.png'

import './navbar.css'

const NavBar = (): JSX.Element => {

    return (
        <header className='navBar'>
            <h1 className="navBar__title">
                <Link className='navBar__link navBar__img--wrapper' href="/" src={Logo} alt='Digimonkeys logo'>
                    Digimonkeys
                </Link>
            </h1>
            <ul className='navBar__list'>
                <li className='list__item'>
                    <Link className='navBar__link' href='/'>
                        Start Recording
                    </Link>
                </li>
                <li className='list__item'>
                    <Link className='navBar__link' href='/upload'>
                        Upload Text
                    </Link>
                </li>
                <li className='list__item'>
                    <Link className='navBar__link' href='/status'>
                        Status
                    </Link>
                </li>
                <li className='sign--in--out'>
                    <Link className='navBar__link' href='/sign-in'>
                        SignIn
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default NavBar;