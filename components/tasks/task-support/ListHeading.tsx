import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';

interface Props {
    labelMain: string;
    labelSub: string;
    headingText: string | JSX.Element;
    isShrinked: boolean;
    onToggleShrink: () => void;
}

const ListHeading: React.FC<Props> = (props) => {
    const { labelMain, labelSub, headingText, isShrinked, onToggleShrink } = props;

    return (
        <div className="mb-3 lg:mb-0 flex items-center gap-3">
            <div className=" px-2 pt-[5px] pb-3 bg-gray-500 text-white w-14 h-14 lg:w-16 lg:h-16 rounded-md flex flex-col items-center">
                <span className="text-xl lg:text-2xl">{labelMain}</span>
                <span>{labelSub}</span>
            </div>
            <p className="w-16 text-2xl font-semibold text-slate-600/90">{headingText}</p>
            <div className="w-full h-1 bg-slate-300" />
            <FontAwesomeIcon
                icon={faAngleDown}
                className={`max-w-[1.3rem] text-3xl text-slate-500 cursor-pointer ml-auto ${
                    isShrinked ? '' : 'rotate-180'
                } transition-all duration-300`}
                onClick={onToggleShrink}
            />
        </div>
    );
};

export default ListHeading;
