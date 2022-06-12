import React from 'react';
import Modal from '../Modal';

const WrapperModal: React.FC<{ onClose: () => void; className?: string }> = ({
    onClose,
    className,
    children,
}) => {
    return (
        <Modal
            onClose={onClose}
            modalClass={`modal gap-[1.2rem] text-[1.1rem] min-h-[28rem] max-h-[700px] !px-2 ${
                className ?? ''
            }`}
        >
            {children}
        </Modal>
    );
};

export default WrapperModal;
