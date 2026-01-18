import React, { ReactNode } from "react";

export type ComponentWithChildren = {
    className?: string;
    children: ReactNode;
};

export type ComponentWithTextProps = {
    text?: string;
    className?: string;
};

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export type InputProps = {
    type: InputType;
    id?: string;
    label?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
};

export type ButtonType = 'submit' | 'reset' | 'button';

export type ThemeMode = 'dark' | 'light';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
