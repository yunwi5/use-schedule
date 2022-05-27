export function getImportanceValue(importance: string) {
    switch (importance) {
        case Importance.EXTRA:
            return 1;
        case Importance.TRIVIAL:
            return 2;
        case Importance.NICE_TO_HAVE:
            return 3;
        case Importance.IMPORTANT:
            return 4;
        case Importance.CRUCIAL:
            return 5;
        default:
            return -1;
    }
}

export function getImportanceName(value: number) {
    switch (value) {
        case 1:
            return Importance.EXTRA;
        case 2:
            return Importance.TRIVIAL;
        case 3:
            return Importance.NICE_TO_HAVE;
        case 4:
            return Importance.IMPORTANT;
        case 5:
            return Importance.CRUCIAL;
        default:
            return Importance.EXTRA;
    }
}

export enum Importance {
    EXTRA = 'Extra',
    TRIVIAL = 'Trivial',
    NICE_TO_HAVE = 'Nice to have',
    IMPORTANT = 'Important',
    CRUCIAL = 'Crucial',
}

export const ImportanceList = [
    Importance.CRUCIAL,
    Importance.IMPORTANT,
    Importance.NICE_TO_HAVE,
    Importance.TRIVIAL,
    Importance.EXTRA,
];

export function isImportance(imp: string) {
    const importanceList: string[] = ImportanceList;
    return importanceList.includes(imp);
}

export enum Status {
    OPEN = 'Open',
    CANCELLED = 'Cancelled',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    OVERDUE = 'Overdue',
}

export const StatusList = [
    Status.OPEN,
    Status.CANCELLED,
    Status.IN_PROGRESS,
    Status.COMPLETED,
    Status.OVERDUE,
];

export function isStatus(str: string) {
    const statusList: string[] = StatusList;
    return statusList.includes(str);
}

export function getStatusBgClass(status: string) {
    switch (status) {
        case Status.OPEN:
            return 'bg-emerald-100';
        case Status.IN_PROGRESS:
            return 'bg-indigo-100'; // Indigo
        case Status.COMPLETED:
            return 'bg-sky-100'; // Sky
        case Status.CANCELLED:
            return 'bg-gray-100'; // Gray
        case Status.OVERDUE:
            return 'bg-rose-100'; // Rose
        default:
            return 'bg-slate-100'; // Slate
    }
}

export function getStatusBorderClass(status: string) {
    switch (status) {
        case Status.OPEN:
            return 'border-emerald-500';
        case Status.IN_PROGRESS:
            return 'border-indigo-500'; // Indigo
        case Status.COMPLETED:
            return 'border-sky-500'; // Sky
        case Status.CANCELLED:
            return 'border-gray-500'; // Gray
        case Status.OVERDUE:
            return 'border-rose-500'; // Rose
        default:
            return 'border-slate-500'; // Slate
    }
}

export function getStatusHoverBgClass(status: string) {
    switch (status) {
        case Status.OPEN:
            return 'hover:bg-emerald-200';
        case Status.IN_PROGRESS:
            return 'hover:bg-indigo-200'; // Indigo
        case Status.COMPLETED:
            return 'hover:bg-sky-200'; // Sky
        case Status.CANCELLED:
            return 'hover:bg-gray-200'; // Gray
        case Status.OVERDUE:
            return 'hover:bg-rose-200'; // Rose
        default:
            return 'hover:bg-slate-200'; // Slate
    }
}
