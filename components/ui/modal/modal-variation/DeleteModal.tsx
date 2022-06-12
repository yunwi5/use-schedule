import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExitIcon from '../../icons/ExitIcon';
import Modal from '../Modal';
import DeleteContent from './content/deleteContent';
import DeleteHeader from './content/DeleteHeader';
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
            <DeleteHeader onClose={onClose} />
            <DeleteContent {...props} />
        </Modal>
    );
};

export default DeleteModal;
