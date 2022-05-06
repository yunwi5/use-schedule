import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';

import Modal from '../../ui/modal/Modal';
import classes from './PlannerModal.module.scss';

interface Props {
    onClose: () => void;
    title: string;
}

const PlannerModal: React.FC<Props> = ({ onClose, title, children }) => {
    return (
        <Modal onClose={onClose} modalClass="fixed right-[0px] h-[100vh] w-[40vw] min-w-[645px]">
            <div className={classes.modal}>
                <div className={classes.heading}>
                    <FontAwesomeIcon
                        onClick={onClose}
                        icon={faArrowRight}
                        className={`${classes.icon}`}
                    />
                    <h3>{title}</h3>
                </div>
                {children}
            </div>
        </Modal>
    );
};

export default PlannerModal;
