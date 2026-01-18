import React from 'react';
import styles from './footer.module.scss';

type FooterProps = {
    children: React.ReactNode;
    className?: string;
};

const Footer: React.FC<FooterProps> = ({ children, className }) => (
    <div className={`${styles.footer} ${className || ''}`}>
        {children}
    </div>
);

export { Footer };
