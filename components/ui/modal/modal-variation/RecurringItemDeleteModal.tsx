import { useState } from 'react';
import Modal from '../Modal';
import DeleteContent from './content/DeleteContent';
import ModalHeader from './content/ModalHeader';
import RecurringDeleteOption from './content/RecurringDeleteOption';
import classes from './GeneralModal.module.scss';

interface ModalProps {
    onAction: (deleteGeneratedOneOffs: boolean) => void;
    onClose: () => void;
    targetName?: string;
}

const RecurringModalDeleteModal: React.FC<ModalProps> = (props) => {
    const { onClose, onAction, targetName } = props;
    const [showDeleteOption, setShowDeleteOption] = useState(false);

    const confirmHandler = () => {
        setShowDeleteOption(true);
    };

    return (
        <Modal onClose={onClose} modalClass={`${classes.modal} ${classes['modal--delete']}`}>
            <ModalHeader title={'Delete'} onClose={onClose} />
            {!showDeleteOption && (
                <DeleteContent
                    targetName={targetName}
                    onClose={onClose}
                    onAction={confirmHandler}
                />
            )}
            {showDeleteOption && (
                <RecurringDeleteOption targetName={targetName} onAction={onAction} />
            )}
        </Modal>
    );
};

export default RecurringModalDeleteModal;
