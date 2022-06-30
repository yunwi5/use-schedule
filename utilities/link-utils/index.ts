import { SearchTarget } from '../../components/ui/searchbar/MainSearchbar';
import { PlannerMode } from '../../models/planner-models/PlannerMode';

// Manages all the links to other routes of the app in one place
export function getAboutLink(localSection?: string) {
    if (localSection == null) return `/about`;
    const link = localSection.trim().startsWith('#')
        ? localSection.trim()
        : `#${localSection.trim()}`;
    return `/about/${link}`;
}

export function getContactLink() {
    return `/contact`;
}

export function getCalendarLink() {
    return `/calendar`;
}

export function getDashboardLink() {
    return `/dashboard`;
}

export function getRecurringEventLink() {
    return `/recurring/events`;
}

export function getAnalysisLink(mode: PlannerMode = PlannerMode.WEEKLY) {
    return `/task-planner/${mode}/analysis`;
}

export function getPlannerLink(plannerMode: PlannerMode = PlannerMode.WEEKLY) {
    return `task-planner/${plannerMode}`;
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
