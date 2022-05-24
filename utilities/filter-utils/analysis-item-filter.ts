import { AnalysisItem } from '../../models/analyzer-models/AnalysisItem';
import { AnalysisMode } from '../../models/analyzer-models/helper-models';
import { isInstanceOfEvent } from '../../models/Event';
import { isInstanceOfTask } from '../../models/task-models/Task';

export const filterItemsOnAnalysisMode = (items: AnalysisItem[], analysisMode: AnalysisMode) => {
    if (analysisMode === AnalysisMode.ALL) return items;
    else if (analysisMode === AnalysisMode.TASKS)
        return items.filter((item) => isInstanceOfTask(item));
    // AnalysisMode.EVENT
    return items.filter((item) => isInstanceOfEvent(item));
};
