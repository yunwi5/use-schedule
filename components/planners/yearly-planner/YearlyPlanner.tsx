import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import IntroPanel from '../planner-nav/IntroPanel';
import YearlyTable from './YearlyTable';
import PlannerHeader from '../planner-nav/PlannerHeader';
import { plannerActions } from '../../../store/redux/planner-slice';
import { PlannerTask, Task } from '../../../models/task-models/Task';
import { YearlyPlanner as Planner } from '../../../models/planner-models/YearlyPlanner';
import useDateTime, { ResetPeriod } from '../../../hooks/useDateTime';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { getCurrentYearBeginning } from '../../../utilities/date-utils/date-get';
import { isSameYear } from '../../../utilities/date-utils/date-check';
import { adjustOverdueTask } from '../../../utilities/tasks-utils/task-util';
import PlannerCard from '../../ui/cards/PlannerCard';
import BackgroundImage from '../../ui/design-elements/BackgroundImage';
import PlannerTableCard from '../../ui/cards/PlannerTableCard';
import { foldActions } from '../../../store/redux/fold-slice';
import { ItemsView } from '../../../models/ui-models';

interface Props {
    yearlyTasks: Task[];
    onMutate: () => void;
}

// This needs to be implemented.
function populateYearlyPlanner(tasks: Task[], yearBeginning: Date): Planner {
    const planner = new Planner(yearBeginning);

    for (const task of tasks) {
        let taskDate = new Date(task.timeString);
        const sameYear = isSameYear(yearBeginning, taskDate);

        adjustOverdueTask(task);

        if (sameYear) {
            const plannerTask = new PlannerTask(task);
            plannerTask.plannerType = PlannerMode.YEARLY;
            planner.addTask(plannerTask);
        }
    }
    return planner;
}

const YearlyPlanner: FC<Props> = ({ yearlyTasks: initialTasks, onMutate }) => {
    const [planner, setPlanner] = useState<Planner | null>(null);

    const dispatch = useDispatch();

    const yearBeginning = getCurrentYearBeginning();
    console.log(`year beginning: ${yearBeginning}`);

    const {
        currentTimeStamp,
        setCurrentTimeStamp,
        addYears: addLocalYears,
    } = useDateTime(yearBeginning, ResetPeriod.YEAR);

    useEffect(() => {
        const newPlanner = populateYearlyPlanner(initialTasks, currentTimeStamp);
        setPlanner(newPlanner);
    }, [initialTasks, currentTimeStamp]);

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.YEARLY));
        dispatch(foldActions.setView(ItemsView.LIST));
    }, [dispatch]);

    const yearNavigateHandler = (direction: number) => {
        if (direction !== 1 && direction !== -1)
            throw new Error('Direction parameter is wrong!');
        // Hook call
        addLocalYears(direction);
    };

    const currentNavigateHandler = () => {
        setCurrentTimeStamp(yearBeginning);
    };

    return (
        <div>
            <BackgroundImage src="/bg-images/bg-posit.jpg" />
            <PlannerCard>
                <IntroPanel
                    title="Yearly Planner"
                    message="Make your year strong and compact with timeply planned yearly goals added on your scheduler. Feel free to see the analytics of your week done by our statistical analysis."
                    beginningPeriod={currentTimeStamp}
                    onMutate={onMutate}
                />
                <PlannerTableCard>
                    <PlannerHeader beginningPeriod={currentTimeStamp} onMutate={onMutate} />
                    {!planner && (
                        <p className="text-center text-3xl text-slate-800">Loading...</p>
                    )}
                    {planner && (
                        <YearlyTable
                            yearBeginning={currentTimeStamp}
                            planner={planner}
                            onChangeYear={yearNavigateHandler}
                            onNavigateCurrentPeriod={currentNavigateHandler}
                            onMutate={onMutate}
                        />
                    )}
                </PlannerTableCard>
            </PlannerCard>
        </div>
    );
};

export default YearlyPlanner;
