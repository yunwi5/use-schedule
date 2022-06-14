import Modal from '../Modal';
import DeleteContent from './content/DeleteContent';
import ModalHeader from './content/ModalHeader';
import classes from './GeneralModal.module.scss';

interface ModalProps {
    targetName?: string;
    onAction: () => void;
    onClose: () => void;
}

const DeleteModal: React.FC<ModalProps> = (props) => {
    const { onClose } = props;

    return (
        <Modal onClose={onClose} modalClass={`${classes.modal} ${classes['modal--delete']}`}>
            <ModalHeader title="Delete" onClose={onClose} />
            <DeleteContent {...props} />
        </Modal>
    );
};

export default DeleteModal;
