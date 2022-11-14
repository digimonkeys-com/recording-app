import React from 'react';

import { StatusData } from '../../types/types';
import NavBar from '../NavBar/NavBar';
import useFetch from '../../hooks/useFetch';

import './status.css';

const Status = (): JSX.Element => {
    const [ status, setStatus ] = React.useState<StatusData>(null);
    const { getStatus } = useFetch();

    const { duration, all_samples, unrecorded_samples, recorded_samples } = status || {};
    const totalSamples = ( recorded_samples / all_samples ) * 100 || 0;

    React.useEffect( () => {
        const setNewStatus = async () => {
            const newStatus = await getStatus();
            newStatus && setStatus(newStatus)
        };
        setNewStatus();
    },[])

    return (
        <>
            <NavBar />
            <div className='status__wrap'>
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
                        <span className='item__results'>{totalSamples.toFixed(2)}%</span>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Status;
