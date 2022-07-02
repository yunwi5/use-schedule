import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/pro-duotone-svg-icons';

interface Props {
    onNavigate(dir: number): void;
}

const MiniNavigator: React.FC<Props> = ({ onNavigate, children }) => {
    return (
        <div className="flex items-center gap-1 text-base">
            <FontAwesomeIcon
                className="text-2xl hover:text-gray-900 cursor-pointer max-w-[1.2rem]"
                icon={faCaretLeft}
                onClick={onNavigate.bind(null, -1)}
            />
            <p className="-translate-y-[1.35px]">{children}</p>
            <FontAwesomeIcon
                className="text-2xl hover:text-gray-900 cursor-pointer max-w-[1.2rem]"
                icon={faCaretRight}
                onClick={onNavigate.bind(null, 1)}
            />
        </div>
    );
};

export default MiniNavigator;
