import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = "primary",
  className,
  ...props
}, ref) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";

  const variantClasses = {
    primary: "bg-sky-600 text-white hover:bg-indigo-700",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-700",
  };

  return (
    <button
      ref={ref}
      className={twMerge(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
