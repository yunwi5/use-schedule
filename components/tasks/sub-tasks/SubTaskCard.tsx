import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarLight } from '@fortawesome/pro-light-svg-icons';
import { faCheck, faStar as faStarSolid } from '@fortawesome/pro-solid-svg-icons';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';

import { SubTask } from '../../../models/task-models/SubTask';
import { patchSubTaskProps } from '../../../lib/planners/subtasks-api';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import classes from './SubTaskCard.module.scss';

interface Props {
	subTask: SubTask;
	isEditMode: boolean;
	onDelete: (id: string) => void;
	onInvalidate: () => void;
}

const SubTaskCard: React.FC<Props> = (props) => {
	const { subTask, onDelete, isEditMode, onInvalidate } = props;

	// Disable "complete" functionality if the task type is TemplateTask. TemplateTask is only for
	// template so, it cannot be completed.
	const plannerMode = useSelector((state: RootStateOrAny) => state.planner.plannerMode);
	const disableComplete = plannerMode === PlannerMode.TEMPLATE;

	const [ currentText, setCurrentText ] = useState<string>(subTask.name);
	const [ isImportant, setIsImportant ] = useState(subTask.isImportant);
	const [ isCompleted, setIsCompleted ] = useState(subTask.isCompleted);

	const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
		setCurrentText(e.target.value);

	const toggleIsImportant = async () => {
		const newIsImportant = !isImportant;
		setIsImportant(newIsImportant);

		// Send PATCH Request
		await patchSubTaskProps(subTask.id, {
			isImportant: newIsImportant
		});
		onInvalidate();
	};

	const toggleIsCompleted = async () => {
		if (disableComplete) return;
		const newIsCompleted = !isCompleted;
		setIsCompleted(newIsCompleted);

		// Send PATCH Request.
		await patchSubTaskProps(subTask.id, {
			isCompleted: newIsCompleted
		});
		onInvalidate();
	};

	// Update text only when the edit mode turns from true to false.
	useEffect(
		() => {
			if (isEditMode) return;
			// If the text does not change, do not send any request.
			if (subTask.name.trim() === currentText.trim()) return;

			const updateName = async () => {
				// Send PATCH Request
				await patchSubTaskProps(subTask.id, {
					name: currentText
				});
				onInvalidate();
			};
			updateName();
		},
		[ isEditMode, subTask, currentText, onInvalidate ]
	);

	useEffect(
		() => {
			setCurrentText(subTask.name);
			setIsImportant(subTask.isImportant);
			setIsCompleted(subTask.isCompleted);
		},
		[ subTask ]
	);

	return (
		<div className='md:max-w-[99%] lg:max-w-[95%] mt-2 p-2 flex items-center justify-between shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all text-slate-600 border-slate-200 border-2 rounded-md'>
			<div
				className={`md:w-6 md:h-6 lg:w-7 lg:min-w-7 lg:h-7 lg:min-w-7 flex items-center justify-center rounded-full border-2 ${isCompleted
					? 'border-green-300'
					: 'border-slate-300'} cursor-pointer`}
				onClick={toggleIsCompleted}
			>
				{!disableComplete &&
				isCompleted && (
					<FontAwesomeIcon icon={faCheck} className={`text-green-500 ${classes.icon}`} />
				)}
				{disableComplete && (
					<FontAwesomeIcon
						icon={faCheck}
						className={`text-green-100 max-w-[2.1rem] cursor-not-allowed text-xl`}
					/>
				)}
			</div>
			{!isEditMode && (
				<Fragment>
					<p
						className={`mr-auto ml-4 max-w-[85%] ${isCompleted
							? 'line-through text-slate-400'
							: ''}`}
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
						type='text'
						onChange={textChangeHandler}
						value={currentText}
						id='subtask-name'
						maxLength={60}
						className='lg:w-[85%] max-w-[85%] bg-transparent mr-auto ml-4 focus:outline-none'
					/>
					<FontAwesomeIcon
						onClick={onDelete.bind(null, subTask.id)}
						icon={faXmark}
						className={`max-w-sm text-lg text-rose-600 hover:border-rose-600 hover:border-b-[2.5px] ${classes.icon}`}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default SubTaskCard;
