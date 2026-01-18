import { FC, ReactNode } from 'react';
import { ButtonType } from '../../types';

type ButtonProps = {
    className?: string;
    type?: ButtonType;
    children: ReactNode;
    onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className = '', type = 'submit', children, onClick }) => (
    <button type={type} className={className} onClick={onClick}>
        {children}
    </button>
);

export { Button };
