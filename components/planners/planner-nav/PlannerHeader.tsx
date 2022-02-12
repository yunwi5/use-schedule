import { faBarsFilter } from "@fortawesome/pro-regular-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Searchbar from "../../ui/Searchbar";
import Button from "../../ui/Button";
import { Theme, Size } from "../../../models/design-models";
import classes from "./PlannerHeader.module.scss";

const PlannerHeader: React.FC = () => {
	return (
		<nav className={`${classes.header} flex items-center justify-between p-4 w-full`}>
			<div>
				<span>Group by</span>
				<select className="ml-2 py-2 px-3">
					<option>Day</option>
					<option>Importance</option>
					<option>Status</option>
				</select>
			</div>
			<div className="mr-auto ml-8">
				Filter
				<button className="bg-slate-600 text-white ml-2  w-10 h-10 rounded-full">
					<FontAwesomeIcon icon={faBarsFilter} className="text-xl" />
				</button>
			</div>
			<Searchbar
				className="mr-6"
				placeholder="Search Task"
				onSearch={(text: string) => console.log(text)}
			/>
			<Button theme={Theme.PRIMARY} size={Size.MEDIUM}>
				+ Add Task
			</Button>
		</nav>
	);
};

export default PlannerHeader;
