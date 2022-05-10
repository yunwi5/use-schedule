export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function round(num: number, decimalPlaces: number = 1) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(num * multiplier) / multiplier;
}

export function changeInPercentage(oldValue: number, newValue: number) {
    const amountChange = ((newValue - oldValue) / oldValue) * 100;
    return round(amountChange, 1); // round to 1dp.
}
