import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import TaskAdd from '../../../planners/planner-crud/TaskAdd';
import EventAdd from '../../events/EventAdd';
import ExitIcon from '../../../ui/icons/ExitIcon';

interface Props {
    onClose: () => void;
    onAdd: () => void;
    showLeft: boolean;
    beginningPeriod: Date;
    className?: string; // overriding existing classes such as position
}

const ItemCreatePrompt: React.FC<Props> = ({
    onAdd,
    onClose,
    showLeft,
    beginningPeriod,
    className,
}) => {
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
                    className={`absolute top-2 ${
                        showLeft ? 'right-[102%]' : 'left-[103%]'
                    } z-20 !w-[16rem] rounded-sm !pb-1 text-xl flex flex-col gap-3 bg-blue-50 border-2 border-gray-300 ${
                        className || ''
                    } ${isAdding ? 'opacity-0 invisible' : ''}`}
                >
                    <h2 className="text-2xl text-blue-500/75 brightness-95">
                        New Item
                        <ExitIcon
                            onClose={onClose}
                            className="text-pink-500 !text-[1.35rem]"
                        />
                    </h2>
                    <ul>
                        <li
                            onClick={() => eventShowHandler(true)}
                            className="p-2 border-b-2 border-slate-200 bg-slate-100 text-slate-500 hover:bg-blue-500/80 hover:text-blue-50 cursor-pointer"
                        >
                            Event
                        </li>
                        <li
                            onClick={() => taskShowHandler(true)}
                            className="p-2 bg-slate-100 text-slate-500 hover:bg-blue-500/80 hover:text-blue-50 cursor-pointer"
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
