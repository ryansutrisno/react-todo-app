import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    rows?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    className,
    error,
    rows = 3,
    ...props
}, ref) => {
    return (
        <div>
            <textarea
                ref={ref}
                rows={rows}
                className={twMerge(
                    'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500',
                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
                    'dark:bg-gray-700 dark:text-white resize-none',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;