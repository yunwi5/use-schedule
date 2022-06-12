import { useState } from 'react';
import Modal from '../Modal';
import DeleteContent from './content/deleteContent';
import DeleteHeader from './content/DeleteHeader';
import RecurringDeleteOption from './content/RecurringDeleteOption';
import classes from './GeneralModal.module.scss';

interface ModalProps {
    targetName?: string;
    onAction: (deleteGeneratedOneOffs: boolean) => void;
    onClose: () => void;
}

const RecurringModalDeleteModal: React.FC<ModalProps> = (props) => {
    const { onClose, onAction, targetName } = props;
    const [showDeleteOption, setShowDeleteOption] = useState(false);

    const confirmHandler = () => {
        setShowDeleteOption(true);
    };

    return (
        <Modal onClose={onClose} modalClass={`${classes.modal} ${classes['modal--delete']}`}>
            <DeleteHeader onClose={onClose} />
            {!showDeleteOption && (
                <DeleteContent
                    targetName={targetName}
                    onClose={onClose}
                    onAction={confirmHandler}
                />
            )}
            {showDeleteOption && (
                <RecurringDeleteOption
                    targetName={targetName}
                    onClose={onClose}
                    onAction={onAction}
                />
            )}
        </Modal>
    );
};

export default RecurringModalDeleteModal;
