import { Size } from "../../../models/design-models";
import classes from "./LoadingSpinner.module.scss";

interface Props {
	size?: Size;
}

const LoadingSpinner: React.FC<Props> = ({ size = Size.LARGE }) => {
	return <div className={`${classes.spinner} ${classes["spinner-" + size]}`} />;
};

export default LoadingSpinner;
