import React from "react";
import {
    MoonIcon,
    SunIcon,
    ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Button from "../atoms/Button";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    <Link to="/">Todo App</Link>
                </h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? (
                            <SunIcon className="h-6 w-6 text-yellow-400" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                    <Button
                        variant="secondary"
                        onClick={onLogout}
                        className="flex justify-center items-center"
                    >
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
