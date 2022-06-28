import { SearchTarget } from '../../components/ui/searchbar/MainSearchbar';

// Manages all the links to other routes of the app in one place
export function getAboutLink() {
    return `/about`;
}

export function getContactLink() {
    return `/contact`;
}

export function getDashboardLink() {
    return `/dashboard`;
}

export function getRecurringEventLink() {
    return `/recurring/events`;
}

export function getWeeklyAnalysisLink() {
    return `/task-planner/weekly-planner/analysis`;
}

export function getMonthlyyAnalysisLink() {
    return `/task-planner/monthly-planner/analysis`;
}

export function getYearlyAnalysisLink() {
    return `/task-planner/yearly-planner/analysis`;
}

// Manages links to template tables.
export function getNewTemplateLink() {
    return '/templates/new';
}

export function getTemplateTableLink(templateId: string) {
    return `/templates/${templateId}`;
}

export function getNewTodoListLink() {
    return `/todos/new`;
}

export function getTodoListLink(todoListId: string) {
    return `/todos/${todoListId}`;
}

export function getSearchLink(target: SearchTarget, searchWord: string) {
    if (target === 'Event') return `/search/events?q=${searchWord}`;
    return `/search/tasks?q=${searchWord}`;
}
