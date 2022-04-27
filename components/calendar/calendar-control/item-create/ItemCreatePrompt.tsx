import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import React, { useState } from "react";
import TaskAdd from "../../../planners/planner-crud/TaskAdd";
import ExitIcon from "../../../ui/icons/ExitIcon";
import Modal from "../../../ui/modal/Modal";
import EventAdd from "../../events/EventAdd";

interface Props {
    onClose: () => void;
    onAdd: () => void;
    showLeft: boolean;
    beginningPeriod: Date;
}

const ItemCreatePrompt: React.FC<Props> = ({ onAdd, onClose, showLeft, beginningPeriod }) => {
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

    const promptClass = "!w-[16rem] rounded-sm !pb-1 text-xl flex flex-col gap-3";

    const closeHandler = () => {
        console.log("Close Prompt!");
        onClose();
    };

    console.log(`showLeft: ${showLeft}`);

    return (
        <>
            <ClickAwayListener onClickAway={closeHandler}>
                <div
                    className={`absolute bg-blue-50 border-2 border-gray-300 top-2 ${
                        showLeft ? "right-[102%]" : "left-[103%]"
                    } z-20 ${promptClass}`}
                >
                    <h2 className="text-2xl text-blue-500/75 brightness-95">
                        New Item
                        <ExitIcon onClose={onClose} className="text-pink-500 !text-[1.35rem]" />
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
                </div>
            </ClickAwayListener>
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
