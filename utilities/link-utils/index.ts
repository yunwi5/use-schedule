// Manages all the links to other routes of the app in one place
import { Template } from '../../models/template-models/Template';

// Manages links to template tables.
export function getTemplateTableLink(templateId: string) {
    return `/templates/${templateId}`;
}
