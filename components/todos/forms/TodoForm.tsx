import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

import { validateName, Error } from "../../../utilities/form-utils/validation-util";
import { useAppSelector } from "../../../store/redux";

interface Props {
    onAdd: (text: string) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState<Error>({ hasError: false, message: null });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const errorCheck: Error = validateName(name);
        if (errorCheck.hasError) {
            setError(errorCheck);
            return;
        }
        setError(errorCheck); // Valid (no error)
        onAdd(name);
        setName("");
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const errorCheck: Error = validateName(newName, false); // Do not validate emptyness.
        setError(errorCheck);
        setName(newName);
    };

    const theme = useAppSelector((state) => state.todoList.currentActiveTheme);

    return (
        <form
            onSubmit={submitHandler}
            className={`mt-5 min-w-[27rem text-slate-700 text-lg`}
            id="todo-form"
        >
            <div
                className={`p-2 flex items-center bg-white border-2 border-slate-200 rounded-md shadow-md focus-within:opacity-100 focus-within:bg-slate-50 focus-within:shadow-lg focus-within:border-blue-300 focus-within:opacity-100 ${
                    error.hasError ? "border-rose-300" : ""
                } ${theme ? "opacity-80" : ""}`}
            >
                <button
                    type="submit"
                    className="lg:w-10 lg:h-10 flex items-center justify-center backdrop-blur-sm text-slate-400 hover:bg-blue-400 hover:brightness-80 hover:text-slate-50 rounded-full cursor-pointer"
                >
                    <FontAwesomeIcon icon={faPlus} className={`max-w-[2.3rem] text-2xl`} />
                </button>
                <input
                    type="text"
                    placeholder="Add Todo"
                    id="todo-input"
                    name="todo-input"
                    value={name}
                    onChange={nameHandler}
                    className="focus:outline-none bg-inherit ml-3 flex-1"
                    autoFocus
                />
            </div>
            {error.message && <p className="text-rose-600 mt-2">{error.message}</p>}
        </form>
    );
};

export default TodoForm;
