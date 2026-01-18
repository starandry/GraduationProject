import { useState, useCallback, ChangeEvent } from 'react';

/**
 * Custom hook for form state management
 * Reduces boilerplate in form components
 *
 * @example
 * const { values, handleChange, reset } = useForm({ email: '', password: '' });
 * <input value={values.email} onChange={handleChange('email')} />
 */
export const useForm = <T extends Record<string, string>>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = useCallback(
        (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
            setValues(prev => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const reset = useCallback(() => setValues(initialValues), [initialValues]);

    const setValue = useCallback(
        (field: keyof T, value: string) => {
            setValues(prev => ({ ...prev, [field]: value }));
        },
        []
    );

    return { values, handleChange, reset, setValue, setValues };
};
