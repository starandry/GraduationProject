import React from 'react';
import styles from './copyright.module.scss';
import {useLocation} from "react-router-dom";

export type CopyrightProps = {
    className?: keyof typeof styles;
}

const Copyright: React.FC<CopyrightProps> = ({ className }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    let compCopyright;

    if (currentPath === '/settings') {
        compCopyright = styles.settCopyright;
    } else if (currentPath.startsWith('/movie/')) {
        compCopyright = styles.copyrightMovie;
    } else {
        compCopyright = styles.copyright;
    }

    return (
        <p className={`${compCopyright} ${className || ''}`}>
            © All Rights Reserved
        </p>
    );
};

export { Copyright };

