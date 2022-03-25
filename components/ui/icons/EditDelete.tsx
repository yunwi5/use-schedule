import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPencilAlt } from '@fortawesome/pro-duotone-svg-icons';
import { faXmark } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	isEditing: boolean;
	onEdit(edit: boolean): void;
	onDelete?: () => void;
}

const EditDelete: React.FC<Props> = ({ isEditing, onEdit, onDelete }) => {
	const iconClass = 'cursor-pointer text-2xl hover:scale-110 transition-all';

	return (
		<div className='absolute right-2 top-2 pr-2'>
			{!isEditing && (
				<div className='flex gap-2 items-center'>
					<FontAwesomeIcon
						icon={faPencilAlt}
						onClick={onEdit.bind(null, true)}
						className={`${iconClass} text-blue-500 hover:text-blue-800`}
					/>
					{onDelete && (
						<FontAwesomeIcon
							icon={faEraser}
							onClick={onDelete}
							className={`${iconClass} text-3xl text-rose-400 hover:text-rose-500`}
						/>
					)}
				</div>
			)}
			{isEditing && (
				<FontAwesomeIcon
					icon={faXmark}
					className={`absolute right-2 top-2 ${iconClass} text-rose-500`}
					onClick={onEdit.bind(null, false)}
				/>
			)}
		</div>
	);
};

export default EditDelete;
