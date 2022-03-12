import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
	TaskSort as SortingStandard,
	TaskSortList,
	SortingDirection
} from "../../models/sorting-models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/pro-duotone-svg-icons";

import classes from "./TaskSearch.module.scss";

interface Props {
	onSort: (target: SortingStandard, direction: SortingDirection) => void;
	onRandomize: () => void;
}

const TaskSort: React.FC<Props> = ({ onSort, onRandomize }) => {
	const [ sortTarget, setSortTarget ] = useState<null | SortingStandard>(null);
	const [ direction, setDirection ] = useState<null | SortingDirection>(null);

	const sortTargetHandler = (e: SelectChangeEvent) => {
		const newStandard = e.target.value ? e.target.value as SortingStandard : null;
		setSortTarget(newStandard);
	};

	const sortDirectionHandler = (e: SelectChangeEvent) => {
		const newDirection = e.target.value ? e.target.value as SortingDirection : null;
		setDirection(newDirection);
	};

	const randomizeHandler = () => {
		setSortTarget(null);
		setDirection(null);
		onRandomize();
	};

	useEffect(
		() => {
			if (sortTarget && direction) {
				console.log(`Start sorting. Target: ${sortTarget}, Direction: ${direction}`);
				onSort(sortTarget, direction);
			}
		},
		[ sortTarget, direction, onSort ]
	);

	return (
		<div className="flex items-center gap-3">
			<FormControl sx={{ minWidth: 120 }} size="small">
				<InputLabel id="sort-target-label">Sort By</InputLabel>
				<Select
					labelId="sort-target-label"
					id="sort-target"
					value={sortTarget || ""}
					onChange={sortTargetHandler}
					label="Sort By"
				>
					<MenuItem disabled selected value="">
						select
					</MenuItem>
					{TaskSortList.map((standard) => (
						<MenuItem key={standard} value={standard}>
							{standard}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ minWidth: 120 }} size="small">
				<InputLabel id="sort-direction-label">Direction</InputLabel>
				<Select
					labelId="sort-direction-label"
					id="sort-direction"
					value={direction || ""}
					onChange={sortDirectionHandler}
					label="Direction"
				>
					<MenuItem disabled selected value="">
						select
					</MenuItem>
					<MenuItem value={SortingDirection.Ascending}>
						{SortingDirection.Ascending}
					</MenuItem>
					<MenuItem value={SortingDirection.Descending}>
						{SortingDirection.Descending}
					</MenuItem>
				</Select>
			</FormControl>
			<div onClick={randomizeHandler}>
				<FontAwesomeIcon icon={faShuffle} className={classes.icon} />
			</div>
		</div>
	);
};

export default TaskSort;
