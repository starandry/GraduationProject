import React, { FC } from 'react';
import styles from './link.module.scss';

type LinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

const CLink: FC<LinkProps> = ({ href, children, className }) => {
    return (
        <a href={href} className={`${styles.link} ${className ? styles[className] : ''}`}>
            {children}
        </a>
    );
};

export { CLink };
