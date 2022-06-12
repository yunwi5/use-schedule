import React from 'react';
import ExitIcon from '../../../icons/ExitIcon';

const DeleteHeader: React.FC<{ onClose(): void }> = ({ onClose }) => {
    return (
        <>
            <h2>Delete</h2>
            <ExitIcon
                onClose={onClose}
                className={`!top-4 !right-4 !text-slate-500 hover:!text-rose-500`}
            />
        </>
    );
};

export default DeleteHeader;
