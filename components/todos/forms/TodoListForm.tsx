import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useNotification from "../../../hooks/useNotification";
import { deleteTodoList } from "../../../lib/todos/todo-list-api";
import { Size } from "../../../models/design-models";

import { TodoList, TodoListProperties } from "../../../models/todo-models/TodoList";
import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/design-elements/LoadingSpinner";
import EditDelete from "../../ui/icons/EditDelete";
import DeleteModal from "../../ui/modal/modal-variation/DeleteModal";
import { NotifStatus } from "../../ui/Notification";
import classes from "./TodoListForm.module.scss";

interface Props {
    onSubmit: (newProps: TodoListProperties, isNew: boolean) => Promise<boolean>;
    onDelete?: () => void;
    onEditing: React.Dispatch<React.SetStateAction<boolean>>;
    initialList: TodoList | null | undefined;
    isEditing: boolean;
}

interface TodoListData {
    name: string;
    description: string;
}

const TodoForm: React.FC<Props> = (props) => {
    const { onSubmit, onDelete, initialList, isEditing, onEditing } = props;
    const isNew = !initialList;
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { setNotification } = useNotification();
    const router = useRouter();

    const {
        register,
        watch,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TodoListData>();

    const submitHandler = async (data: TodoListData) => {
        setIsLoading(true);
        const isSuccess = await onSubmit(data, isNew);
        if (isSuccess) onEditing(false);
        setIsLoading(false);
    };

    const deleteHandler = async () => {
        if (!initialList) return;
        setNotification(NotifStatus.PENDING);
        setShowDeleteModal(false);
        // Send delete request.
        const { isSuccess, message } = await deleteTodoList(initialList.id);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            router.push("/");
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return (
        <>
            {showDeleteModal && (
                <DeleteModal
                    targetName={initialList ? initialList.name : "your list"}
                    onAction={deleteHandler}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
            <form
                onSubmit={handleSubmit(submitHandler)}
                className={`${classes.form} ${!isEditing ? classes["form-read-only"] : ""}`}
            >
                {initialList && (
                    <EditDelete
                        isEditing={isEditing}
                        onEdit={onEditing}
                        onDelete={() => setShowDeleteModal(true)}
                    />
                )}
                <div className={classes.control}>
                    {isEditing && <label htmlFor='list-name'>Name</label>}
                    <input
                        type='text'
                        id='list-name'
                        {...register("name", {
                            required: "TodoList name is required!",
                            minLength: { value: 3, message: "Minimum 3 characters" },
                            maxLength: { value: 50, message: "Maximum 50 characters" },
                        })}
                        aria-invalid={!!errors.name}
                        defaultValue={initialList ? initialList.name : ""}
                    />
                    {initialList && !isEditing && (
                        <h3 className={`${classes.text}`}>{initialList.name}</h3>
                    )}
                    {errors.name && <p className={classes.error}>{errors.name.message}</p>}
                </div>
                <div className={classes.control}>
                    {isEditing && <label htmlFor='list-desc'>Description</label>}
                    <textarea
                        id='list-desc'
                        // cols={30}
                        rows={3}
                        {...register("description", {
                            maxLength: { value: 200, message: "Maximum 200 characters" },
                        })}
                        aria-invalid={!!errors.description}
                        defaultValue={initialList ? initialList.description : ""}
                    />
                    {initialList && !isEditing && (
                        <p className={classes.text}>{initialList.description}</p>
                    )}
                    {errors.description && (
                        <p className={classes.error}>{errors.description.message}</p>
                    )}
                </div>

                <div className={classes.action}>
                    {isLoading && <LoadingSpinner size={Size.MEDIUM} />}
                    {!isLoading && (
                        <Button type='submit' className={classes.btn}>
                            <span>Submit</span>
                        </Button>
                    )}
                </div>
            </form>
        </>
    );
};

export default TodoForm;
