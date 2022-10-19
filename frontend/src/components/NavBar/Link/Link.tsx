import React from 'react';

import { LinkProps } from '../../../types/types';

const Link = ( { className, href, children, src, alt }:LinkProps ): JSX.Element => {

    const navigate = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

        window.history.pushState({}, "", href)
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return src ? 

        <a className={className} href={href} onClick={navigate}>
            <img src={ src } alt={alt} />
            {children}
        </a>

        :

        <a className={className} href={href} onClick={navigate}>
            {children}
        </a>
};

export default Link;