import { Theme } from '../../../../models/design-models';
import Button from '../../buttons/Button';
import Modal from '../Modal';
import classes from './GeneralModal.module.scss';

interface ModalProps {
    targetName?: string;
    onAction: () => void;
    onClose: () => void;
}

const DeleteModal: React.FC<ModalProps> = (props) => {
    const { targetName, onAction, onClose } = props;

    return (
        <Modal onClose={onClose} modalClass={`${classes.modal} ${classes['modal--delete']}`}>
            <h2>Delete</h2>
            <p>
                Do you really want to delete{' '}
                {targetName && <strong>&quot;{targetName}&quot;</strong>}
                &nbsp;?
            </p>
            <div className={classes.btns}>
                <Button theme={Theme.DANGER} onClick={onAction}>
                    Confirm
                </Button>
                <Button
                    theme={Theme.SECONDARY}
                    onClick={onClose}
                    className={`${classes['btn-cancel']}`}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
