import React from "react";
import NavList from "./NavList";

interface Props {
	onToggleSidebar: () => void;
	showSidebar: boolean;
}

const SideNav: React.FC<Props> = ({ onToggleSidebar, showSidebar }) => {
	const timePlannerItems = [
		{
			name: "Weekly Planners",
			link: "/task-planner/weekly-planner"
		},
		{
			name: "Montly Planners",
			link: "/task-planner/montly-planner"
		},
		{
			name: "Yearly Planners",
			link: "/task-planner/yearly-planner"
		}
	];
	const templateItems = [
		{
			name: "+ Add New",
			link: "/templates/new"
		}
	];
	const dataAnalysisItems = [
		{
			name: "Weekly Analysis",
			link: "/"
		},
		{
			name: "Montly Analysis",
			link: "/"
		},
		{
			name: "Yearly Analysis",
			link: "/"
		}
	];

	return (
		<nav
			className={`top-[4rem] left-0 fixed bg-slate-400 mw-[11rem] h-full p-2 flex flex-col items-start ${showSidebar
				? "translate-x-0"
				: "-translate-x-full"} ease-in-out duration-300`}
		>
			<h3 className="text-[1.5rem] text-white mt-1">Categories</h3>
			<NavList listName="Time Planners" items={timePlannerItems} />
			<NavList listName="Planner Templates" items={templateItems} />
			<NavList listName="Data Analysis" items={dataAnalysisItems} />
		</nav>
	);
};

export default SideNav;
