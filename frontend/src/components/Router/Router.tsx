import * as React from 'react';

import { RouteProps } from '../../types/types';

const Route = ( { path, children }: RouteProps ): JSX.Element => {
    const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

    React.useEffect(() => {
        const onLocationChange = (): void => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate' , onLocationChange)

        return () => {
            window.removeEventListener('popstate', onLocationChange)
        }
    },[])

    return currentPath === path ? children : null;
}

export default Route;
