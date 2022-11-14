import useLocalStorage from './useLocalStorage';
import { SignInAndUpData, TextSampleData, RecordData, StatusData, UploadFileProps } from '../types/types'
import { _fetch } from '../helpers/fetchProvider';
import { serverEndpoints } from '../helpers/configs';

const useFetch = () => {
    const { getLocalStorage } = useLocalStorage();
    const { access_token } = getLocalStorage() || {};
    const { sample, status, recording, login, register } = serverEndpoints;

    const uploadFile = (props: UploadFileProps): Promise<string> => {
        const { textData } = props;
        const additionalPath = sample;
        const options = { 
            method: 'POST', 
            body: JSON.stringify(textData),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` } 
        };

        return _fetch({ additionalPath, options });
    };

    const getStatus = (): Promise<StatusData> => {
        const additionalPath = status;
        const options = { 
            method: 'GET', 
            headers: { Authorization: `Bearer ${access_token}` } 
        };

        return _fetch({ additionalPath, options });
    };

    const sendRecord = (recordData: FormData): Promise<RecordData> => {
        const additionalPath = recording;
        const options = { 
            method: 'POST', 
            body: recordData, 
            headers: { Authorization: `Bearer ${access_token}` } 
        };

        return _fetch({additionalPath, options});
    };

    const getTextSample = (): Promise<TextSampleData> => {
        const additionalPath = sample;
        const options = {
             method: 'GET', 
             headers: { Authorization: `Bearer ${access_token}` } 
        };

        return _fetch({ additionalPath, options });
    };

    const userSignIn = (userData: URLSearchParams): Promise<SignInAndUpData> => {
        const additionalPath = login;
        const options = { 
            method: 'POST', 
            body: userData,
        }

        return _fetch({ additionalPath, options })
    };

    const userSignUp = (userData: URLSearchParams): Promise<SignInAndUpData> => {
        const additionalPath = register;
        const options = { 
            method: 'PUT', 
            body: userData,  
        }

        return _fetch({ additionalPath, options })
    };

    return { userSignIn, userSignUp, getTextSample, sendRecord, getStatus, uploadFile }
}

export default useFetch;
