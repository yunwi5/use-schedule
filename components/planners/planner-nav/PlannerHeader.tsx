import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/pro-duotone-svg-icons";

import PlannerTaskAdd from "../planner-modal/PlannerTaskAdd";
import Searchbar from "../../ui/Searchbar";
import PlannerFilter from "../planner-support/PlannerFilter";
import GroupSelect from "../planner-support/GroupSelect";
import Button from "../../ui/Button";
import { Theme, Size, ButtonTheme } from "../../../models/design-models";
import classes from "./PlannerHeader.module.scss";

interface Props {
	beginningPeriod: Date;
	onMutate: () => void;
}

const PlannerHeader: React.FC<Props> = (props) => {
	const { beginningPeriod, onMutate } = props;
	const [ isAdding, setIsAdding ] = useState(false);

	const foldTasksHandler = () => {
		console.log("Fold all tasks list on the page!");
	};

	return (
		<nav className={`${classes.header} flex items-center justify-between p-4 w-full`}>
			{/* Task Add Modal */}
			{isAdding && (
				<PlannerTaskAdd
					onClose={() => setIsAdding(false)}
					onAddTask={() => onMutate()}
					beginningPeriod={beginningPeriod}
				/>
			)}

			<GroupSelect />
			<PlannerFilter />

			<div className={classes.right}>
				<Searchbar
					className={""}
					placeholder="Search Task"
					onSearch={(text: string) => console.log(text)}
				/>
				<Button
					className={`flex items-center ${classes.btn} border-slate-100`}
					theme={ButtonTheme.PRIMARY_EMPTY}
					size={Size.MEDIUM}
					onClick={foldTasksHandler}
				>
					<FontAwesomeIcon
						className="mr-2 max-w-[1.3rem]"
						icon={faFolderOpen as any}
					/>{" "}
					Fold All
				</Button>
				<Button
					className={`rounded-md ${classes.btn}`}
					theme={Theme.PRIMARY}
					size={Size.MEDIUM}
					onClick={() => setIsAdding((prev) => !prev)}
				>
					+ Add Task
				</Button>
			</div>
		</nav>
	);
};

export default PlannerHeader;
