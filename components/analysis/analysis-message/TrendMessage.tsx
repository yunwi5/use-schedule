import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/pro-duotone-svg-icons';

import { ChartData } from '../../../models/analyzer-models/helper-models';
import { getRankingSuffixed } from '../../../utilities/gen-utils/format-util';
import { useAnalysisContext } from '../../../store/context/analysis-context';

interface Props {
    totalTasksTrend: ChartData[];
    totalHoursTrend: ChartData[];
}

const TrendMessage: React.FC<Props> = (props) => {
    const { totalTasksTrend, totalHoursTrend } = props;
    const { timeFrame, itemName } = useAnalysisContext();

    const totalTasksNumPeriods = totalTasksTrend.length || 0; // 5, 10, 15 or 20
    const totalHoursNumPeriods = totalHoursTrend.length || 0;

    const mostRecentTotalTask: ChartData = totalTasksTrend[totalTasksNumPeriods - 1];
    const mostRecentTotalHours: ChartData = totalHoursTrend[totalHoursNumPeriods - 1];

    const numMoreBusyPeriods = totalTasksTrend.reduce((accValue, trendData) => {
        if (trendData.value > mostRecentTotalTask.value) {
            return accValue + 1;
        }
        return accValue;
    }, 0);

    const numMoreBusyPeriodsInHours = totalHoursTrend.reduce((accValue, trendData) => {
        if (trendData.value > mostRecentTotalHours.value) {
            return accValue + 1;
        }
        return accValue;
    }, 0);

    return (
        <div className="mt-1 sm:mt-8 pr-4 md:pr-6 flex flex-col gap-[0.3rem] text-lg">
            <p>
                <FontAwesomeIcon
                    icon={faChartLine}
                    className="max-h-[1.5rem] max-w-[1.5rem] mr-2"
                />
                <span>
                    You have{' '}
                    <strong className="text-slate-500/80">{mostRecentTotalTask.value}</strong>{' '}
                    {itemName}s to do this {timeFrame}, and you are expected to spend{' '}
                    <strong className="text-slate-500/80">{mostRecentTotalHours.value}</strong>{' '}
                    hours on them.{' '}
                </span>
            </p>
            <p>
                <FontAwesomeIcon
                    icon={faChartLine}
                    className="max-h-[1.5rem] max-w-[1.5rem] mr-2"
                />
                <span>
                    This is{' '}
                    <strong className="text-slate-500/80">
                        {getRankingSuffixed(numMoreBusyPeriods + 1, '1rem')}
                    </strong>{' '}
                    busiest {timeFrame} in terms of total {itemName}s in the recent{' '}
                    {totalTasksNumPeriods} {timeFrame}s.
                </span>
                &nbsp;
                <span>
                    This is{' '}
                    <strong className="text-slate-500/80">
                        {getRankingSuffixed(numMoreBusyPeriodsInHours + 1, '1rem')}
                    </strong>{' '}
                    busiest {timeFrame} in terms of total hours in the recent {totalHoursNumPeriods}{' '}
                    {timeFrame}s.
                </span>
            </p>
        </div>
    );
};

export default TrendMessage;
