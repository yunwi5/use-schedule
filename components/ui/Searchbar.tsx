import { faMagnifyingGlass } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import classes from "./Searchbar.module.scss";

interface Props {
	onSearch: (text: string) => void;
	placeholder: string;
	className?: string;
}

const Searchbar: React.FC<Props> = (props) => {
	const { className, onSearch, placeholder } = props;

	return (
		<div className={`${classes.search} ${className}`}>
			<FontAwesomeIcon className={classes.icon} icon={faMagnifyingGlass} />
			<input
				type="search"
				placeholder={placeholder}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onSearch(e.target.value.trim())}
			/>
		</div>
	);
};

export default Searchbar;
