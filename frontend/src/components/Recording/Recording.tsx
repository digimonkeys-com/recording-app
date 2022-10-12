import React from 'react'

import NavBar from '../NavBar/NavBar';
import Microphone from '../../assets/microphone.svg'

import useLocalStorage from '../../hooks/useLocalStorage';

import './recording.css'

const Recording = (): JSX.Element => {
    const [sample, setSample] = React.useState<string>(null);
    const { getLocalStorage } = useLocalStorage();

    const { access_token } = getLocalStorage();

    React.useEffect(() => {
        getTextSample();
    },[])


    const recorder = () => {
        if(!navigator.mediaDevices) return;

        const constraints = { audio: true, video: false };
        let chunks: any[] = [];

        navigator.mediaDevices.getUserMedia( constraints )
            .then( (stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                
                mediaRecorder.addEventListener('dataavailable' , event => {
                    const data = event.data;
                })
            })
        
    }

    

    recorder();

    
    const getTextSample = () => {
        return fetch('http://localhost:8000/api/v1/sample', { method: 'GET', mode: 'no-cors', headers: { 'ContentType': 'application/json', Authorization: `Bearer ${access_token}` } })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then( resp => setSample(resp) )
            .catch((err) => {
                console.log('error' , err)
            });
    }

    return (
        <div className='recording__wrap'>
            <NavBar />
            <main className='recording'>     
                <div className='recording__textarea'>
                    <span className='textarea'>
                        {/* { sample } */}
                        Zawód pilota dał mi okazję do licznych spotkań z wieloma poważnymi ludźmi. Wiele czasu
                        spędziłem z dorosłymi. Obserwowałem ich z bliska. Lecz to nie zmieniło mej opinii o nich. Gdy
                        spotykałem dorosłą osobę, która wydawała mi się trochę mądrzejsza, robiłem na niej doświadczenie
                        z moim rysunkiem numer 1, który stale nosiłem przy sobie. Chciałem wiedzieć, czy mam do czynienia
                        z osobą rzeczywiście pojętną. Lecz za każdym razem odpowiadano mi: - To jest kapelusz. - Wobec
                        tego nie rozmawiałem ani o wężach boa, ani o lasach dziewiczych, ani o gwiazdach. Starałem się być
                        na poziomie mego rozmówcy.
                    </span>
                </div>
                <div className='recording__button'>
                    <img src={ Microphone } alt="microphone icon"></img>
                </div>
            </main>
        </div>
    )
}

export default Recording;