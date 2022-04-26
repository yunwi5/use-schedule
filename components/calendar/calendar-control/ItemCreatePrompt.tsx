import React, { useState } from "react";
import TaskAdd from "../../planners/planner-crud/TaskAdd";
import Modal from "../../ui/modal/Modal";
import EventAdd from "../events/EventAdd";

interface Props {
    onClose: () => void;
    onAdd: () => void;
    beginningPeriod: Date;
}

const ItemCreatePrompt: React.FC<Props> = ({ onAdd, onClose, beginningPeriod }) => {
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

    return (
        <>
            <Modal
                onClose={onClose}
                classes={`modal !left-[calc(50%-8rem)] !w-[16rem] !pb-5 text-xl flex flex-col gap-3`}
            >
                <h2 className="text-2xl">New Item</h2>
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
            </Modal>
            {showEventAdd && (
                <EventAdd
                    onClose={onClose}
                    onAddEvent={itemAddHandler}
                    beginningPeriod={beginningPeriod}
                />
            )}
            {showTaskAdd && (
                <TaskAdd
                    onClose={onClose}
                    onAddTask={itemAddHandler}
                    beginningPeriod={beginningPeriod}
                />
            )}
        </>
    );
};

export default ItemCreatePrompt;
