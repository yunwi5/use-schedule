import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { TemplateTask } from "../../models/template-models/TemplateTask";
import { Template, TemplateFormObj } from "../../models/template-models/Template";
import { plannerActions } from "../../store/redux/planner-slice";
import { PlannerMode } from "../../models/planner-models/PlannerMode";

function getTemplateWeekBeginning () {
	// Template beginning time
	// Mon Jan 01 1900 00:00:00 GMT+1130
	const date = new Date(0, 0, 1);
	return date;
}

interface Props {
	onInvalidateTasks: () => void;
	onMutateTemplate: (newTemplage: TemplateFormObj, isNew: boolean) => void;
	templateTasks: TemplateTask[];
	template: Template | null;
}

const TemplatePlanner: React.FC<Props> = (props) => {
	const { onInvalidateTasks, onMutateTemplate, templateTasks, template } = props;

	const dispatch = useDispatch();
	const templateWeekBeginning = getTemplateWeekBeginning();

	dispatch(plannerActions.setBeginningPeriod(templateWeekBeginning.toString()));
	// No need to navigate between different weeks and period, bc this is a template planner.

	// Only runs on mount.
	useEffect(() => {
		dispatch(plannerActions.setPlannerMode(PlannerMode.TEMPLATE));
	}, []);

	return <div>TemplatePlanner</div>;
};

export default TemplatePlanner;
