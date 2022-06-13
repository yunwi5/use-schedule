export function getItemPartStyles(item: any) {
    if ('category' in item || 'subCategory' in item) {
        // This is task item
        return {
            labelClass: taskLabelClass,
            labelIconClass,
            linkHoverClass,
        };
    }
    return {
        labelClass: eventLabelClass,
        labelIconClass,
        linkHoverClass,
    };
}

export const eventLabelClass = 'text-sky-600/75 font-semibold';
export const taskLabelClass = 'text-blue-600/75 font-semibold';
export const labelIconClass = `icon-medium mr-2`;
export const linkHoverClass = 'hover:underline-offset-2 hover:underline';

export const eventStyles = {
    labelClass: 'text-sky-600/75 font-semibold',
    labelIconClass: `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`,
    linkHoverClass: 'hover:underline-offset-2 hover:underline',
};
