import React from 'react';
import styles from './errorMessage.module.scss';
import { useThemeStyles } from '../../../entities/theme/lib/useThemeStyles';

interface ErrorMessageProps {
    message: string;
    className?: string;
}

/**
 * ErrorMessage - displays error messages with theme support
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
    const getThemeClass = useThemeStyles(styles);

    return (
        <div className={`${getThemeClass('errorMessage')} ${className}`}>
            <p>{message}</p>
        </div>
    );
};
