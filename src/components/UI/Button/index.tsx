import React, { FC } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
    onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className = '', type = 'submit', children/*, onClick*/ }) => {
    const computedClassName = `${styles.button} ${className}`;

    return (
        <button type={type} className={computedClassName} /*onClick={onClick}*/>
            {children}
        </button>
    );
};

export { Button };



