import React from 'react';

import NavBar from '../NavBar/NavBar';
import useLocalStorage from '../../hooks/useLocalStorage';

import './status.css';

interface Status {
    duration: number;
    all_samples: number;
    unrecorded_samples: number;
    recorded_samples: number;
}

const Status = (): JSX.Element => {
    const [ status, setStatus ] = React.useState<Status>(null);
    const { getLocalStorage } = useLocalStorage();
    const { access_token } = getLocalStorage()

    const { duration, all_samples, unrecorded_samples, recorded_samples } = status || {};
    const totalSamples = ( recorded_samples / all_samples ) * 100 || 0;

    React.useEffect( () => {
        getStatus();
    },[])

    const getStatus = (): Promise<void> => {

        return fetch('http://localhost:8000/api/v1/status', { method: 'GET', headers: { Authorization: `Bearer ${access_token}` } })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then( resp => setStatus(resp) )
            .catch((err) => {
                console.log('error' , err)
            });
    }

    return (
        <>
            <NavBar />
            <section className='status'>
                <div className='status__item'>
                    <h3 className='item__title'>Total length of recordings</h3>
                    <span className='item__results'>{duration}</span>
                </div>
                <div className='status__item'>
                    <h3 className='item__title'>Number of recorded samples</h3>
                    <span className='item__results'>{recorded_samples}</span>
                </div>
                <div className='status__item'>
                    <h3 className='item__title'>Number of remaining samples</h3>
                    <span className='item__results'>{unrecorded_samples}</span>
                </div>
                <div className='status__item'>
                    <h3 className='item__title'>Total number of samples</h3>
                    <span className='item__results'>{all_samples}</span>
                </div>
                <div className='status__item'>
                    <h3 className='item__title'>Completion</h3>
                    <span className='item__results'>{totalSamples}%</span>
                </div>
            </section>
        </>
    )
}

export default Status;