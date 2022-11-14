import React from 'react'

import NavBar from '../NavBar/NavBar';
import SnackBar from '../SnackBar/SnackBar';
import useFetch from '../../hooks/useFetch';

import './upload.css'

const Upload = (): JSX.Element => {
    const [text, setTextState] = React.useState<string>(null);
    const [ uploadSuccess, setUploadSuccess ] = React.useState(false)
    const { uploadFile } = useFetch();
    
    const snackBarRef = React.useRef(null);

    const showSnackBar = (): void => {
        snackBarRef.current.show();
    }

    const textData = { content: text }

    const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadSuccess(false);

        const file = (event.target as HTMLInputElement).files[0];
        const regFileExtensionForTxt  = /.*\.txt/;
    
        if(file && regFileExtensionForTxt.test(file.name)) {
            const reader = new FileReader();
    
            reader.onload = (readerEvent) => {
                const content = readerEvent.target.result as string;
                setTextState(content);
            };
            reader.readAsText(file, 'UTF-8');
        }
        else {
            alert('Incorrect file');
        }
    };

    const handleUpload = async (): Promise<void> => {
        const isUploaded = await uploadFile({textData})
        isUploaded ? setUploadSuccess(true) : setUploadSuccess(false);
        showSnackBar();
    }

    return (
        <>
        <NavBar />
        <div className='upload-wrap'>
            <h1>UPLOAD</h1>
            <div className="uploader">
                <label className="uploader__label">
                    <input className="uploader__input" type="file" accept="text/csv, text/plain" onChange={readFile}/>
                </label>
                <button className="upload__button" onClick={handleUpload}>Upload</button>
            </div>
        </div>
        <SnackBar
                ref={snackBarRef}
                message={ uploadSuccess ? "Upload Success ! ;)" : "Ups! Something went wrong ;("}
                type={uploadSuccess ? "success" : "error"}
            />
        </>
    )
}

export default Upload;