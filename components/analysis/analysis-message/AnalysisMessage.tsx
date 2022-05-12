import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faChartSimple } from '@fortawesome/pro-duotone-svg-icons';

import { useAppSelector } from '../../../store/redux';
import { ChartData } from '../../../models/analyzer-models/helper-models';
import { Theme } from '../../../models/design-models';
import { getPeriodName } from '../../../utilities/gen-utils/label-util';
import { round } from '../../../utilities/gen-utils/calc-util';
import Button from '../../ui/buttons/Button';

interface Props {
    currentChartDataArray: ChartData[];
    previousChartDataArray: ChartData[];
    labelColorCallback: (label: string) => string;
    onShowComparison?: () => void;
    showComparison?: boolean;
    preposition?: string;
    additionalButton?: JSX.Element;
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

const AnalysisMessage: React.FC<Props> = (props) => {
    const {
        currentChartDataArray,
        previousChartDataArray,
        labelColorCallback,
        onShowComparison,
        showComparison,
        preposition: prep,
        additionalButton, // additional button like showing subcategory etc
    } = props;
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const periodName = getPeriodName(plannerMode);

    const preposition: string = prep ?? '';
    const totalNumTasks = currentChartDataArray.reduce((acc, curr) => acc + curr.value, 0);

    // Proportion message (% of total in each period)
    const proportionMessageBeginning = 'We identified that ';
    const proportionMessagesList: JSX.Element[] = currentChartDataArray.map((statusData, idx) => {
        const { value, label } = statusData;
        const proportion = round((value / totalNumTasks) * 100, 1);
        const hexColor = `#${labelColorCallback(label)}`;
        const ending: string = idx === currentChartDataArray.length - 1 ? '.' : ', ';
        const message = (
            <span key={idx}>
                <strong className="text-slate-500/90">{proportion}%</strong> of tasks are{' '}
                {preposition} <span style={{ color: hexColor }}>{label}</span>
                {ending}
            </span>
        );
        return message;
    });
    const porportionAnalysisElement = (
        <p className={`${showComparison ? '' : 'inline ml-2'}`}>
            {proportionMessageBeginning} {proportionMessagesList}
        </p>
    );

    // Comparison message (to the last period)
    const ComparisonMessageBeginning = 'We identified that you have ';
    const comparisonMessages = currentChartDataArray.map((statusData, idx) => {
        const { value: currentValue, label } = statusData;
        const previouStatusData = previousChartDataArray.find((data) => data.label === label);
        if (!previouStatusData) return '';
        const difference = currentValue - previouStatusData.value;
        const labelElement = (
            <span className="" style={{ color: `#${labelColorCallback(label)}` }}>
                {label}
            </span>
        );
        const suffix = difference > 1 ? 's' : '';
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
                    tasks{suffix}
                    {ending}
                </span>
            );
        else
            return (
                <span key={idx}>
                    <strong className="text-slate-500/90">{-difference}</strong> less {labelElement}{' '}
                    tasks{suffix}
                    {ending}
                </span>
            );
    });
    const ComparisonMessageEnding = `compared to the last ${periodName}.`;
    const comparisonAnalysisElement = (
        <p>
            {ComparisonMessageBeginning} {comparisonMessages} {ComparisonMessageEnding}
        </p>
    );

    let paragraphs = [porportionAnalysisElement];
    if (showComparison) paragraphs.push(comparisonAnalysisElement);

    return (
        <div
            className={`flex flex-col self-center gap-3 text-lg ${
                showComparison ? '' : 'max-w-[40rem]'
            }`}
        >
            <div className={'flex flex-col lg:flex-row gap-3'}>
                {paragraphs.map((para, idx) => (
                    <div
                        key={idx}
                        className={`pr-5 md:pr-8 lg:pr-5 transition-all lg:max-w-none ${
                            showComparison ? 'lg:w-[49%] flex gap-3' : ''
                        }`}
                    >
                        {analysisIcons[idx]}
                        {para}
                    </div>
                ))}
            </div>
            <div className={`w-full mt-2 flex flex-wrap flex-col sm:flex-row gap-4`}>
                <Button
                    className={`!bg-transparent !border-blue-400 !text-blue-600`}
                    theme={Theme.TERTIARY}
                    onClick={onShowComparison}
                >
                    {showComparison ? 'Hide Comparison' : 'Show Comparison'}
                </Button>
                {additionalButton}
            </div>
        </div>
    );
};

export default AnalysisMessage;
