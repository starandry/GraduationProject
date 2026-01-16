import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast, Toast as ToastType } from '../../model/toastSlice';
import styles from './toast.module.scss';

interface ToastProps {
    toast: ToastType;
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
    const [isExiting, setIsExiting] = useState(false);
    const dispatch = useDispatch();
    const duration = toast.duration || 5000;

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            dispatch(removeToast(toast.id));
        }, 300); // Match animation duration
    }, [dispatch, toast.id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, handleClose]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
                return 'ℹ';
            default:
                return 'ℹ';
        }
    };

    const getToastClass = () => {
        const baseClass = isExiting ? `${styles.toast} ${styles.toastExiting}` : styles.toast;

        switch (toast.type) {
            case 'success':
                return `${baseClass} ${styles.toastSuccess}`;
            case 'error':
                return `${baseClass} ${styles.toastError}`;
            case 'warning':
                return `${baseClass} ${styles.toastWarning}`;
            case 'info':
                return `${baseClass} ${styles.toastInfo}`;
            default:
                return `${baseClass} ${styles.toastInfo}`;
        }
    };

    return (
        <div className={getToastClass()}>
            <span className={styles.toastIcon}>{getIcon()}</span>
            <span className={styles.toastContent}>{toast.message}</span>
            <button className={styles.toastClose} onClick={handleClose}>
                ×
            </button>
            {!isExiting && (
                <div
                    className={styles.progressBar}
                    style={{ animationDuration: `${duration}ms` }}
                />
            )}
        </div>
    );
};

/**
 * ToastContainer - renders all active toasts
 */
export const ToastContainer: React.FC = () => {
    const toasts = useSelector((state: { toast: { toasts: ToastType[] } }) => state.toast.toasts);

    if (toasts.length === 0) {
        return null;
    }

    return (
        <div className={styles.toastContainer}>
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
};
