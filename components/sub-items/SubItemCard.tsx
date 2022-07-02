import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarLight } from '@fortawesome/pro-light-svg-icons';
import { faCheck, faStar as faStarSolid } from '@fortawesome/pro-solid-svg-icons';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';

import { RootStateOrAny, useSelector } from 'react-redux';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { SubItem, SubItemProps } from '../../models/utility-models';
import classes from './SubItemCard.module.scss';

interface Props {
    subItem: SubItem;
    isEditMode: boolean;
    onDelete: (id: string) => void;
    onPatchNewProps: (itemId: string, props: SubItemProps) => Promise<void>;
    onInvalidate?: () => void;
}

const SubTaskCard: React.FC<Props> = (props) => {
    const { subItem, onDelete, isEditMode, onPatchNewProps } = props;

    // Disable "complete" functionality if the task type is TemplateTask. TemplateTask is only for
    // template so, it cannot be completed.
    const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);
    const disableComplete = plannerMode === PlannerMode.TEMPLATE;

    const [currentText, setCurrentText] = useState<string>(subItem.name);
    const [isImportant, setIsImportant] = useState(subItem.isImportant);
    const [isCompleted, setIsCompleted] = useState(subItem.isCompleted);

    const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCurrentText(e.target.value);

    const toggleIsImportant = async () => {
        const newIsImportant = !isImportant;
        setIsImportant(newIsImportant);

        // better to handle this in the ItemList component! (more generic)
        onPatchNewProps(subItem.id, { isImportant: newIsImportant });
    };

    const toggleIsCompleted = async () => {
        if (disableComplete) return;
        const newIsCompleted = !isCompleted;
        setIsCompleted(newIsCompleted);

        // send PATCH request on the parent list component
        onPatchNewProps(subItem.id, { isCompleted: newIsCompleted });
    };

    useEffect(() => {
        // If the text does not change, do not send any request.
        if (subItem.name.trim() === currentText.trim()) return;

        const timer = setTimeout(() => {
            onPatchNewProps(subItem.id, { name: currentText });
        }, 2000);

        return () => clearTimeout(timer);
    }, [subItem, currentText, onPatchNewProps]);

    useEffect(() => {
        setCurrentText(subItem.name);
        setIsImportant(subItem.isImportant);
        setIsCompleted(subItem.isCompleted);
    }, [subItem]);

    return (
        <div className="md:max-w-[99%] lg:max-w-[95%] mt-2 p-2 flex items-center justify-between shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all text-slate-600 border-slate-200 border-2 rounded-md">
            <div
                className={`w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full border-2 ${
                    isCompleted ? 'border-green-300' : 'border-slate-300'
                } cursor-pointer`}
                onClick={toggleIsCompleted}
            >
                {!disableComplete && isCompleted && (
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={`text-green-500 ${classes.icon}`}
                    />
                )}
                {disableComplete && (
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={`text-green-100 cursor-not-allowed text-xl`}
                    />
                )}
            </div>
            {!isEditMode && (
                <Fragment>
                    <p
                        className={`mr-auto ml-4 max-w-[85%] ${
                            isCompleted ? 'line-through text-slate-400' : ''
                        }`}
                    >
                        {currentText}
                    </p>
                    {isImportant ? (
                        <FontAwesomeIcon
                            icon={faStarSolid}
                            onClick={toggleIsImportant}
                            className={`text-yellow-300 hover:text-yellow-400 text-xl ${classes.icon}`}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faStarLight}
                            onClick={toggleIsImportant}
                            className={`text-yellow-400 text-xl ${classes.icon}`}
                        />
                    )}
                </Fragment>
            )}
            {isEditMode && (
                <Fragment>
                    <input
                        type="text"
                        onChange={textChangeHandler}
                        value={currentText}
                        id="subtask-name"
                        maxLength={60}
                        className="lg:w-[85%] max-w-[85%] bg-transparent mr-auto ml-4 focus:outline-none"
                    />
                    <FontAwesomeIcon
                        onClick={onDelete.bind(null, subItem.id)}
                        icon={faXmark}
                        className={`max-w-sm text-lg text-rose-600 hover:border-rose-600 hover:border-b-[2.5px] ${classes.icon}`}
                    />
                </Fragment>
            )}
        </div>
    );
};

export default SubTaskCard;
