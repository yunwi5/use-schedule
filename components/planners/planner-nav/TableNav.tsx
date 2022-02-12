import { faCaretLeft, faCaretRight } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TableNav: React.FC = () => {
	return (
		<div className="mt-2 ml-2 flex items-center justify-between p-3">
			<div className="flex items-center gap-1 text-xl">
				<FontAwesomeIcon className="text-4xl cursor-pointer" icon={faCaretLeft} />
				<p>7/Feb ~ 13/Feb</p>
				<FontAwesomeIcon className="text-4xl cursor-pointer" icon={faCaretRight} />
			</div>

			<div className="flex gap-5 text-lg">
				<span className="py-2 px-4 rounded-full bg-slate-200 hover:bg-slate-300 hover:text-slate-50 text-slate-600">
					13 Tasks Total
				</span>
				<span className="py-2 px-4 rounded-full bg-teal-100 hover:bg-teal-200 text-teal-600 hover:text-teal-50">
					3 Tasks Opened
				</span>
				<span className="py-2 px-4 rounded-full bg-cyan-100 hover:bg-cyan-200 text-cyan-600 hover:text-cyan-50">
					5 Tasks Completed
				</span>
				<span className="py-2 px-4 rounded-full bg-red-200 hover:bg-red-300 text-red-600 hover:text-red-50">
					5 Tasks Overdue
				</span>
			</div>
		</div>
	);
};

export default TableNav;
