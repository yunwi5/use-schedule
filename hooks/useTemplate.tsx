import { PlannerMode } from '../models/planner-models/PlannerMode';
import { useAppSelector } from '../store/redux';

interface Props {}

const useTemplate = (props?: Props) => {
	const plannerMode = useAppSelector((state) => state.planner.plannerMode);
	const currentTemplate = useAppSelector((state) => state.template.currentActiveTemplate);
	return {
		currentTemplate: plannerMode === PlannerMode.TEMPLATE ? currentTemplate : null,
		plannerMode,
	};
};

export default useTemplate;
