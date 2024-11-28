import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../stores/store';
import { logout } from '../../../stores/slices/authSlice';

import styles from './logout.module.scss';

const Logout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={styles.logout} onClick={handleLogout}>
            <span>Logout</span>
        </div>
    );
};

export { Logout };
