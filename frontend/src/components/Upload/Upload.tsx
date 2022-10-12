import React from 'react'

import NavBar from '../NavBar/NavBar';
import useLocalStorage from '../../hooks/useLocalStorage';

import './upload.css'

const Upload = (): JSX.Element => {
    const [text, setTextState] = React.useState<string>(null);
    const { getLocalStorage } = useLocalStorage();

    const { access_token } = getLocalStorage()

    const uploadFile = () => {
        if(!text) return;

        return fetch('http://localhost:8000/api/v1/sample', { method: 'POST', body: text, headers: { 'ContentType': 'application/json', Authorization: `Bearer ${access_token}` } })
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

    const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files[0];
        const regFileExtensionForTxt  = /.*\.txt/;
    
        if( file && regFileExtensionForTxt.test(file.name) ) {
            const reader = new FileReader();
    
            reader.onload = (readerEvent) => {
                const content = readerEvent.target.result as string;
                setTextState(content)
            };
            reader.readAsText(file, 'UTF-8');
        }
        else {
            alert('Incorrect file')
        }
    }

    return (
        <>
            <NavBar />
            <h1>UPLOAD</h1>
            
            <div className="uploader">
                <label className="uploader__label">
                    Wybierz plik do wczytania
                    <input className="uploader__input" type="file" accept="text/csv, text/plain" onChange={readFile}/>
                </label>
                <button className="upload__button" onClick={uploadFile}>Upload</button>
            </div>
        </>
    )
}

export default Upload;