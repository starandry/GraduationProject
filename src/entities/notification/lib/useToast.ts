import { useDispatch } from 'react-redux';
import { addToast, ToastType } from '../model/toastSlice';

/**
 * Custom hook for showing toast notifications
 *
 * @example
 * const toast = useToast();
 * toast.success('User registered successfully!');
 * toast.error('Failed to load movies');
 * toast.warning('Session expiring soon');
 * toast.info('New features available');
 */
export const useToast = () => {
    const dispatch = useDispatch();

    const showToast = (message: string, type: ToastType, duration?: number) => {
        dispatch(addToast({ message, type, duration }));
    };

    return {
        success: (message: string, duration?: number) => showToast(message, 'success', duration),
        error: (message: string, duration?: number) => showToast(message, 'error', duration),
        warning: (message: string, duration?: number) => showToast(message, 'warning', duration),
        info: (message: string, duration?: number) => showToast(message, 'info', duration),
    };
};
