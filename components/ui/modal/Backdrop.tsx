import classes from "./Backdrop.module.scss";

/* BackDrop */
interface BackdropProps {
	onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};

export default Backdrop;
