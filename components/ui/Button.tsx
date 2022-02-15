import React from "react";
import { Theme, Size } from "../../models/design-models";
import classes from "./Button.module.scss";

interface Props {
	size?: Size;
	theme?: Theme;
	onClick?: () => void;
	className?: string;
	type?: string;
	disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
	const { size, theme, type, onClick, className, disabled } = props;

	// default theme and size
	const themeClass = theme ? theme : Theme.PRIMARY;
	const sizeClass = size ? size : Size.MEDIUM;

	return (
		<button
			className={`${classes.btn} ${classes["btn-" + themeClass]} ${classes[
				"btn-" + sizeClass
			]} ${className}`}
			type={type ? type : "button" as any}
			onClick={onClick}
			disabled={disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
