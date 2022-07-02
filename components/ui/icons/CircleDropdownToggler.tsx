import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/pro-regular-svg-icons';

interface Props {
    onToggle(e?: React.MouseEvent): void;
    showDropDown: boolean;
    className?: string;
}

const CircleDropDownToggler: React.FC<Props> = ({ onToggle, showDropDown, className }) => {
    return (
        <div
            className={`ml-auto flex-center w-[2rem] h-[2rem] rounded-full bg-gray-200 hover:bg-slate-700/80 transition-all hover:scale-[105%] text-slate-500 hover:!text-slate-50 ${
                className || ''
            }`}
        >
            <FontAwesomeIcon
                icon={showDropDown ? faMinus : faPlus}
                onClick={onToggle}
                className={`inline-block text-2xl cursor-pointer transition-all`}
            />
        </div>
    );
};

export default CircleDropDownToggler;
