import React from 'react';

const SignUp = (): JSX.Element => {
    const [success, setSuccess] = React.useState(false);

    React.useEffect( () => {
        if(success) {
            window.history.pushState({}, "", "/sign-in")
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        }
    },[success])

    const userSignUp = () => {
        const email = ( document.querySelector('#signUp-email') as HTMLInputElement ).value;
        const password = ( document.querySelector('#signUp-password') as HTMLInputElement ).value;
        const name = ( document.querySelector('#signUp-name') as HTMLInputElement ).value;

        const userData = new FormData();
        userData.append('username', email);
        userData.append('password', password);
        userData.append('name', name);

        return fetch('http://localhost:8000/api/v1/register', { method: 'PUT', body: userData, headers: { 'ContentType': 'application/x-www-form-urlencoded' } })
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

        const signedUpUserData = await userSignUp()

        if(signedUpUserData) {
            setSuccess(true)
        }
    }

    return (
        <div className="signUp__wrap">
            <div className="signUp">
                    <h4 className="signUp__title">Sign Up</h4>
                    <div className="signUp__input--wrap">
                        <input 
                            className="signUp__input" 
                            type="text" 
                            name="signUp-name" 
                            id="signUp-name" 
                            placeholder="Your Name" 
                            autoComplete="off" 
                        />
                            <i className="input__icon input__icone--first"></i>
                    </div>
                    <div className="signUp__input--wrap">
                        <input
                            className="signUp__input" 
                            type="email" 
                            name="signUp-email" 
                            id="signUp-email" 
                            placeholder="Your Email" 
                            autoComplete="off" 
                        />
                            <i className="input__icon input__icone--second"></i>
                    </div>
                    <div className="signUp__input--wrap">
                        <input 
                            className="signUp__input" 
                            type="password" 
                            name="signUp-password" 
                            id="signUp-password" 
                            placeholder="Your Password" 
                            autoComplete="off" 
                        />
                            <i className="input__icon input__icone--third"></i>
                    </div>
                    <button className="signUp__button" onClick={handleSubmit}>submit</button>
            </div>
        </div>
    )
}

export default SignUp;