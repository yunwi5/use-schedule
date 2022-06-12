import { Theme } from '../../../../models/design-models';
import Button from '../../buttons/Button';
import ExitIcon from '../../icons/ExitIcon';
import Modal from '../Modal';
import classes from './GeneralModal.module.scss';

interface ModalProps {
    onAction: () => void;
    onClose: () => void;
}

const DiscardModal: React.FC<ModalProps> = (props) => {
    const { onAction, onClose } = props;

    return (
        <Modal onClose={onClose} modalClass={`${classes.modal} ${classes['modal--discard']}`}>
            <h2>Go Back</h2>
            <ExitIcon
                onClose={onClose}
                className={`!top-4 !right-4 !text-slate-500 hover:!text-rose-500`}
            />
            <p>Your unsaved changes will be lost. Will you discard changes?</p>
            <div className={classes.btns}>
                <Button theme={Theme.WARNING} onClick={onAction}>
                    Discard
                </Button>
                <Button
                    theme={Theme.SECONDARY}
                    onClick={onClose}
                    className={`${classes['btn-cancel']}`}
                >
                    Stay
                </Button>
            </div>
        </Modal>
    );
};

export default DiscardModal;
