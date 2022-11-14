import Link from './Link/Link';
import useLocalStorage from '../../hooks/useLocalStorage';

import Logo from '../../assets/logo.png'
import MicrophoneIcon from '../../assets/microphone.svg'
import UploadIcon from '../../assets/upload.svg'
import StatusIcon from '../../assets/status.svg'
import SignOutIcon from '../../assets/signOut.svg'

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
            <ul className='navBar__list--desktop'>
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
            <ul className='navBar__list--mobile'>
                <li className='list__item'>
                    <Link className='navBar__link' href='/' src={ MicrophoneIcon } children={''} />
                </li>
                <li className='list__item'>
                    <Link className='navBar__link' href='/upload' src={ UploadIcon } children={''} />
                </li>
                <li className='list__item'>
                    <Link className='navBar__link' href='/status' src={ StatusIcon } children={''} />
                </li>
                <li className='sign--in--out--mobile' onClick={ access_token ? handleSignOut : null}>
                    <Link className='navBar__link' href='/sign-in' src={ SignOutIcon } children={''} />
                </li>
            </ul>
        </header>
    )
}

export default NavBar;