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

    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    const typeStyles = { success: styles.toastSuccess, error: styles.toastError, warning: styles.toastWarning, info: styles.toastInfo };
    const baseClass = `${styles.toast} ${isExiting ? styles.toastExiting : ''} ${typeStyles[toast.type] || styles.toastInfo}`;

    return (
        <div className={baseClass}>
            <span className={styles.toastIcon}>{icons[toast.type] || 'ℹ'}</span>
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
