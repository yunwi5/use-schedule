import React from "react";
import { Theme, Size } from "../../models/design-models";
import classes from "./Button.module.scss";

interface Props {
	size: Size;
	theme: Theme;
	className?: string;
	type?: string;
	onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
	const { size, theme, type, onClick, className } = props;

	return (
		<button
			className={`${classes.btn} ${classes["btn-" + theme]} ${classes[
				"btn-" + size
			]} ${className}`}
			type={type ? "button" : type as any}
			onClick={onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
