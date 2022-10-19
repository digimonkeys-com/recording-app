export interface SignInAndUpData {
    "access_token": string;
    "user_id": number;
}

export interface TextSampleData {
    "transcription": "string",
    "id": 0
}

export interface RecordData {
    "info": "string"
}

export interface StatusData {
    duration: number;
    all_samples: number;
    unrecorded_samples: number;
    recorded_samples: number;
}

export interface UploadFileProps {
    textData: { content: string; },
}

export interface FetchProps {
    options: any;
    additionalPath: string;
}

export interface SignedInUserData {
    access_token: string;
    user_id: number
}

export interface SignUpProps {
    showSnackBar: () => void;
}

export interface SignInProps {
    showSnackBar: () => void;
}

export interface LinkProps {
    className: string;
    href: string;
    children: string;
    src?: string;
    alt?: string;
}

export interface SnackBarProps {
    message: string;
    type: 'success' | 'error'
}

export interface RouteProps {
    path: string;
    children: JSX.Element | any;
}

export interface SampleData {
    "transcription": string;
    "id": number;
}
