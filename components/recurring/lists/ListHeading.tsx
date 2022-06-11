import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DropDownToggler from '../../ui/icons/DropDownToggler';

interface Props {
    headingText: string | JSX.Element;
    isShrinked: boolean;
    onToggleShrink: () => void;
}

const ListHeading: React.FC<Props> = (props) => {
    const { headingText, isShrinked, onToggleShrink } = props;

    return (
        <div className="flex items-center gap-3">
            <h3 className={'w-[7rem] flex items-center text-xl text-slate-700/90'}>
                {headingText}
            </h3>
            {/* Horizontal line */}
            <div className="flex-1 h-1 bg-slate-300" />
            <DropDownToggler
                showDropDown={!isShrinked}
                className={'!ml-0 text-slate-600'}
                onToggle={onToggleShrink}
            />
        </div>
    );
};

export default ListHeading;