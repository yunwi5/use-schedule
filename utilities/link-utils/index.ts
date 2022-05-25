// Manages all the links to other routes of the app in one place
export function getAboutLink() {
    return `/about`;
}

export function getContactLink() {
    return `/contact`;
}

// Manages links to template tables.
export function getTemplateTableLink(templateId: string) {
    return `/templates/${templateId}`;
}

export function getTodoListLink(todoListId: string) {
    return `/todos/${todoListId}`;
}
