import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import TaskAdd from '../../../planners/planner-crud/TaskAdd';
import EventAdd from '../../events/EventAdd';
import ExitIcon from '../../../ui/icons/ExitIcon';

interface Props {
    onClose: () => void;
    onAdd: () => void;
    beginningPeriod: Date;
    className?: string; // overriding existing classes such as position
}

const ItemCreatePrompt: React.FC<Props> = ({ onAdd, onClose, beginningPeriod, className }) => {
    const [showEventAdd, setShowEventAdd] = useState(false);
    const [showTaskAdd, setShowTaskAdd] = useState(false);

    const eventShowHandler = (show: boolean) => {
        setShowEventAdd(show);
        !show && onClose();
    };

    const taskShowHandler = (show: boolean) => {
        setShowTaskAdd(show);
        !show && onClose();
    };

    const itemAddHandler = () => {
        onAdd();
        eventShowHandler(false);
    };

    const closeHandler = () => {
        onClose();
    };

    const isAdding = showTaskAdd || showEventAdd;

    return (
        <>
            <ClickAwayListener onClickAway={closeHandler}>
                <div
                    className={`absolute top-2 left-[103%] !pb-1 flex flex-col gap-3 z-20 !w-[16rem] rounded-sm shadow-md text-xl bg-blue-50 border-2 border-gray-300 ${
                        className || ''
                    } ${isAdding ? 'opacity-0 invisible' : ''}`}
                >
                    <h2 className="px-2 text-2xl text-blue-500/75 brightness-95">
                        New Item
                        <ExitIcon
                            onClose={onClose}
                            className="text-pink-500 !text-[1.35rem]"
                        />
                    </h2>
                    <ul>
                        <li
                            onClick={() => eventShowHandler(true)}
                            className="p-2 border-b-2 border-slate-200 bg-slate-100 text-slate-500 hover:bg-gray-700 hover:text-sky-200 cursor-pointer"
                        >
                            Event
                        </li>
                        <li
                            onClick={() => taskShowHandler(true)}
                            className="p-2 bg-slate-100 text-slate-500 hover:bg-gray-700 hover:text-blue-200 cursor-pointer"
                        >
                            Task
                        </li>
                    </ul>
                    {showEventAdd && (
                        <EventAdd
                            onClose={closeHandler}
                            onAdd={itemAddHandler}
                            beginningPeriod={beginningPeriod}
                        />
                    )}
                    {showTaskAdd && (
                        <TaskAdd
                            onClose={closeHandler}
                            onAddTask={itemAddHandler}
                            beginningPeriod={beginningPeriod}
                        />
                    )}
                </div>
            </ClickAwayListener>
        </>
    );
};

export default ItemCreatePrompt;
