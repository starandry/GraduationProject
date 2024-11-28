import React, { FC } from 'react';
import styles from './input.module.scss';
import {InputProps} from "../../../types";

const Input: FC<InputProps> = ({ type, id, label, value, onChange, onInput, placeholder, required = false, className,
                                   containerClassName, labelClassName }) => {
    const inputClassName = `${styles.input} ${className || ''}`;
    const containerClass = `${styles.inputContainer} ${containerClassName || ''}`;
    const labelClass = `${styles.label} ${labelClassName || ''}`;

    return (
        <div className={containerClass}>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                onInput={onInput}
                placeholder={placeholder}
                required={required}
                className={inputClassName}
            />
        </div>
    );
};

export { Input };

