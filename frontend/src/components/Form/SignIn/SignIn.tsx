import React from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage';

const SignIn = (): JSX.Element => {
    const [navigate, setNavigate] = React.useState(false)
    const { setLocalStorage } = useLocalStorage()

    React.useEffect( () => {
        if(navigate) {
            window.history.pushState({}, "", "/")
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        }
    },[navigate])

    const userSignIn = () => {
        const email = ( document.querySelector('#signIn-email') as HTMLInputElement ).value;
        const password = ( document.querySelector('#signIn-password') as HTMLInputElement ).value;

        const userData = new FormData();
        userData.append('username', email);
        userData.append('password', password);

        return fetch('http://localhost:8000/api/v1/login', { method: 'POST', body: userData, headers: { 'ContentType': 'application/x-www-form-urlencoded' } })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .catch((err) => {
                console.log('error' , err)
            });
    }

    const handleSubmit = async (): Promise<void> => {

        const signedInUserData = await userSignIn()

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
                    <button className="signIn__button" onClick={handleSubmit}>submit</button>
                    <a href="#" className="signIn__link">Forgot your password?</a>
            </div>
        </div>
    )
}

export default SignIn;
