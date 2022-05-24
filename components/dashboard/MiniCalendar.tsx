import React from 'react';
import { getMonthMember } from '../../models/date-models/Month';
import MiniNavigator from '../ui/navigation/MiniNavigator';
import SummaryCard from './cards/SummaryCard';
import SummaryHeading from './cards/SummaryHeading';
import { useDashboardContext } from './dashboard-context';

const MiniCalendar: React.FC = () => {
    const { currentPeriod } = useDashboardContext();

    const periodLabel = `${getMonthMember(currentPeriod)} ${currentPeriod.getFullYear()}`;

    return (
        <SummaryCard>
            <SummaryHeading>
                <MiniNavigator onNavigate={() => {}}>{periodLabel}</MiniNavigator>
            </SummaryHeading>
        </SummaryCard>
    );
};

export default MiniCalendar;
