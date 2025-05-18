import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import TextArea from "../atoms/TextArea";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import type { TodoFormData, TodoFormProps } from "../../types/todo";

const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
});

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TodoFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmitForm = (data: TodoFormData) => {
        const title = data.title;
        const description = data.description;

        onSubmit(title, description)
            .then(() => {
                reset();
            })
            .catch(() => {
                toast.error("Error adding todo");
            });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Add New Todo
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                    </label>
                    <Input
                        type="text"
                        placeholder="Enter title"
                        {...register("title")}
                        error={errors.title?.message}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                    </label>
                    <TextArea
                        rows={4}
                        placeholder="Enter description"
                        {...register("description")}
                        error={errors.description?.message}
                    />
                </div>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex justify-center items-center"
                        disabled={isSubmitting}
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        {isSubmitting ? "Adding..." : "Add Todo"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default TodoForm;
