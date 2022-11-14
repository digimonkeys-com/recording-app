import React from 'react'

import NavBar from '../NavBar/NavBar';
import Microphone from '../../assets/microphone.svg'
import PlayIcon from '../../assets/play.svg'
import SendIcon from '../../assets/send.svg'
import useMediaRecorder from '../../hooks/useMediaRecorder';
import useFetch from '../../hooks/useFetch';
import { SampleData } from '../../types/types';

import './recording.css'

const Recording = (): JSX.Element => {
    const [ sample, setSample ] = React.useState<SampleData>(null);
    const [ isRecording, setIsRecording ] = React.useState(true);
    const [ isRecordStop, setIsRecordStop ] = React.useState(false);
    const { startRecording, stopRecording, playRecord, prepereRecord, clearMediaRecorderState } = useMediaRecorder();
    const { getTextSample, sendRecord } = useFetch();
    const { transcription, id } = sample || {};

    React.useEffect(() => {
        setNewSample();
    },[]);

    const setNewSample = async () => {
        const newSample = await getTextSample();
        newSample && setSample(newSample)
    };

    const handleRecording = (): void => {
        if(isRecording) {
            startRecording()
        } else if(!isRecording) {
            stopRecording();
            setIsRecordStop(true);
        } 

        setIsRecording(!isRecording);
    }

    const handleSend = () => {
        const preperedRecord = prepereRecord();
        
        const recordData = new FormData();
        recordData.append('id' , id.toString());
        recordData.append('file' , preperedRecord);
        recordData.append('browser' , 'chrome');

        if ( sendRecord(recordData) ) {
            setNewSample();
            clearMediaRecorderState();
            setIsRecordStop(false)
        }
    }

    return (
        <div className='recording__wrap'>
            <NavBar />
            <main className='recording'>     
                <div className='recording__textarea'>
                    <span className='textarea'>
                      {transcription}
                    </span>
                </div>
                <div className='recording__button--wrap'>
                    <button className={isRecording ? 'recording__button recording__button--on' : 'recording__button recording__button--off' } onClick={handleRecording} disabled={isRecordStop}>
                        <img src={ Microphone } alt="microphone icon"></img>
                    </button>
                    <button className='play__button' onClick={playRecord} disabled={!isRecordStop}>
                        <img src={ PlayIcon } alt="microphone icon" />
                    </button>
                    <button className='send__button' onClick={handleSend} disabled={!isRecordStop}>
                        <img src={ SendIcon } alt="microphone icon" />
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Recording;