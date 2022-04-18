import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-duotone-svg-icons";

import { Todo, TodoProps } from "../../../models/todo-models/Todo";
import Modal from "../../ui/modal/Modal";
import DeleteModal from "../../ui/modal/modal-variation/DeleteModal";
import EditDeleteLong from "../../ui/icons/EditDeleteLong";
import TodoDetailInfo from "./TodoDetailInfo";
import SubTodoList from "../sub-todos/SubTodoList";
import useNotification from "../../../hooks/useNotification";
import { NotifStatus } from "../../ui/Notification";
import classes from "./TodoDetail.module.scss";
import { getFullDateFormat } from "../../../utilities/time-utils/date-format";

interface Props {
    todo: Todo;
    listName: string;
    onClose: () => void;
    onMutateTodo: (id: string, todoProps: TodoProps) => void;
    onDeleteTodo: (id: string) => Promise<{
        isSuccess: boolean;
        message: string;
    }>;
}

const TodoDetail: React.FC<Props> = (props) => {
    const { onClose, todo, listName, onMutateTodo, onDeleteTodo } = props;
    const [name, setName] = useState(todo.name);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { setNotification } = useNotification();

    const editHandler = (edit: boolean) => {
        setIsEditing(edit);
    };

    const deleteHandler = async () => {
        setNotification(NotifStatus.PENDING);
        const { isSuccess, message } = await onDeleteTodo(todo.id);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS);
            onClose();
        } else setNotification(NotifStatus.ERROR, message);
    };

    const mutationHandler = useCallback(
        (id: string, todoProps: TodoProps) => {
            onMutateTodo(id, { ...todoProps, name });
        },
        [onMutateTodo, name],
    );

    return (
        <Modal onClose={onClose} classes={`modal ${classes.modal}`}>
            <h2 className={classes.heading}>
                {!isEditing && <p className={classes.value}>{name}</p>}
                {isEditing && (
                    <input
                        type="text"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        className={classes["heading-input"]}
                    />
                )}
            </h2>
            <FontAwesomeIcon icon={faXmark} className={classes.exit} onClick={onClose} />
            <div
                className={`container overflow-y-scroll flex flex-col gap-[1.7rem] ${classes["content-body"]}`}
            >
                <div className={classes.action}>
                    <h3 className={classes["list-name"]}>{listName}</h3>
                    <EditDeleteLong
                        isEditing={isEditing}
                        onEdit={editHandler}
                        onDelete={() => setShowDeleteModal(true)}
                    />
                </div>
                <TodoDetailInfo todo={todo} onMutateTodo={mutationHandler} isEditing={isEditing} />
                <SubTodoList isEditing={isEditing} todoId={todo.id} />
            </div>
            <time className="text-[75%] pl-3 text-gray-400">
                Created at {getFullDateFormat(todo.createdAt)}
            </time>
            {showDeleteModal && (
                <DeleteModal
                    targetName={todo.name}
                    onClose={() => setShowDeleteModal(false)}
                    onAction={deleteHandler}
                />
            )}
        </Modal>
    );
};

export default TodoDetail;
