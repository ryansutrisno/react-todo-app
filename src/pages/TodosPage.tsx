import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTodos,
    searchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} from "../stores/todoSlice";
import type { RootState } from "../stores/store";
import { toast } from "react-toastify";
import TodoForm from "../components/organisms/TodoForm";
import TodoList from "../components/organisms/TodoList";
import SearchBar from "../components/molecules/SearchBar";
import Header from "../components/molecules/Header";
import { logout } from "../stores/authSlice";
import { useNavigate } from "react-router-dom";
import type { Todo } from "../types/todo";

const TodosPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { todos, loading, error, searchResults } = useSelector(
        (state: RootState) => state.todos
    );
    const { token } = useSelector((state: RootState) => state.auth);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(fetchTodos() as never);
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleSearch = (params: unknown) => {
        if (
            params &&
            typeof params === "object" &&
            Object.keys(params).length > 0
        ) {
            dispatch(searchTodos(params) as never);
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    };

    const handleAddTodo = async (title: string, description: string) => {
        try {
            await dispatch(addTodo({ title, description }) as never);
            toast.success("Todo successfully added");
            dispatch(fetchTodos() as never);
        } catch (error) {
            console.error("Error adding todo:", error);
            toast.error("Failed to add todo");
        }
    };

    const handleUpdateTodo = async (
        id: number,
        title: string,
        description: string,
        completed?: boolean
    ) => {
        try {
            await dispatch(
                updateTodo({ id, title, description, completed }) as never
            );

            if (completed !== undefined) {
                toast.success(`Todo marked as ${completed ? "completed" : "pending"}`);
            } else {
                toast.success("Todo updated successfully");
            }
            dispatch(fetchTodos() as never);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to update todo");
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await dispatch(deleteTodo(id) as never);
            toast.success("Todo deleted successfully");
            dispatch(fetchTodos() as never);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to delete todo");
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        toast.success("Logged out successfully");
    };

    const displayedTodos = isSearching ? searchResults : todos;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header onLogout={handleLogout} />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        My Todos
                    </h1>
                    <div className="mb-8">
                        <TodoForm onSubmit={handleAddTodo} />
                    </div>
                    <div className="mb-6">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    {loading && !displayedTodos.length ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse"
                                >
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <TodoList
                            todos={displayedTodos as unknown as Todo[]}
                            onUpdate={handleUpdateTodo}
                            onDelete={handleDeleteTodo}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodosPage;
