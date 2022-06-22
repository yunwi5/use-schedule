import { SearchTarget } from '../../components/ui/searchbar/MainSearchbar';

// Manages all the links to other routes of the app in one place
export function getAboutLink() {
    return `/about`;
}

export function getContactLink() {
    return `/contact`;
}

// Manages links to template tables.
export function getNewTemplateLink() {
    return '/templates/new';
}

export function getTemplateTableLink(templateId: string) {
    return `/templates/${templateId}`;
}

export function getTodoListLink(todoListId: string) {
    return `/todos/${todoListId}`;
}

export function getSearchLink(target: SearchTarget, searchWord: string) {
    if (target === 'Event') return `/search/events?q=${searchWord}`;
    return `/search/tasks?q=${searchWord}`;
}
