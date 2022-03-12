import React, { useEffect, useState } from "react";
import {
	faChevronLeft,
	faChevronRight,
	faChevronsLeft,
	faChevronsRight
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./PageNav.module.scss";

interface Props {
	onChangePage: (newPage: number) => void;
	itemsPerPage: number;
	numberOfItems: number;
}

const PageNav: React.FC<Props> = (props) => {
	const { onChangePage, itemsPerPage, numberOfItems } = props;
	const [ currentPage, setCurrentPage ] = useState(1);

	const totalPages = Math.ceil(numberOfItems / itemsPerPage);

	const navigationHandler = (direction: number) => {
		if (currentPage <= 1 && direction < 0) return;
		if (currentPage >= totalPages && direction > 0) return;

		setCurrentPage((prev) => prev + direction);
	};

	useEffect(
		() => {
			onChangePage(currentPage);
		},
		[ currentPage, onChangePage ]
	);

	return (
		<div className={classes.container}>
			<div className={classes.pagenav}>
				<FontAwesomeIcon
					onClick={() => setCurrentPage(1)}
					icon={faChevronsLeft}
					className={`${classes.icon} ${currentPage <= 1 ? classes.disabled : ""}`}
				/>
				<FontAwesomeIcon
					onClick={navigationHandler.bind(null, -1)}
					icon={faChevronLeft}
					className={`${classes.icon} ${currentPage <= 1 ? classes.disabled : ""}`}
				/>
				<span className={classes.text}>
					{Math.min(currentPage, totalPages)} ... {totalPages}
				</span>
				<FontAwesomeIcon
					onClick={navigationHandler.bind(null, 1)}
					icon={faChevronRight}
					className={`${classes.icon} ${currentPage === totalPages
						? classes.disabled
						: ""}`}
				/>
				<FontAwesomeIcon
					onClick={() => setCurrentPage(totalPages)}
					icon={faChevronsRight}
					className={`${classes.icon} ${currentPage === totalPages
						? classes.disabled
						: ""}`}
				/>
			</div>
		</div>
	);
};

export default PageNav;
