import { faChartPie, faChartSimple } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ChartData } from '../../../models/analyzer-models/helper-models';
import { Theme } from '../../../models/design-models';
import { useAppSelector } from '../../../store/redux';
import { round } from '../../../utilities/gen-utils/calc-util';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import Button from '../../ui/buttons/Button';

interface Props {
    currentChartDataArray: ChartData[];
    previousChartDataArray: ChartData[];
    labelColorCallback: (label: string) => string;
    onShowComparisonChart?: () => void;
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

function getPeriodName(plannerMode: PlannerMode | null) {
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return 'week';
        case PlannerMode.MONTLY:
            return 'month';
        case PlannerMode.YEARLY:
            return 'year';
        default:
            return '';
    }
}

const AnalysisMessage: React.FC<Props> = ({
    currentChartDataArray,
    previousChartDataArray,
    labelColorCallback,
}) => {
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);
    const periodName = getPeriodName(plannerMode);

    const totalNumTasks = currentChartDataArray.reduce((acc, curr) => acc + curr.value, 0);
    const proportionMessageBeginning = 'We identified that ';
    const proportionMessagesList: JSX.Element[] = currentChartDataArray.map((statusData) => {
        // statusData.label
        const { value, label } = statusData;
        const proportion = round((value / totalNumTasks) * 100, 1);
        const hexColor = `#${labelColorCallback(label).toLowerCase()}`;
        const message = (
            <>
                <strong className="text-slate-500/90">{proportion}%</strong> of tasks are{' '}
                <span style={{ color: hexColor }}>{label}</span>.&nbsp;
            </>
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
            <span style={{ color: `#${labelColorCallback(label)}` }}>{label}</span>
        );
        const ending: string = idx === currentChartDataArray.length - 1 ? '' : ', ';

        if (difference === 0)
            return (
                <>
                    the same amount of {labelElement} tasks{ending}
                </>
            );
        if (difference > 0)
            return (
                <>
                    <strong className="text-slate-500/90">{difference}</strong> more {labelElement}{' '}
                    tasks{ending}
                </>
            );
        else
            return (
                <>
                    <strong className="text-slate-500/90">{-difference}</strong> less {labelElement}{' '}
                    tasks{ending}
                </>
            );
    });
    const ComparisonMessageEnding = `compared to last ${periodName}.`;
    const comparisonAnalysisElement = (
        <p>
            {ComparisonMessageBeginning} {comparisonMessages} {ComparisonMessageEnding}
        </p>
    );

    const paragraphs = [porportionAnalysisElement, comparisonAnalysisElement];

    return (
        <div className="max-w-[45rem] flex flex-col gap-3 text-lg xl:pr-12">
            {paragraphs.map((p, idx) => (
                <div key={idx} className="flex gap-3">
                    {analysisIcons[idx]}
                    <p>{p}</p>
                </div>
            ))}
            <Button
                className="mt-2 !bg-transparent !border-blue-400 !text-blue-600"
                theme={Theme.TERTIARY}
            >
                Show Comparison
            </Button>
        </div>
    );
};

export default AnalysisMessage;
