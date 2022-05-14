import { ChartData } from '../../models/analyzer-models/helper-models';
import { round } from '../gen-utils/calc-util';

export function generateProportionMessages(
    currentChartDataArray: ChartData[],
    preposition: string,
    itemName: string,
    labelColorCallback: (label: string) => string,
) {
    const totalNumTasks = currentChartDataArray.reduce((acc, curr) => acc + curr.value, 0);
    return currentChartDataArray.map((statusData, idx) => {
        const { value, label } = statusData;
        const proportion = round((value / totalNumTasks) * 100, 1);
        const hexColor = `#${labelColorCallback(label)}`;
        const ending: string = idx === currentChartDataArray.length - 1 ? '.' : ', ';
        const message = (
            <span key={idx}>
                <strong className="text-slate-500/90">{proportion}%</strong> of {itemName}s are{' '}
                {preposition} <span style={{ color: hexColor }}>{label}</span>
                {ending}
            </span>
        );
        return message;
    });
}

export function generateComparisonMessages(
    previousChartDataArray: ChartData[],
    currentChartDataArray: ChartData[],
    itemName: string,
    labelColorCallback: (label: string) => string,
) {
    const comparisonMessages = currentChartDataArray.map((statusData, idx) => {
        const { value: currentValue, label } = statusData;
        const previouStatusData = previousChartDataArray.find((data) => data.label === label);
        if (!previouStatusData) return '';
        const difference = currentValue - previouStatusData.value;
        const labelElement = (
            <span style={{ color: `#${labelColorCallback(label)}` }}>{label}</span>
        );
        const suffix = Math.abs(difference) > 1 ? 's' : '';
        const ending: string = idx === currentChartDataArray.length - 1 ? '' : ', ';

        if (difference === 0)
            return (
                <span key={idx}>
                    the same amount of {labelElement} {itemName}s{ending}
                </span>
            );
        if (difference > 0)
            return (
                <span key={idx}>
                    <strong className="text-slate-500/90">{difference}</strong> more {labelElement}{' '}
                    {itemName}
                    {suffix}
                    {ending}
                </span>
            );
        else
            return (
                <span key={idx}>
                    <strong className="text-slate-500/90">{-difference}</strong> less {labelElement}{' '}
                    {itemName}
                    {suffix}
                    {ending}
                </span>
            );
    });
    return comparisonMessages;
}
