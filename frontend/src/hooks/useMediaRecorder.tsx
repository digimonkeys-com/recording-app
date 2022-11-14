import React from 'react';

import { MediaRecorderData } from '../types/types'
import { detectBrowserName } from '../helpers/browserDetect'

const useMediaRecorder = (): MediaRecorderData => {
    const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder>(new MediaRecorder(new MediaStream()));
    const [audioBlob, setAudioBlob] = React.useState<Blob>(null);
    const [audioUrl, setAudioUrl] = React.useState('');

    const constraints = { audio: true, video: false };
    const browserName = detectBrowserName();

    console.log(browserName)

    React.useEffect(() => {
        recorderInit();
    }, [])

    const recorderInit = (): void => {
        if (!navigator.mediaDevices) return;

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                let newChunks: BlobPart[] = []
                let newMediaRecorder: MediaRecorder;

                if (browserName === 'firefox') {
                    newMediaRecorder = new MediaRecorder(stream, {mimeType:'audio/ogg;codecs=opus'})
                } else if(browserName === 'safari') {
                    newMediaRecorder = new MediaRecorder(stream, {mimeType:'audio/mp4;codecs=opus'})
                } else {
                    newMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
                }

                newMediaRecorder.addEventListener('dataavailable', event => {
                    const data = event.data;

                    if (data && data.size > 0) newChunks.push(data);
                });

                newMediaRecorder.addEventListener('stop', () => {
                    const newBlob = new Blob(newChunks, { type: newMediaRecorder.mimeType });
                    const newAudioUrl = URL.createObjectURL(newBlob);
                    setAudioBlob(newBlob);
                    setAudioUrl(newAudioUrl);
                    newChunks = []
                })
                setMediaRecorder(newMediaRecorder);
            });
    };

    const startRecording = (): void => {
        mediaRecorder.start();
    }

    const stopRecording = (): void => {
        mediaRecorder.stop();
    }

    const playRecord = (): void => {
        const audio = new Audio(audioUrl);
        audio.play();
    }

    const clearMediaRecorderState = (): void => {
        setAudioUrl('');
        setAudioBlob(null);
    }

    const prepereRecord = (): Blob => {
        return audioBlob;
    }

    return { startRecording, stopRecording, playRecord, prepereRecord, clearMediaRecorderState }
}

export default useMediaRecorder;


