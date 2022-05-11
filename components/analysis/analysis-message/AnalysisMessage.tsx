import { faChartPie, faChartSimple } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ChartData } from '../../../models/analyzer-models/helper-models';
import { Theme } from '../../../models/design-models';
import { useAppSelector } from '../../../store/redux';
import { round } from '../../../utilities/gen-utils/calc-util';
import Button from '../../ui/buttons/Button';
import { getPeriodName } from '../../../utilities/gen-utils/label-util';

interface Props {
    currentChartDataArray: ChartData[];
    previousChartDataArray: ChartData[];
    labelColorCallback: (label: string) => string;
    onShowComparison?: () => void;
    showComparison?: boolean;
}

const chartPieIcon = (
    <FontAwesomeIcon
        icon={faChartPie}
        className="max-w-[2rem] max-h-[2rem] text-xl text-slate-500/80 mt-[0.35rem]"
    />
);
const chartSimpleIcon = (
    <FontAwesomeIcon
        icon={faChartSimple}
        className="max-w-[2rem] max-h-[2rem] text-xl text-slate-500/80 mt-[0.35rem]"
    />
);
const analysisIcons = [chartPieIcon, chartSimpleIcon];

const AnalysisMessage: React.FC<Props> = ({
    currentChartDataArray,
    previousChartDataArray,
    labelColorCallback,
    onShowComparison,
    showComparison,
}) => {
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const periodName = getPeriodName(plannerMode);

    const totalNumTasks = currentChartDataArray.reduce((acc, curr) => acc + curr.value, 0);
    const proportionMessageBeginning = 'We identified that ';
    const proportionMessagesList: JSX.Element[] = currentChartDataArray.map((statusData, idx) => {
        // statusData.label
        const { value, label } = statusData;
        const proportion = round((value / totalNumTasks) * 100, 1);
        const hexColor = `#${labelColorCallback(label).toLowerCase()}`;
        const ending: string = idx === currentChartDataArray.length - 1 ? '.' : ', ';
        const message = (
            <span key={idx}>
                <strong className="text-slate-500/90">{proportion}%</strong> of tasks are{' '}
                <span style={{ color: hexColor }}>{label}</span>
                {ending}
            </span>
        );
        return message;
    });
    const porportionAnalysisElement = (
        <p>
            {proportionMessageBeginning} {proportionMessagesList}
        </p>
    );

    const ComparisonMessageBeginning = 'We identified that you have ';
    const comparisonMessages = currentChartDataArray.map((statusData, idx) => {
        const { value: currentValue, label } = statusData;
        const previouStatusData = previousChartDataArray.find((data) => data.label === label);
        if (!previouStatusData) return '';
        // const percentageChange = changeInPercentage(previouStatusData.value, currentValue);
        const difference = currentValue - previouStatusData.value;
        const labelElement = (
            <span className="brightness-50" style={{ color: `#${labelColorCallback(label)}` }}>
                {label}
            </span>
        );
        const ending: string = idx === currentChartDataArray.length - 1 ? '' : ', ';

        if (difference === 0)
            return (
                <span key={idx}>
                    the same amount of {labelElement} tasks{ending}
                </span>
            );
        if (difference > 0)
            return (
                <span key={idx}>
                    <strong className="text-slate-500/90">{difference}</strong> more {labelElement}{' '}
                    tasks{ending}
                </span>
            );
        else
            return (
                <span key={idx}>
                    <strong className="text-slate-500/90">{-difference}</strong> less {labelElement}{' '}
                    tasks{ending}
                </span>
            );
    });
    const ComparisonMessageEnding = `compared to the last ${periodName}.`;
    const comparisonAnalysisElement = (
        <p>
            {ComparisonMessageBeginning} {comparisonMessages} {ComparisonMessageEnding}
        </p>
    );

    const paragraphs = [porportionAnalysisElement, comparisonAnalysisElement];

    return (
        <div
            className={`flex flex-col self-center gap-3 text-lg ${
                showComparison ? '!max-w-none flex-wrap justify-between !flex-row' : 'max-w-[40rem]'
            }`}
        >
            {paragraphs.map((para, idx) => (
                <div key={idx} className={`flex gap-3 ${showComparison ? 'xl:max-w-[49%]' : ''}`}>
                    {analysisIcons[idx]}
                    {para}
                </div>
            ))}
            <Button
                className="mt-2 !bg-transparent !border-blue-400 !text-blue-600"
                theme={Theme.TERTIARY}
                onClick={onShowComparison}
            >
                {showComparison ? 'Hide Comparison' : 'Show Comparison'}
            </Button>
        </div>
    );
};

export default AnalysisMessage;
