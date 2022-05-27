export function generateDayTimeLine(): string[] {
    const timeLines = [];
    for (let clock = 1; clock <= 24; clock++) {
        const hour = clock % 12 === 0 ? 12 : clock % 12;
        let suffix = clock > 12 ? 'PM' : 'AM';
        if (hour === 12) {
            suffix = clock === 12 ? 'PM' : 'AM';
        }
        timeLines.push(`${hour} ${suffix}`);
    }
    return timeLines;
}
