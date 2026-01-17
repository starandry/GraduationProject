import React, { FC } from 'react';
import styles from './input.module.scss';
import { InputProps } from '../../types';
import {useSelector} from "react-redux";

const Input: FC<InputProps> = ({ type, id, label, value, onChange, placeholder, required = false, className,
                                   containerClassName = '', labelClassName = '' }) => {
    const safeClassName = className || '';
    let inputClassName = `${styles.input} ${safeClassName}`;
    const containerClass = `${styles.inputContainer} ${containerClassName}`;
    let labelClass = `${styles.label} ${labelClassName}`;
    const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark);

    if (!isDark) {
        labelClass = `${styles.label} ${labelClassName} ${styles.labelLight}`;
        inputClassName = `${styles.input} ${safeClassName} ${styles.inputLight}`;
    }

    return (
        <div className={containerClass}>
            {label ? (
                <label htmlFor={id} className={labelClass}>
                    {label}
                </label>
            ) : null}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={inputClassName}
            />
        </div>
    );
};

export { Input };
