import React, { useCallback, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

import TaskAdd from '../../../planners/planner-crud/TaskAdd';
import EventAdd from '../../events/EventAdd';
import classes from './ItemCreateButton.module.scss';

interface Props {
    onInvalidate: () => void;
    beginningPeriod: Date;
    className?: string;
}

const ItemCreate: React.FC<Props> = ({ onInvalidate, beginningPeriod, className }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showTaskAdd, setShowTaskAdd] = useState(false);
    const [shwoEventAdd, setShowEventAdd] = useState(false);

    const taskAddHandler = useCallback(() => {
        onInvalidate();
        setShowTaskAdd(false);
    }, [onInvalidate]);

    const eventAddHandler = useCallback(() => {
        onInvalidate();
        setShowEventAdd(false);
    }, [onInvalidate]);

    return (
        <div className={`mx-auto max-w-[7rem] relative text-lg ${className || ''}`}>
            <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className={`${classes['create-button']}`}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className={`inline max-w-[1.3rem] max-h-[1.3rem] text-xl ${classes.icon}`}
                />{' '}
                <span className={classes.text}>Create</span>
            </button>
            {showDropdown && (
                <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                    <div className="w-[100%] absolute z-10 top-[105%] flex flex-col">
                        <button
                            onClick={() => setShowEventAdd(true)}
                            className="py-2 px-4 rounded-sm bg-slate-50 text-slate-500 transition-all hover:bg-gray-700 hover:text-sky-50 hover:brightness-110 border-x-2 border-t-2 border-slate-300"
                        >
                            Event
                        </button>
                        <button
                            onClick={() => setShowTaskAdd(true)}
                            className="py-2 px-4 rounded-sm bg-slate-50 text-slate-500 transition-all hover:bg-gray-700 hover:text-blue-50 hover:brightness-110 border-x-2 border-y-2 border-slate-300"
                        >
                            Task
                        </button>
                    </div>
                </ClickAwayListener>
            )}
            {showTaskAdd && (
                <TaskAdd
                    onClose={() => setShowTaskAdd(false)}
                    onAddTask={taskAddHandler}
                    beginningPeriod={beginningPeriod}
                />
            )}
            {shwoEventAdd && (
                <EventAdd
                    onClose={() => setShowEventAdd(false)}
                    onAdd={eventAddHandler}
                    beginningPeriod={beginningPeriod}
                />
            )}
        </div>
    );
};

export default ItemCreate;
