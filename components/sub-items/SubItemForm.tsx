import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusMinus } from '@fortawesome/pro-duotone-svg-icons';

import { Error, validateName } from '../../utilities/form-utils/validation-util';

interface Props {
    onAdd: (name: string) => void;
}

const SubTaskForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState('');
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
        setName('');
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const errorCheck: Error = validateName(newName, false); // Do not validate emptyness.
        setError(errorCheck);
        setName(newName);
    };

    return (
        <form onSubmit={submitHandler} className={`mt-auto`}>
            <div
                className={`p-2 md:max-w-[99%] lg:max-w-[95%] flex items-center border-2 border-slate-300 rounded-md shadow-xl ${
                    error.hasError ? 'border-rose-300' : ''
                }`}
            >
                <button
                    type="submit"
                    className="lg:w-10 lg:h-10 flex items-center justify-center backdrop-blur-sm text-slate-400 hover:bg-slate-400 hover:text-slate-50 rounded-full cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={faPlusMinus}
                        className={`max-w-[2.3rem] text-2xl`}
                    />
                </button>
                <input
                    type="text"
                    placeholder="Add Sub Task"
                    id="subtask-input"
                    name="subtask-input"
                    value={name}
                    onChange={nameHandler}
                    className="focus:outline-none bg-inherit ml-3 flex-1"
                />
            </div>
            {error.message && <p className="text-rose-600 mt-2">{error.message}</p>}
        </form>
    );
};

export default SubTaskForm;
