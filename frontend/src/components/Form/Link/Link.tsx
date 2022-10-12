import React from 'react';

interface LinkProps {
    className: string;
    href: string;
    children: string;
    src?: string;
    alt?: string;
}

const Link = ( { className, href, children, src, alt }:LinkProps ):JSX.Element => {

    const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

        window.history.pushState({}, "", href)
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return src ? 

        <a className={className} href={href} onClick={onClick}>
            <img src={ src } alt={alt} />
            {children}
        </a>

        :

        <a className={className} href={href} onClick={onClick}>
            {children}
        </a>
};

export default Link;