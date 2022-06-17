import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Status } from '../../../models/task-models/Status';

interface Props {
    status: Status;
    onToggle(e: React.MouseEvent): void;
    className?: string;
}

const StatusTogglerButton: React.FC<Props> = ({ status, onToggle, className }) => {
    return (
        <div
            className={`absolute z-30 top-1 right-1 w-[1.9rem] h-[1.9rem] flex-center rounded-full bg-white border-[1.3px] border-slate-300 ${className}`}
            onClick={onToggle}
        >
            <FontAwesomeIcon
                icon={faCheck}
                className={`${
                    status === Status.COMPLETED ? 'text-emerald-600' : 'text-emerald-100/90'
                }`}
            />
        </div>
    );
};

export default StatusTogglerButton;
