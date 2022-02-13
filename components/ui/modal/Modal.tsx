import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";

import classes from "./Modal.module.scss";

/* Modal Overlay */
interface OverlayProps {
	classes?: string;
}

const ModalOverlay: React.FC<OverlayProps> = (props) => {
	return <div className={`${classes.modal} ${props.classes}`}>{props.children}</div>;
};

/* Modal */
interface ModalProps {
	onClose: () => void;
	classes?: string;
}

// <div> element with id "modal" was added to _document.tsx

const Modal: React.FC<ModalProps> = (props) => {
	const [ _document, setDocument ] = useState<Document | null>(null);

	useEffect(() => {
		setDocument(document);
	}, []);

	if (!_document) {
		return <p>No document yet...</p>;
	}

	const portalElement = _document.getElementById("modal") as HTMLElement;

	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay classes={props.classes}>{props.children}</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
