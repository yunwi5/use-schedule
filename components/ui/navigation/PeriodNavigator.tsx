import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-regular-svg-icons';

interface Props {
    onNavigate(direction: number): void;
}

const PeriodNavigator: React.FC<Props> = ({ onNavigate, children }) => (
    <div className="flex gap-1 items-center">
        <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={onNavigate.bind(null, -1)}
            className="w-[2rem] h-[2rem] inline-block rounded-full text-3xl border-2 border-transparent hover:border-slate-500 hover:bg-slate-500 hover:text-slate-50  max-w-[2rem] max-h-[2rem] cursor-pointer"
        />
        <span>{children}</span>
        <FontAwesomeIcon
            icon={faAngleRight}
            onClick={onNavigate.bind(null, 1)}
            className="w-[2rem] h-[2rem] inline-block rounded-full text-3xl border-2 border-transparent hover:border-slate-500 hover:bg-slate-500 hover:text-slate-50  max-w-[2rem] max-h-[2rem] cursor-pointer"
        />
    </div>
);

export default PeriodNavigator;
