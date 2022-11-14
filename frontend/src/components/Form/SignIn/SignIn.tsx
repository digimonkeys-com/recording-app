import React from 'react';

import { SignInProps } from '../../../types/types'
import useLocalStorage from '../../../hooks/useLocalStorage';
import useFetch from '../../../hooks/useFetch'

const SignIn = (props: SignInProps): JSX.Element => {
    const [navigate, setNavigate] = React.useState(false)
    const { userSignIn } = useFetch();
    const { setLocalStorage } = useLocalStorage()
    const { showSnackBar } = props;

    React.useEffect( () => {
        if(navigate) {
            window.history.pushState({}, "", "/")
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        }
    },[navigate])

    const handleSubmit = async (): Promise<void> => {
        const email = ( document.querySelector('#signIn-email') as HTMLInputElement ).value;
        const password = ( document.querySelector('#signIn-password') as HTMLInputElement ).value;

        const userData = new URLSearchParams({
            'username': email,
            'password': password,
        });

        const signedInUserData = await userSignIn(userData)

        if(!signedInUserData) {
            showSnackBar();
        }

        if(signedInUserData) {
            setLocalStorage(signedInUserData);
            setNavigate(true);
        }
    }

    return (
        <div className="signIn__wrap">
            <div className="signIn">
                    <h4 className="signIn__title">Sign In</h4>
                    <div className="signIn__input--wrap">
                        <input 
                            className="signIn__input" 
                            type="email" 
                            name="signIn-email" 
                            id="signIn-email" 
                            placeholder="Your Email" 
                            autoComplete="off" 
                        />
                            <i className="input__icon input__icon--first"></i>
                    </div>
                    <div className="signIn__input--wrap">
                        <input 
                            className="signIn__input" 
                            type="password" 
                            name="signIn-password" 
                            id="signIn-password" 
                            placeholder="Your Password" 
                            autoComplete="off" 
                        />
                            <i className="input__icon input__icon--second"></i>
                    </div>
                    <button className="signIn__button" onClick={handleSubmit}>Submit</button>
                    <a href="#" className="signIn__link">Forgot your password?</a>
            </div>
        </div>
    )
}

export default SignIn;
