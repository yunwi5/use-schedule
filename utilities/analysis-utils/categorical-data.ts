import { FrequencyMap, getInitialFrequencyMap } from '.';
import { CategoryList } from '../../models/task-models/Category';
import { ImportanceList, StatusList } from '../../models/task-models/Status';

interface IStatus {
    status: string;
}
export function generateStatusMap(items: IStatus[]): FrequencyMap {
    const statusMap: FrequencyMap = getInitialFrequencyMap(StatusList);
    items.forEach((item) => {
        if (item.status in statusMap) {
            statusMap[item.status] += 1;
        } else {
            statusMap[item.status] = 1;
        }
    });
    return statusMap;
}

interface ImportanceItem {
    importance: string;
}
export function generateImportanceMap(items: ImportanceItem[]) {
    const importanceMap: FrequencyMap = getInitialFrequencyMap(ImportanceList);
    items.forEach((item) => {
        if (item.importance in importanceMap) {
            importanceMap[item.importance] += 1;
        } else {
            importanceMap[item.importance] = 1;
        }
    });
    return importanceMap;
}

interface CategoryItem {
    category?: string;
}
export function generateCategoryMap(items: CategoryItem[]) {
    const categoryMap: FrequencyMap = getInitialFrequencyMap(CategoryList);
    items.forEach((item) => {
        if (!item.category) {
            if ('Others' in categoryMap) categoryMap['Others'] += 1;
            else categoryMap['Others'] = 1;
        } else if (item.category in categoryMap) {
            categoryMap[item.category] += 1;
        } else {
            categoryMap[item.category] = 1;
        }
    });
    return categoryMap;
}

interface SubCategoryItem {
    subCategory?: string;
}
export function generateSubCategoryMap(items: SubCategoryItem[], subCategoryMapList: string[]) {
    const subCategoryMap: FrequencyMap = getInitialFrequencyMap(subCategoryMapList);
    items.forEach((item) => {
        if (!item.subCategory) {
            if ('Others' in subCategoryMap) subCategoryMap['Others'] += 1;
            else subCategoryMap['Others'] = 1;
        } else if (item.subCategory in subCategoryMap) subCategoryMap[item.subCategory] += 1;
        else subCategoryMap[item.subCategory] = 1;
    });
    return subCategoryMap;
}
