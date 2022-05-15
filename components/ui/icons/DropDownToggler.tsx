import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';

interface Props {
    onToggle(e?: React.MouseEvent): void;
    showDropDown: boolean;
    className?: string;
}

const DropDownToggler: React.FC<Props> = ({ onToggle, showDropDown, className }) => {
    // Icon color is fixed to slate by default.
    return (
        <FontAwesomeIcon
            icon={faAngleDown}
            onClick={onToggle}
            className={`inline-block max-h-[1.5rem] max-w-[1.5rem] text-2xl hover:scale-125 ml-auto !text-slate-400 cursor-pointer transition-all ${
                showDropDown ? 'rotate-180' : ''
            } ${className || ''}`}
        />
    );
};

export default DropDownToggler;
