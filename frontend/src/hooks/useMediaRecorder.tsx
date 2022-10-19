import React from 'react';
import fixWebmDuration from "fix-webm-duration";

const useMediaRecorder = () => {
    const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder>(new MediaRecorder(new MediaStream()));
    const [chunks, setChunks] = React.useState<BlobPart[]>([]);
    const [duration, setDuration] = React.useState(0);
    const [startTime, setStartTime] = React.useState(0);
    const [audioBlob, setAudioBlob] = React.useState(new Blob());
    const [audioUrl, setAudioUrl] = React.useState('');

    const constraints = { audio: true, video: false };

    React.useEffect(() => {
        recorderInit();
    }, [])

    const recorderInit = (): void => {
        if (!navigator.mediaDevices) return;

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });

                newMediaRecorder.addEventListener('dataavailable', event => {
                    const data = event.data;

                    if (data && data.size > 0) {
                        let newChunks = chunks;
                        newChunks.push(data);
                        setChunks(newChunks);
                    }
                });

                newMediaRecorder.addEventListener('stop', () => {
                    const durationTime = Date.now() - startTime;
                    setDuration(durationTime);

                    const newBlob = new Blob(chunks, { type: newMediaRecorder.mimeType });
                    const newAudioUrl = URL.createObjectURL(newBlob);
                    setAudioBlob(newBlob);
                    setAudioUrl(newAudioUrl);
                })

                setMediaRecorder(newMediaRecorder);
            });
    };

    const startRecording = (): void => {
        mediaRecorder.start();
        setStartTime(Date.now());
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
        setAudioBlob(new Blob());
        setChunks([]);
        setDuration(0);
        setStartTime(0);
    }

    const prepereRecord = async (): Promise<Blob> => {
        let blob = audioBlob;
        let newDuration = duration;
        const fixedBlob = await fixWebmDuration(blob, newDuration);
        return fixedBlob;
    }

    return { startRecording, stopRecording, playRecord, prepereRecord, clearMediaRecorderState }
}

export default useMediaRecorder;


