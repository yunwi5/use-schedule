import { Theme } from "../../../../models/design-models";
import Button from "../../Button";
import Modal from "../Modal";
import classes from "./GeneralModal.module.scss";

interface ModalProps {
	onAction: () => void;
	onClose: () => void;
}

const DiscardModal: React.FC<ModalProps> = (props) => {
	const { onAction, onClose } = props;

	return (
		<Modal onClose={onClose} classes={`${classes.modal} ${classes["modal--discard"]}`}>
			<h2>Go Back</h2>
			<p>Your unsaved changes will be lost. Will you discard changes?</p>
			<div className={classes.btns}>
				<Button theme={Theme.WARNING} onClick={onAction}>
					Discard
				</Button>
				<Button
					theme={Theme.SECONDARY}
					onClick={onClose}
					className={`${classes["btn-cancel"]}`}
				>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default DiscardModal;
