import { FrequencyMap, generateChartData } from '../../utilities/analysis-utils';
import { generateStatusMap } from '../../utilities/analysis-utils/categorical-data';
import { dateIsBetween } from '../../utilities/date-utils/date-check';
import {
    getMonthBeginning,
    getMonthEnding,
    getWeekBeginning,
    getWeekEnding,
    getYearBeginning,
    getYearEnding,
} from '../../utilities/date-utils/date-get';
import {
    getStatusBackgroundColor,
    getStatusBorderColor,
} from '../../utilities/gen-utils/color-util';
import { Status } from '../task-models/Status';
import { AnalysisItem } from './AnalysisItem';
import { ChartData, ProgressMode } from './helper-models';

function convertStatusMapToProgressArray(statusMap: FrequencyMap) {
    const orderedStatusList = [Status.COMPLETED, Status.IN_PROGRESS, Status.OPEN, Status.OVERDUE];
    const progressArray = orderedStatusList.map((statusKey) => ({
        label: statusKey,
        value: statusMap[statusKey],
        backgroundColor: getStatusBackgroundColor(statusKey),
        borderColor: getStatusBorderColor(statusKey),
    }));
    return progressArray;
}

export class ProgressAnalyzer {
    items: AnalysisItem[] = [];
    constructor(public currentPeriod: Date) {}

    addItem(item: AnalysisItem) {
        // Cancelled items are not counted for progress
        if (item.status === Status.CANCELLED) return;
        this.items.push(item);
    }

    generateWeeklyProgressData() {
        const weekBeginning = getWeekBeginning(this.currentPeriod);
        const weekEnding = getWeekEnding(this.currentPeriod);

        const currentWeekItems = this.items.filter((item) =>
            dateIsBetween(item.dateTime, weekBeginning, weekEnding),
        );
        const statusMap = generateStatusMap(currentWeekItems);
        const statusChartData: ChartData[] = convertStatusMapToProgressArray(statusMap);
        return statusChartData;
    }

    generateMontlyProgressData() {
        const monthBeginning = getMonthBeginning(this.currentPeriod);
        const monthEnding = getMonthEnding(this.currentPeriod);

        const currentWeekItems = this.items.filter((item) =>
            dateIsBetween(item.dateTime, monthBeginning, monthEnding),
        );
        const statusMap = generateStatusMap(currentWeekItems);
        const statusChartData: ChartData[] = convertStatusMapToProgressArray(statusMap);

        return statusChartData;
    }

    generateYearlyProgressData() {
        const yearBeginning = getYearBeginning(this.currentPeriod);
        const yearEnding = getYearEnding(this.currentPeriod);

        const currentWeekItems = this.items.filter((item) =>
            dateIsBetween(item.dateTime, yearBeginning, yearEnding),
        );
        const statusMap = generateStatusMap(currentWeekItems);
        const statusChartData: ChartData[] = convertStatusMapToProgressArray(statusMap);

        return statusChartData;
    }

    getProgressData(progressType: ProgressMode) {
        switch (progressType) {
            case ProgressMode.WEEK:
                return this.generateWeeklyProgressData();
            case ProgressMode.MONTH:
                return this.generateMontlyProgressData();
            case ProgressMode.YEAR:
                return this.generateYearlyProgressData();
            default:
                return this.generateYearlyProgressData();
        }
    }
}
