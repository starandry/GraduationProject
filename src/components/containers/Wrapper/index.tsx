import React from 'react';
import styles from './wrapper.module.scss';
import { ComponentWithChildren } from '../../../types'

const Wrapper: React.FC<ComponentWithChildren> = ({ className = '', children }) => {
    const computedClassName = styles[className] ? styles[className] : className;

    return <div className={computedClassName}>
        {children}
    </div>;
};

export { Wrapper };
