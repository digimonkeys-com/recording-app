import Link from './Link/Link';
import Logo from '../../assets/logo.png'
import useLocalStorage from '../../hooks/useLocalStorage';

import './navbar.css'

const NavBar = (): JSX.Element => {
    const { getLocalStorage } = useLocalStorage();
    const { access_token } = getLocalStorage() || {};

    const handleSignOut = () => {
        window.localStorage.clear();
    }

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
                <li className='sign--in--out' onClick={ access_token ? handleSignOut : null}>
                    <Link className='navBar__link' href='/sign-in'>
                        {access_token ? 'Sign Out' : 'Sign In'}
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default NavBar;