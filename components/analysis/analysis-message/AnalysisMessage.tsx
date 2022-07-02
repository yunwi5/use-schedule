import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faChartSimple } from '@fortawesome/pro-duotone-svg-icons';

import { ChartData } from '../../../models/analyzer-models/helper-models';
import { getPeriodName } from '../../../utilities/gen-utils/label-util';
import {
    generateComparisonMessages,
    generateProportionMessages,
} from '../../../utilities/analysis-utils/analysis-message-generation';
import { useAnalysisContext } from '../../../store/context/analysis-context';
import ChartButtons from '../ChartButtons';

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

const AnalysisMessage: React.FC<Props> = (props) => {
    const {
        currentChartDataArray,
        previousChartDataArray,
        labelColorCallback,
        showComparison,
        preposition: prep,
    } = props;
    const { plannerMode, itemName } = useAnalysisContext();
    const periodName = getPeriodName(plannerMode); // either week, month or year
    const preposition: string = prep ?? '';

    // Proportion message (% of total in each period)
    const proportionMessageBeginning = 'We identified that ';
    const proportionMessagesList: JSX.Element[] = generateProportionMessages(
        currentChartDataArray,
        preposition,
        itemName,
        labelColorCallback,
    );
    const porportionAnalysisElement = (
        <p className={`${showComparison ? '' : 'inline ml-2'}`}>
            {proportionMessageBeginning} {proportionMessagesList}
        </p>
    );

    // Comparison message (to the last period)
    const ComparisonMessageBeginning = 'We identified that you have ';
    const comparisonMessages = generateComparisonMessages(
        previousChartDataArray,
        currentChartDataArray,
        itemName,
        labelColorCallback,
    );
    const comparisonMessageEnding = `compared to the last ${periodName}.`;
    const comparisonAnalysisElement = (
        <p>
            {ComparisonMessageBeginning} {comparisonMessages} {comparisonMessageEnding}
        </p>
    );

    return (
        <>
            <div
                className={`order-1 self-center lg:max-w-[49%] mt-3 pr-5 md:pr-8 lg:pr-5 transition-all ${
                    showComparison ? 'lg:w-[49%] flex gap-3' : ''
                }`}
            >
                {chartPieIcon}
                {porportionAnalysisElement}
                {!showComparison && <ChartButtons {...props} />}
            </div>
            {showComparison && (
                <div
                    className={`order-3 self-center mt-3 pr-5 md:pr-8 lg:pr-5 lg:max-w-[49%] transition-all ${
                        showComparison ? 'lg:w-[49%] flex gap-3' : ''
                    }`}
                >
                    {chartSimpleIcon}
                    {comparisonAnalysisElement}
                </div>
            )}
            {showComparison && <ChartButtons {...props} />}
        </>
    );
};

export default AnalysisMessage;
