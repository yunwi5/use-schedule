import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { TemplateTask } from "../../models/template-models/TemplateTask";
import { TemplatePlanner as Planner } from "../../models/template-models/TemplatePlanner";
import { Template, TemplateFormObj } from "../../models/template-models/Template";
import { plannerActions } from "../../store/redux/planner-slice";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import PlannerCard from "../ui/cards/PlannerCard";
import PlannerTableCard from "../ui/cards/PlannerTableCard";
import PlannerHeader from "../planners/planner-nav/PlannerHeader";
import TemplateTable from "./TemplateTable";
import { Task } from "../../models/task-models/Task";
import TemplateForm from "./form/TemplateForm";

function getTemplateWeekBeginning () {
	// Template beginning time
	// Mon Jan 01 1900 00:00:00 GMT+1130
	const date = new Date(0, 0, 1);
	return date;
}

function populateTemplatePlanner (tasks: Task[], templateWeekBeginning: Date, template: Template) {
	const planner = new Planner(templateWeekBeginning, template);
	for (const task of tasks) {
		if (task.templateId !== template.id) {
			console.error("task templateId does not match template.id!");
		}
		const templateTask = new TemplateTask(task, template.id);
		planner.addTask(templateTask);
	}

	return planner;
}

interface Props {
	onInvalidateTasks: () => void;
	onMutateTemplate: (newTemplage: TemplateFormObj, isNew: boolean) => void;
	templateTasks: Task[];
	template: Template | null;
}

const TemplatePlanner: React.FC<Props> = (props) => {
	const { onInvalidateTasks, onMutateTemplate, templateTasks: initialTasks, template } = props;
	const [ planner, setPlanner ] = useState<Planner | null>(null);

	const dispatch = useDispatch();
	const templateWeekBeginning = useMemo(() => getTemplateWeekBeginning(), []);

	dispatch(plannerActions.setBeginningPeriod(templateWeekBeginning.toString()));
	// No need to navigate between different weeks and period, bc this is a template planner.

	useEffect(
		() => {
			if (!template) return;
			const newPlanner = populateTemplatePlanner(
				initialTasks,
				templateWeekBeginning,
				template
			);
			setPlanner(newPlanner);
		},
		[ templateWeekBeginning, initialTasks, template ]
	);

	// Only runs on mount.
	useEffect(() => {
		dispatch(plannerActions.setPlannerMode(PlannerMode.TEMPLATE));
	}, []);

	return (
		<PlannerCard>
			<TemplateForm onSubmit={onMutateTemplate} isNew={!template} />
			<PlannerTableCard>
				<PlannerHeader
					beginningPeriod={templateWeekBeginning}
					onMutate={onInvalidateTasks}
					preventTaskAdd={{
						message: "Please complete your template form first!"
					}}
				/>
				<TemplateTable
					weekBeginning={templateWeekBeginning}
					planner={planner}
					onMutate={onInvalidateTasks}
				/>
			</PlannerTableCard>
		</PlannerCard>
	);
};

export default TemplatePlanner;