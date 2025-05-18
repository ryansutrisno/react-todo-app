import React, { useState } from "react";
import {
    PencilIcon,
    TrashIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import type { Todo, TodoListProps } from "../../types/todo";

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const handleEdit = (todo: Todo) => {
        setEditingId(todo.id as number);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleSave = (id: number) => {
        onUpdate(id, editTitle, editDescription);
        setEditingId(null);
    };

    if (todos.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center text-gray-500 dark:text-gray-400">
                No todos found
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                    {editingId === todo.id ? (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Title
                                </label>
                                <Input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <TextArea
                                    rows={4}
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="secondary"
                                    onClick={handleCancel}
                                    className="flex justify-center items-center"
                                >
                                    <XMarkIcon className="h-5 w-5 mr-1" />
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => handleSave(todo.id as number)}
                                    className="flex justify-center items-center"
                                >
                                    <CheckIcon className="h-5 w-5 mr-1" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        {todo.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {todo.description}
                                </p>
                                <div className="mt-2 flex items-center">
                                    {todo.completed ? (
                                        <button
                                            onClick={() =>
                                                onUpdate(
                                                    todo.id as number,
                                                    todo.title,
                                                    todo.description,
                                                    false
                                                )
                                            }
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-pointer hover:bg-green-200 dark:hover:bg-green-800"
                                        >
                                            Completed
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                onUpdate(
                                                    todo.id as number,
                                                    todo.title,
                                                    todo.description,
                                                    true
                                                )
                                            }
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800"
                                        >
                                            Pending
                                        </button>
                                    )}
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        Created:{" "}
                                        {new Date(todo.created_at as string).toLocaleString()}
                                    </span>
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        Updated:{" "}
                                        {new Date(todo.updated_at as string).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="secondary" onClick={() => handleEdit(todo)}>
                                    <PencilIcon className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(todo.id as number)}
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TodoList;
