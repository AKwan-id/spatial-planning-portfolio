import React, { useState, useEffect, useCallback, useRef } from 'react';

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onDebouncedChange: (value: string) => void;
    debounceMs?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
    value,
    onDebouncedChange,
    debounceMs = 500,
    ...props
}) => {
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Sync with external value changes (e.g. Translate button updates)
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            onDebouncedChange(newValue);
        }, debounceMs);
    };

    return <input value={localValue} onChange={handleChange} {...props} />;
};

interface DebouncedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onDebouncedChange: (value: string) => void;
    debounceMs?: number;
}

export const DebouncedTextarea: React.FC<DebouncedTextareaProps> = ({
    value,
    onDebouncedChange,
    debounceMs = 500,
    ...props
}) => {
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            onDebouncedChange(newValue);
        }, debounceMs);
    };

    return <textarea value={localValue} onChange={handleChange} {...props} />;
};
