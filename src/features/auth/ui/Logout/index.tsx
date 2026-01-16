import React from 'react';
import { logout } from '../../model/authSlice';
import { useAppDispatch } from '../../../../app/store/hooks';

import styles from './logout.module.scss';

const Logout: React.FC = () => {
    const dispatch = useAppDispatch();

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
