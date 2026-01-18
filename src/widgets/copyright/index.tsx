import React from 'react';
import styles from './copyright.module.scss';
import { useLocation } from "react-router-dom";

export type CopyrightProps = {
    className?: keyof typeof styles;
}

const Copyright: React.FC<CopyrightProps> = ({ className }) => {
    const path = useLocation().pathname;
    const baseClass = path === '/settings' ? styles.settCopyright
        : path.startsWith('/movie/') ? styles.copyrightMovie
        : styles.copyright;

    return (
        <p className={`${baseClass} ${className || ''}`}>
            © All Rights Reserved
        </p>
    );
};

export { Copyright };

