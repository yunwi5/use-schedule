import React from "react";

import { TemplateTask } from "../../models/template-models/TemplateTask";
import { Template, TemplateFormObj } from "../../models/template-models/Template";

interface Props {
	onInvalidateTasks: () => void;
	onMutateTemplate: (newTemplage: TemplateFormObj, isNew: boolean) => void;
	templateTasks: TemplateTask[];
	template: Template | null;
}

const TemplatePlanner: React.FC<Props> = (props) => {
	const { onInvalidateTasks, onMutateTemplate, templateTasks, template } = props;
	return <div>TemplatePlanner</div>;
};

export default TemplatePlanner;
