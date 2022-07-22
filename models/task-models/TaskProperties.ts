import { PlannerMode } from '../planner-models/PlannerMode';
import { Category, SubCategory } from './Category';
import { Importance, Status } from './Status';

// Interface for updating task obj.
export interface TaskProps {
    name?: string;
    timeString?: string;
    description?: string;
    duration?: number;
    category?: Category;
    subCategory?: SubCategory;
    status?: Status;
    userId?: string;
    importance?: Importance;

    dueDateString?: string;
    plannerType?: PlannerMode;
    comment?: string;
}

export interface SubTaskProperties {
    name?: string;
    order?: number; // To arrange subtasks in order in the list.
    isImportant?: boolean;
    isCompleted?: boolean;
    parentTaskId?: string;
}
