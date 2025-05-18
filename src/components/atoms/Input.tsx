import React, { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
    className, 
    error, 
    showPasswordToggle = false,
    type = 'text',
    ...props 
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const inputType = showPasswordToggle && type === 'password' 
        ? (showPassword ? 'text' : 'password') 
        : type;

    return (
        <div className="relative">
            <input
                ref={ref}
                type={inputType}
                className={twMerge(
                    'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500',
                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
                    showPasswordToggle ? 'pr-10' : '',
                    'dark:bg-gray-700 dark:text-white',
                    className
                )}
                {...props}
            />
            {showPasswordToggle && type === 'password' && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                        <EyeIcon className="h-5 w-5" />
                    )}
                </button>
            )}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;