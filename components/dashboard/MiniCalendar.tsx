import React from 'react';
import { getMonthMember } from '../../models/date-models/Month';
import MiniNavigator from '../ui/navigation/MiniNavigator';
import SummaryCard from './cards/SummaryCard';
import { useDashboardContext } from './dashboard-context';

const MiniCalendar: React.FC = () => {
    const { currentPeriod } = useDashboardContext();

    const periodLabel = `${getMonthMember(currentPeriod)} ${currentPeriod.getFullYear()}`;

    return (
        <SummaryCard>
            <MiniNavigator onNavigate={() => {}}>{periodLabel}</MiniNavigator>
        </SummaryCard>
    );
};

export default MiniCalendar;
