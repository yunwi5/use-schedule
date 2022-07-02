import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';

interface Props {
    className?: string;
    onClose(): void;
}

const ExitIcon: React.FC<Props> = ({ className, onClose }) => {
    return (
        <FontAwesomeIcon
            icon={faXmark}
            onClick={onClose}
            className={`max-w-[1.8rem] absolute top-1 right-1 transition-all hover:scale-110 text-3xl cursor-pointer ${className}`}
        />
    );
};

export default ExitIcon;
