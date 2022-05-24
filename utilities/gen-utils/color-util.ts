import { DayPeriod } from '../../models/date-models/DayPeriod';
import { Month, MonthList } from '../../models/date-models/Month';
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

const ROSE_200 = rgbToHex(254, 205, 211);
const ORANGE_200 = rgbToHex(254, 215, 170);
const YELLOW_200 = rgbToHex(254, 240, 138);
const LIME_200 = rgbToHex(217, 249, 157);
const TEAL_200 = rgbToHex(153, 246, 228);
const CYAN_200 = rgbToHex(165, 243, 252);
const SKY_200 = rgbToHex(186, 230, 253);
const BLUE_200 = rgbToHex(191, 219, 254);
const INDIGO_200 = rgbToHex(199, 210, 254);
const VIOLET_200 = rgbToHex(221, 214, 254);
const PURPLE_200 = rgbToHex(233, 213, 255);
const FUCHSIA_200 = rgbToHex(245, 208, 254);
const PINK_200 = rgbToHex(251, 207, 232);
const SLATE_200 = rgbToHex(203, 213, 225);
const GRAY_200 = rgbToHex(229, 231, 235);

export const Pallete200 = {
    ROSE: ROSE_200,
    ORANGE: ORANGE_200,
    YELLOW: YELLOW_200,
    LIME: LIME_200,
    TEAL: TEAL_200,
    CYAN: CYAN_200,
    SKY: SKY_200,
    BLUE: BLUE_200,
    INDIGO: INDIGO_200,
    VIOLET: VIOLET_200,
    PURPLE: PURPLE_200,
    FUCHSIA: FUCHSIA_200,
    PINK: PINK_200,
    SLATE: SLATE_200,
    GRAY: GRAY_200,
};

const ROSE_500 = rgbToHex(244, 63, 94);
const ORANGE_500 = rgbToHex(249, 115, 22);
const YELLOW_500 = rgbToHex(234, 179, 8);
const LIME_500 = rgbToHex(132, 204, 22); // rgb(132, 204, 22)
const TEAL_500 = rgbToHex(20, 184, 166); // rgb(20, 184, 166)
const CYAN_500 = rgbToHex(6, 182, 212); // rgb(6, 182, 212)
const SKY_500 = rgbToHex(14, 165, 233); // rgb(14, 165, 233)
const BLUE_500 = rgbToHex(59, 130, 246); // rgb(59, 130, 246)
const INDIGO_500 = rgbToHex(99, 102, 241); // rgb(99, 102, 241)
const VIOLET_500 = rgbToHex(139, 92, 246); // rgb(139, 92, 246)
const PURPLE_500 = rgbToHex(168, 85, 247); // rgb(168, 85, 247)
const FUCHSIA_500 = rgbToHex(217, 70, 239); // rgb(217, 70, 239)
const PINK_500 = rgbToHex(236, 72, 153); // rgb(236, 72, 153)
const SLATE_500 = rgbToHex(100, 116, 139); // rgb(100, 116, 139)
const GRAY_500 = rgbToHex(107, 114, 128);

export const Pallete500 = {
    ROSE: ROSE_500,
    ORANGE: ORANGE_500,
    YELLOW: YELLOW_500,
    LIME: LIME_500,
    TEAL: TEAL_500,
    CYAN: CYAN_500,
    SKY: SKY_500,
    BLUE: BLUE_500,
    INDIGO: INDIGO_500,
    VIOLET: VIOLET_500,
    PURPLE: PURPLE_500,
    FUCHSIA: FUCHSIA_500,
    PINK: PINK_500,
    SLATE: SLATE_500,
    GRAY: GRAY_500,
};

export function getMonthBackgroundColor(month: string) {
    const monthColorPallets = [
        ROSE_200,
        ORANGE_200,
        YELLOW_200,
        LIME_200,
        TEAL_200,
        CYAN_200,
        SKY_200,
        BLUE_200,
        INDIGO_200,
        VIOLET_200,
        PURPLE_200,
        FUCHSIA_200,
    ];
    const index = (MonthList as string[]).indexOf(month);
    if (index >= 0) return monthColorPallets[index];
    return SLATE_200;
}

export function getMonthBorderColor(month: string) {
    const monthColorPallets = [
        ROSE_500,
        ORANGE_500,
        YELLOW_500,
        LIME_500,
        TEAL_500,
        CYAN_500,
        SKY_500,
        BLUE_500,
        INDIGO_500,
        VIOLET_500,
        PURPLE_500,
        FUCHSIA_500,
    ];
    const index = (MonthList as string[]).indexOf(month);
    if (index >= 0) return monthColorPallets[index];
    return SLATE_500;
}

//TODO: Needs refactoring
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

export function getSubCategoryBackgroundColorPallets(subCategoryList: string[]) {
    // 200 tone
    let subCategoryBgListDefault = [
        rgbToHex(254, 205, 211), // Rose
        rgbToHex(254, 215, 170), // Ornage,
        rgbToHex(254, 240, 138), // Yellow
        rgbToHex(153, 246, 228), // Teal
        rgbToHex(191, 219, 254), // Blue
        rgbToHex(199, 210, 254), // Indigo
        rgbToHex(221, 214, 254), // violet
        rgbToHex(245, 208, 254), // funchsia
        rgbToHex(203, 213, 225), // Slate
    ];

    const len = subCategoryList.length;
    const subCategoryBgList = subCategoryBgListDefault
        .slice(0, len - 1)
        .concat([rgbToHex(203, 213, 225)])
        .concat(subCategoryBgListDefault.slice(len - 1));

    return subCategoryBgList;
}

export function getSubCategoryBorderColorPallets(subCategoryList: string[]) {
    const subCategoryBorderListDefault = [
        rgbToHex(244, 63, 94), // Rose,
        rgbToHex(249, 115, 22), // Orange,
        rgbToHex(234, 179, 8), // Yellow,
        rgbToHex(20, 184, 166), // Teal
        rgbToHex(59, 130, 246), // Blue
        rgbToHex(99, 102, 241), // Indigo
        rgbToHex(139, 92, 246), // Violet
        rgbToHex(217, 70, 239), // Fuchsia
        rgbToHex(100, 116, 139), // Slate
    ];

    const len = subCategoryList.length;
    const subCategoryBorderList = subCategoryBorderListDefault
        .slice(0, len - 1)
        .concat([rgbToHex(203, 213, 225)]);

    return subCategoryBorderList;
}
