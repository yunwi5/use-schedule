import { PlannerMode } from '../../models/planner-models/PlannerMode';

export function getPeriodName(plannerMode: PlannerMode | null) {
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return 'week';
        case PlannerMode.MONTLY:
            return 'month';
        case PlannerMode.YEARLY:
            return 'year';
        case PlannerMode.TEMPLATE:
            return 'week';
        default:
            return 'unknown';
    }
}
