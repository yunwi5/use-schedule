export function min(...dates: Date[]) {
    let currMin = dates[0];
    dates.forEach((d) => {
        if (d.getTime() < currMin.getTime()) currMin = d;
    });
    return currMin;
}

export function max(...dates: Date[]) {
    let currMax = dates[0];
    dates.forEach((d) => {
        if (d.getTime() > currMax.getTime()) currMax = d;
    });
    return currMax;
}
