import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import {
	SubTaskSort as SortingStandard,
	SubTaskSortList,
	SortingDirection
} from "../../../models/sorting-models";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
	onSort: (sortingStandard: SortingStandard, direction?: SortingDirection) => void;
}

const SubTaskSorter: React.FC<Props> = (props) => {
	const { onSort } = props;
	const [ sortingStand, setSortingStand ] = useState("");

	const sortingHandler = (e: SelectChangeEvent) => {
		const newSortingStandard = e.target.value;
		if (!newSortingStandard) return;
		setSortingStand(newSortingStandard);
		onSort(newSortingStandard as SortingStandard);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="mr-0">
			<InputLabel id="subtask-sort-label">Sort By</InputLabel>
			<Select
				labelId="subtask-sort-label"
				id="subtask-sort"
				value={sortingStand}
				label="Sort By"
				onChange={sortingHandler}
			>
				<MenuItem value="">None</MenuItem>
				{SubTaskSortList.map((standard) => (
					<MenuItem key={standard} value={standard}>
						{standard}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SubTaskSorter;
