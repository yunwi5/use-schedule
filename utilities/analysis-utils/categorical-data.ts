import { FrequencyMap, getInitialFrequencyMap } from '.';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { CategoryList } from '../../models/task-models/Category';
import { ImportanceList, StatusList } from '../../models/task-models/Status';

export function generateStatusMap(tasks: AbstractTask[]): FrequencyMap {
    const statusMap: FrequencyMap = getInitialFrequencyMap(StatusList);
    tasks.forEach((task) => {
        if (task.status in statusMap) {
            statusMap[task.status] += 1;
        } else {
            statusMap[task.status] = 1;
        }
    });
    return statusMap;
}

export function generateImportanceMap(tasks: AbstractTask[]) {
    const importanceMap: FrequencyMap = getInitialFrequencyMap(ImportanceList);
    tasks.forEach((task) => {
        if (task.importance in importanceMap) {
            importanceMap[task.importance] += 1;
        } else {
            importanceMap[task.importance] = 1;
        }
    });
    return importanceMap;
}

export function generateCategoryMap(tasks: AbstractTask[]) {
    const categoryMap: FrequencyMap = getInitialFrequencyMap(CategoryList);
    tasks.forEach((task) => {
        if (task.category in categoryMap) {
            categoryMap[task.category] += 1;
        } else {
            categoryMap[task.category] = 1;
        }
    });
    return categoryMap;
}
