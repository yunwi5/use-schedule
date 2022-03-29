import { faCheck, faXmark } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import useNotification from '../../../hooks/useNotification';
import { transferTemplateToWeekly } from '../../../lib/templates/templates-api';
import { Theme } from '../../../models/design-models';
import { useAppSelector } from '../../../store/redux';
import Button from '../../ui/Button';

import Modal from '../../ui/modal/Modal';
import { NotifStatus } from '../../ui/Notification';
import classes from './ImportModal.module.scss';

interface Props {
	onClose(): void;
	beginningPeriod: Date;
	onMutate: () => void;
}

const ImportModal: React.FC<Props> = ({ onClose, beginningPeriod, onMutate }) => {
	const [ selectedTemp, setSelectedTemp ] = useState<string>('');
	const templates = useAppSelector((state) => state.template.templates);

	const { setNotification } = useNotification();

	const selectHandler = useCallback((id: string) => {
		setSelectedTemp(id);
	}, []);

	const importHandler = async () => {
		if (!beginningPeriod) {
			alert('No week found!');
			return;
		}
		setNotification(NotifStatus.PENDING, 'Transferring template tasks...');
		const { isSuccess, data } = await transferTemplateToWeekly(
			selectedTemp,
			new Date(beginningPeriod),
		);
		if (isSuccess) {
			setNotification(NotifStatus.SUCCESS);
			onMutate();
		} else {
			setNotification(NotifStatus.ERROR);
		}
	};

	// console.log(`beginningPeriod: ${beginningPeriod ? beginningPeriod.toString() : ''}`);

	return (
		<Modal onClose={onClose} classes={`${classes.modal}`}>
			<FontAwesomeIcon
				icon={faXmark}
				className={`${classes.icon} ${classes.exit}`}
				onClick={onClose}
			/>
			<h2 className={classes.heading}>Select a template to import</h2>
			<div className={classes.container}>
				{templates.map((temp) => (
					<div
						key={temp.id}
						className={`${classes.template} ${selectedTemp === temp.id
							? classes.selected
							: ''}`}
						onClick={selectHandler.bind(null, temp.id)}
					>
						<p className={classes.text}>{temp.name}</p>
						{selectedTemp === temp.id && (
							<FontAwesomeIcon icon={faCheck} className={classes.icon} />
						)}
					</div>
				))}
			</div>
			<div className={classes.control}>
				<Button
					theme={Theme.WARNING}
					className={classes.btn}
					onClick={selectHandler.bind(null, '')}
				>
					Clear
				</Button>
				<Button theme={Theme.TERTIARY} className={classes.btn} onClick={importHandler}>
					Import
				</Button>
			</div>
		</Modal>
	);
};

export default ImportModal;
