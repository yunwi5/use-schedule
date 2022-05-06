import classes from './Backdrop.module.scss';

/* BackDrop */
interface BackdropProps {
    onClose: () => void;
    className?: string;
}

const Backdrop: React.FC<BackdropProps> = ({ onClose, className }) => {
    return <div className={`${classes.backdrop} ${className}`} onClick={onClose} />;
};

export default Backdrop;
