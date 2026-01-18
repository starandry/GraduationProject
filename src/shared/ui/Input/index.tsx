import { FC } from 'react';
import styles from './input.module.scss';
import { InputProps } from '../../types';
import { useSelector } from "react-redux";
import { cn } from '../../lib/cn';

type ThemeState = { theme: { isDark: boolean } };

const Input: FC<InputProps> = ({
    type,
    id,
    label,
    value,
    onChange,
    placeholder,
    required = false,
    className,
    containerClassName,
    labelClassName
}) => {
    const isDark = useSelector((state: ThemeState) => state.theme.isDark);

    return (
        <div className={cn(styles.inputContainer, containerClassName)}>
            {label && (
                <label htmlFor={id} className={cn(styles.label, labelClassName, !isDark && styles.labelLight)}>
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={cn(styles.input, className, !isDark && styles.inputLight)}
            />
        </div>
    );
};

export { Input };
