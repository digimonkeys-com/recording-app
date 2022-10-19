import React from 'react';

import { SnackBarProps } from '../../types/types';
import './snackbar.css'

const SnackBar = React.forwardRef((props: SnackBarProps, ref): JSX.Element => {
    const [ showSnackbar, setShowSnackBar ] = React.useState(false);

    const { type, message } = props;

    React.useImperativeHandle(ref, () => ({
        show() {
            setShowSnackBar(true);
            setTimeout(() => {
                setShowSnackBar(false)
            }, 3000)
        }
    }))

    return (
        <div 
            className='snackbar'
            id={showSnackbar ? 'show' : 'hide'}
            style={{ backgroundColor: type === 'success' ? '#00F593' : '#FF0033' }}
        >
            <span className='snackbar__symbol'>
                { type === 'success' ? <p>&#x2713;</p> : <p>&#x2613;</p> }
            </span>
            <p className='snackbar__description'>
                { message }
            </p>
        </div>
    )
})

export default SnackBar;