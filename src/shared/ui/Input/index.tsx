import React, { FC } from 'react';
import styles from './input.module.scss';
import { InputProps } from '../../types';
import { useSelector } from "react-redux";

const Input: FC<InputProps> = ({ type, id, label, value, onChange, placeholder, required = false, className,
                                   containerClassName = '', labelClassName = '' }) => {
    const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark);
    const inputClassName = `${styles.input} ${className || ''} ${!isDark ? styles.inputLight : ''}`;
    const labelClass = `${styles.label} ${labelClassName} ${!isDark ? styles.labelLight : ''}`;

    return (
        <div className={`${styles.inputContainer} ${containerClassName}`}>
            {label && <label htmlFor={id} className={labelClass}>{label}</label>}
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
