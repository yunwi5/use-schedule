import { DayPeriod } from '../../models/date-models/DayPeriod';
import { WeekDay } from '../../models/date-models/WeekDay';
import { Category } from '../../models/task-models/Category';
import { Importance, Status } from '../../models/task-models/Status';

function rgbToHex(r: number, g: number, b: number): string {
    function toHex(a: number) {
        if (a <= 0) return '00';
        else if (a >= 255) return 'FF';
        else {
            let hexValue = a.toString(16);
            if (hexValue.length === 1) hexValue = '0' + hexValue;
            return hexValue;
        }
    }
    return toHex(r) + toHex(g) + toHex(b);
}

export function getStatusBackgroundColor(status: string): string {
    switch (status) {
        case Status.OPEN:
            return rgbToHex(153, 245, 228); // Teal
        case Status.IN_PROGRESS:
            return rgbToHex(199, 210, 254); // Indigo
        case Status.COMPLETED:
            return rgbToHex(186, 230, 253); // Sky
        case Status.CANCELLED:
            return rgbToHex(229, 231, 235); // Gray
        case Status.OVERDUE:
            return rgbToHex(254, 205, 211); // Rose
        default:
            return rgbToHex(226, 232, 240); // Slate
    }
}

export function getImportanceBackgroundColor(importance: string): string {
    switch (importance) {
        case Importance.CRUCIAL:
            return rgbToHex(244, 63, 94);
        case Importance.IMPORTANT:
            return rgbToHex(253, 164, 175);
        case Importance.NICE_TO_HAVE:
            return rgbToHex(254, 205, 211);
        case Importance.TRIVIAL:
            return rgbToHex(255, 228, 230);
        case Importance.EXTRA:
            return rgbToHex(255, 241, 242);
        default:
            return rgbToHex(255, 228, 230);
    }
}

export function getCategoryBackgroundColor(category: string) {
    switch (category) {
        case Category.HOME:
            return rgbToHex(125, 211, 252); // Sky
        case Category.LEISURE:
            return rgbToHex(103, 232, 249); // Cyan
        case Category.PERSONAL:
            return rgbToHex(2543, 224, 71); // yellow
        case Category.SCHOOL_UNIVERSITY:
            return rgbToHex(196, 181, 253); // Violet
        case Category.WORK:
            return rgbToHex(249, 168, 212); // Pink
        default:
            return rgbToHex(203, 213, 225); // Slate
    }
}

export function getWeekDayBackgroundColor(weekDay: string) {
    switch (weekDay) {
        case WeekDay.MONDAY:
            return rgbToHex(254, 205, 211); // Rose
        case WeekDay.TUESDAY:
            return rgbToHex(254, 215, 170); // Orange
        case WeekDay.WEDNESDAY:
            return rgbToHex(254, 240, 138); // Yellow
        case WeekDay.THURSDAY:
            return rgbToHex(153, 246, 228); // Teal
        case WeekDay.FRIDAY:
            return rgbToHex(191, 219, 254); // Blue
        case WeekDay.SATURDAY:
            return rgbToHex(199, 210, 254); // Indigo
        case WeekDay.SUNDAY:
            return rgbToHex(221, 214, 254); // violet
        default:
            return rgbToHex(203, 213, 225); // Slate - not suppoed to happen
    }
}

export function getDayPeriodBackgroundColor(dayPeriod: string) {
    switch (dayPeriod) {
        case DayPeriod.AM:
            return rgbToHex(254, 205, 211); // Rose
        case DayPeriod.PM:
            // return rgbToHex(125, 211, 252); // Sky
            return rgbToHex(186, 230, 253); // Sky
        // return rgbToHex(191, 219, 254); // Blue
        default:
            return rgbToHex(203, 213, 225); // Slate - not suppoed to happen
    }
}

export function getStatusBorderColor(status: string): string {
    // 500 tone
    switch (status.trim()) {
        case Status.OPEN:
            return rgbToHex(20, 184, 166); // Teal
        case Status.IN_PROGRESS:
            return rgbToHex(99, 102, 241); // Indigo
        case Status.COMPLETED:
            return rgbToHex(14, 165, 233); // Sky
        case Status.CANCELLED:
            return rgbToHex(107, 114, 128); // Gray
        case Status.OVERDUE:
            return rgbToHex(244, 63, 94); // Rose
        default:
            return rgbToHex(100, 116, 139); // Slate
    }
}

export function getImportanceBorderColor(importance: string): string {
    switch (importance) {
        case Importance.CRUCIAL:
            return rgbToHex(244, 63, 94);
        case Importance.IMPORTANT:
            return rgbToHex(253, 164, 175);
        default:
            return rgbToHex(100, 116, 139);
    }
}

export function getCategoryBorderColor(category: string): string {
    // 500 line
    switch (category) {
        case Category.HOME:
            return rgbToHex(59, 130, 246); // Blue
        case Category.LEISURE:
            return rgbToHex(6, 182, 212); // Cyan
        case Category.PERSONAL:
            return rgbToHex(234, 179, 8); // yellow
        case Category.SCHOOL_UNIVERSITY:
            return rgbToHex(139, 92, 246); // Violet
        case Category.WORK:
            return rgbToHex(217, 70, 239); // Fuchsia
        default:
            return rgbToHex(100, 116, 139); // Slate
    }
}

export function getWeekDayBorderColor(weekDay: string) {
    // 500 tone
    switch (weekDay) {
        case WeekDay.MONDAY:
            return rgbToHex(244, 63, 94); // Rose
        case WeekDay.TUESDAY:
            return rgbToHex(249, 115, 22); // Orange
        case WeekDay.WEDNESDAY:
            return rgbToHex(234, 179, 8); // Yellow
        case WeekDay.THURSDAY:
            return rgbToHex(20, 184, 166); // Teal
        case WeekDay.FRIDAY:
            return rgbToHex(59, 130, 246); // Blue
        case WeekDay.SATURDAY:
            return rgbToHex(99, 102, 241); // Indigo
        case WeekDay.SUNDAY:
            return rgbToHex(139, 92, 246); // violet
        default:
            return rgbToHex(100, 116, 139); // Slate
    }
}

export function getDayPeriodBorderColor(dayPeriod: string) {
    // 500 tone
    switch (dayPeriod) {
        case DayPeriod.AM:
            return rgbToHex(236, 72, 153); // Pink
        case DayPeriod.PM:
            return rgbToHex(14, 165, 233); // Sky
        default:
            return rgbToHex(203, 213, 225); // Slate - not suppoed to happen
    }
}

export function getRecentTrendBackgroundColor(period?: string) {
    return rgbToHex(191, 219, 254);
}
