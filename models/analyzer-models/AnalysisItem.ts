import { Importance, Status } from '../task-models/Status';

export interface AnalysisItem {
    id: string;
    name: string;
    dateTime: Date; // Date is required for the calendar to display this event
    status: string; // Event can be opened, cancelled, as well as completed, so Status enum would be relevant
    description: string;
    duration: number;
    importance: string;
    userId: string;

    category?: string;
    subCategory?: string;
}
