import React from 'react'

import NavBar from '../NavBar/NavBar';
import Microphone from '../../assets/microphone.svg'
import PlayIcon from '../../assets/play.svg'
import useMediaRecorder from '../../hooks/useMediaRecorder';
import useFetch from '../../hooks/useFetch';
import { SampleData } from '../../types/types';

import './recording.css'

const Recording = (): JSX.Element => {
    const [ sample, setSample ] = React.useState<SampleData>(null);
    const [ isRecording, setIsRecording ] = React.useState(true)
    const [ playAudio, setPlayAudio ] = React.useState(true);
    const { startRecording, stopRecording, playRecord, prepereRecord, clearMediaRecorderState } = useMediaRecorder();
    const { getTextSample, sendRecord } = useFetch();
    const { transcription, id } = sample || {};

    React.useEffect(() => {
        const setNewSample = async () => {
            const newSample = await getTextSample();
            newSample && setSample(newSample)
        };
        setNewSample();
    },[]);

    const handleRecording = async (): Promise<void> => {
        isRecording ? startRecording() : stopRecording();

        setIsRecording(!isRecording);

        const preperedRecord = await prepereRecord();

        const recordData = new FormData();
        recordData.append('id' , id.toString());
        recordData.append('file' , preperedRecord);
        recordData.append('browser' , 'chrome');

        !isRecording && sendRecord(recordData) && clearMediaRecorderState();
    }

    const handleRecordActions = (): void => {
       playAudio && playRecord();
    }

    const iconOn = 'invert(12%) sepia(72%) saturate(7500%) hue-rotate(96deg) brightness(96%) contrast(101%)';
    const iconOff = 'invert(11%) sepia(76%) saturate(7498%) hue-rotate(344deg) brightness(105%) contrast(107%)';

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
                    <div className='recording__button' onClick={handleRecording} style={{ filter: isRecording ? iconOn : iconOff }}>
                        <img src={ Microphone } alt="microphone icon"></img>
                    </div>
                    <div className='recording__button' onClick={handleRecordActions} style={{  filter: playAudio ? iconOn : iconOff }}>
                        <img src={ PlayIcon } alt="microphone icon" onClick={() => setPlayAudio(!playAudio)}></img>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Recording;