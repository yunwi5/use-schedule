import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

import classes from './Modal.module.scss';

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
    modalClass?: string;
    backdropClass?: string;
}

// <div> element with id "modal" was added to _document.tsx

const Modal: React.FC<ModalProps> = (props) => {
    const [_document, setDocument] = useState<Document | null>(null);

    useEffect(() => {
        setDocument(document);
    }, []);

    if (!_document) return <span />;

    const portalElement = _document.getElementById('modal') as HTMLElement;

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop className={props.backdropClass || ''} onClose={props.onClose} />,
                portalElement,
            )}
            {ReactDOM.createPortal(
                <ModalOverlay classes={props.modalClass}>{props.children}</ModalOverlay>,
                portalElement,
            )}
        </>
    );
};

export default Modal;
