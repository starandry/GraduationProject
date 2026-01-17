import React, {ReactNode} from "react";

export type ComponentWithChildren = {
    className?: string;
    children: ReactNode;
};

export type ComponentWithTextProps = {
    text: string;
    className?: string;
};

export type InputProps = {
    type: string;
    id?: string;
    label?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
};
