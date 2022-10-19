import React from 'react';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import SnackBar from '../SnackBar/SnackBar';

import './form.css'

const Form = (): JSX.Element => {
    const snackBarRef = React.useRef(null);

    const showSnackBar = (): void => {
        snackBarRef.current.show();
    }

    return (
        <>
            <div className="form__wrap">
                <section className="form">
                    <div className="form__content">
                        <h6 className="form__title">
                            <span className='form__subtitle'>Sign In</span>
                            <span className='form__subtitle'>Sign Up</span>
                        </h6>
                        <input
                            className="form__checkbox"
                            type="checkbox"
                            id="formCheckbox"
                            name="formCheckbox"
                        />
                        <label className='form__label' htmlFor="formCheckbox"></label>
                        <section className='form__panels'>
                            <div className='panels'>
                                <SignIn showSnackBar={() => showSnackBar()}/>
                                <SignUp showSnackBar={() => showSnackBar()}/>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
            <SnackBar
                ref={snackBarRef}
                message="Ups! Something went wrong ;("
                type="error"
            />
        </>
    )
}

export default Form;