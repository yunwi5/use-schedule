import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { plannerActions } from '../../../store/redux/planner-slice';
import IntroPanel from '../planner-nav/IntroPanel';
import MontlyTable from './MontlyTable';
import PlannerHeader from '../planner-nav/PlannerHeader';
import { PlannerTask, Task } from '../../../models/task-models/Task';
import { MontlyPlanner as Planner } from '../../../models/planner-models/MontlyPlanner';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { getCurrentMonthBeginning } from '../../../utilities/date-utils/date-get';
import { isSameMonth, isSameYear } from '../../../utilities/date-utils/date-check';
import useDateTime, { ResetPeriod } from '../../../hooks/useDateTime';
import { adjustOverdueTask } from '../../../utilities/tasks-utils/task-util';
import PlannerCard from '../../ui/cards/PlannerCard';

interface Props {
    // Not constructed as planner tasks yet.
    montlyTasks: Task[];
    onMutate: () => void;
}

function populateMontlyPlanner(tasks: Task[], monthBeginning: Date): Planner {
    const planner = new Planner(monthBeginning);

    for (const task of tasks) {
        const taskDate = new Date(task.timeString);
        const sameYear = isSameYear(monthBeginning, taskDate);
        const sameMonth = isSameMonth(monthBeginning, taskDate);

        adjustOverdueTask(task);

        if (sameMonth && sameYear) {
            const plannerTask = new PlannerTask(task);
            plannerTask.plannerType = PlannerMode.MONTLY;
            planner.addTask(plannerTask);
        }
    }

    return planner;
}

const MontlyPlanner: FC<Props> = ({ montlyTasks: initialTasks, onMutate }) => {
    const [planner, setPlanner] = useState<Planner | null>(null);
    const dispatch = useDispatch();

    const monthBeginning = getCurrentMonthBeginning();
    const { currentTimeStamp, addMonths: addLocalMonths } = useDateTime(
        monthBeginning,
        ResetPeriod.MONTH,
    );

    console.log(`currentTimeStamp: ${currentTimeStamp}`);

    useEffect(() => {
        const newPlanner = populateMontlyPlanner(initialTasks, currentTimeStamp);
        setPlanner(newPlanner);
    }, [initialTasks, currentTimeStamp]);

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.MONTLY));
    }, []);

    const monthNaviagtionHandler = (direction: number) => {
        if (direction !== 1 && direction !== -1) throw new Error('Direction parameter is wrong!');
        // Hook fn call
        addLocalMonths(direction);
    };

    return (
        <PlannerCard>
            <IntroPanel
                title="Montly Planner"
                message="Make your month strong and facinating with regularly planned montly goals and schedules. Feel free to see the analytics of your week done by our statistical analysis."
                beginningPeriod={currentTimeStamp}
            />
            <div className="rounded-md border-2 border-slate-200 bg-white mt-8">
                <PlannerHeader beginningPeriod={currentTimeStamp} onMutate={onMutate} />
                {!planner && <p className="text-center text-3xl text-slate-800">Loading...</p>}
                {planner && (
                    <MontlyTable
                        monthBeginning={currentTimeStamp}
                        planner={planner}
                        onChangeMonth={monthNaviagtionHandler}
                        onMutate={onMutate}
                    />
                )}
            </div>
        </PlannerCard>
    );
};

export default MontlyPlanner;
