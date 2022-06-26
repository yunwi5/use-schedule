import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';

import Modal from '../../ui/modal/Modal';
import classes from './PlannerModal.module.scss';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import ExitIcon from '../../ui/icons/ExitIcon';

interface Props {
    onClose: () => void;
    title: string;
}

const PlannerModal: React.FC<Props> = ({ onClose, title, children }) => {
    return (
        <WrapperModal onClose={onClose} className={'!px-1 !py-1'}>
            <div className={classes.modal}>
                <div className={classes.heading}>
                    <h3>{title}</h3>
                    <ExitIcon onClose={onClose} className={'!top-4 !right-4'} />
                </div>
                {children}
            </div>
        </WrapperModal>
    );
};

export default PlannerModal;
