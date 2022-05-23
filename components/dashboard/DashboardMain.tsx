import React from 'react';
import { IEvent } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';

interface Props {
    tasks: AbstractTask[];
    events: IEvent[];
}

const DashboardMain: React.FC<Props> = () => {
    return <main>DashboardMain</main>;
};

export default DashboardMain;
