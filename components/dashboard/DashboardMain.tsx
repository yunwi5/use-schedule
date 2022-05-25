import React from 'react';
import { IEvent } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import DataSummary from './data-summary/DataSummary';
import ProgressSummary from './progress/ProgressSummary';
import TrendComparison from './trend/TrendComparison';
import UpcomingTable from './tables/upcoming-table/UpcomingTable';
import TemplateTable from './tables/template-table/TemplateTable';
import TableCard from './cards/TableCard';
import PlannerNavigation from './navigation-sections/PlannerNavigation';
import TodoListTable from './tables/todolist-table/TodoListTable';

interface Props {
    tasks: AbstractTask[];
    events: IEvent[];
}

const DashboardMain: React.FC<Props> = () => {
    return (
        <main className="flex flex-col gap-4 p-3 pb-7 text-slate-700">
            <DataSummary />
            <div className="flex flex-col lg:flex-row gap-3">
                <UpcomingTable />
                <TrendComparison />
            </div>
            <ProgressSummary />
            <div className="flex flex-col lg:flex-row flex-wrap gap-3">
                <TemplateTable />
                <PlannerNavigation />
            </div>
            <div className="flex flex-col lg:flex-row flex-wrap gap-3">
                <TodoListTable />
                <div />
            </div>
        </main>
    );
};

export default DashboardMain;
