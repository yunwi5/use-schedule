import React from 'react';
import { IEvent } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import DataSummary from './data-summary/DataSummary';

interface Props {
    tasks: AbstractTask[];
    events: IEvent[];
}

const DashboardMain: React.FC<Props> = () => {
    return (
        <main className="lg:p-5 text-slate-700">
            <DataSummary />
        </main>
    );
};

export default DashboardMain;
