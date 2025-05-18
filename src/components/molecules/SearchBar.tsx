import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    ArrowPathIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface SearchBarProps {
    onSearch: (params: unknown) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchParams, setSearchParams] = useState({
        title: "",
        description: "",
        completed: "",
        created_from: "",
        created_to: "",
        updated_from: "",
        updated_to: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(searchParams).filter(([_, v]) => v !== "")
        );
        onSearch(params);
        setIsExpanded(false);
    };

    const handleReset = () => {
        setSearchParams({
            title: "",
            description: "",
            completed: "",
            created_from: "",
            created_to: "",
            updated_from: "",
            updated_to: "",
        });
        onSearch({});
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={toggleExpand}
            >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Filter by
                </h2>
                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand();
                    }}
                >
                    {isExpanded ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </button>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit} className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Title
                            </label>
                            <Input
                                type="text"
                                name="title"
                                value={searchParams.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <Input
                                type="text"
                                name="description"
                                value={searchParams.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Completed
                            </label>
                            <select
                                name="completed"
                                value={searchParams.completed}
                                onChange={(e) =>
                                    setSearchParams((prev) => ({
                                        ...prev,
                                        completed: e.target.value,
                                    }))
                                }
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All</option>
                                <option value="true">Completed</option>
                                <option value="false">Pending</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Created From
                            </label>
                            <Input
                                type="datetime-local"
                                name="created_from"
                                value={searchParams.created_from}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Created To
                            </label>
                            <Input
                                type="datetime-local"
                                name="created_to"
                                value={searchParams.created_to}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Updated From
                            </label>
                            <Input
                                type="datetime-local"
                                name="updated_from"
                                value={searchParams.updated_from}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Updated To
                            </label>
                            <Input
                                type="datetime-local"
                                name="updated_to"
                                value={searchParams.updated_to}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                            className="flex justify-center items-center"
                        >
                            <ArrowPathIcon className="h-5 w-5 mr-2" />
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex justify-center items-center"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                            Search
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SearchBar;
