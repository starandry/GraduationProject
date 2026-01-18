import React, { FC } from 'react';

type ButtonProps = {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
    onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className = '', type = 'submit', children, onClick }) => (
    <button type={type} className={className} onClick={onClick}>
        {children}
    </button>
);

export { Button };
