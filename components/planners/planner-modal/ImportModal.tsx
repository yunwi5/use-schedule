import React from 'react';
import { useAppSelector } from '../../../store/redux';

import Modal from '../../ui/modal/Modal';
import classes from './ImportModal.module.scss';

interface Props {
	onClose(): void;
}

const ImportModal: React.FC<Props> = ({ onClose }) => {
	const templates = useAppSelector((state) => state.template.templates);

	return (
		<Modal
			onClose={onClose}
			classes='fixed top-[50%] -translate-y-[50%] md:w-[70%] lg:w-[50%] min-w-[20rem] rounded-md'
		>
			<h2 className={classes.heading}>Select a template to import</h2>
			<div className={classes.container}>
				{templates.map((temp) => (
					<div key={temp.id} className={classes.template}>
						<p className={classes.text}>{temp.name}</p>
					</div>
				))}
			</div>
		</Modal>
	);
};

export default ImportModal;
