import React, { FC } from 'react';
import styles from './input.module.scss';
import {InputProps} from "../../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";

const Input: FC<InputProps> = ({ type, id, label, value, onChange, onInput, placeholder, required = false, className,
                                   containerClassName, labelClassName }) => {
    let inputClassName = `${styles.input} ${className || ''}`;
    const containerClass = `${styles.inputContainer} ${containerClassName || ''}`;
    let labelClass = `${styles.label} ${labelClassName || ''}`;
    const isDark = useSelector((state: RootState) => state.theme.isDark);

    if (!isDark) {
        labelClass = `${styles.label} ${labelClassName} ${styles.labelLight}`;
        inputClassName = `${styles.input} ${className} ${styles.inputLight}`;
    }

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

