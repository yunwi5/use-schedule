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
        <div
            className={`ml-auto flex-center w-[1.7rem] h-[1.7rem] rounded-full hover:bg-slate-700/80 transition-all hover:scale-125 text-slate-500 hover:!text-slate-50 ${
                className || ''
            }`}
        >
            <FontAwesomeIcon
                icon={faAngleDown}
                onClick={onToggle}
                className={`inline-block max-h-[1.8rem] max-w-[1.8rem] text-2xl cursor-pointer transition-all ${
                    showDropDown ? 'rotate-180' : ''
                }`}
            />
        </div>
    );
};

export default DropDownToggler;
