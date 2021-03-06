import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { plannerActions } from '../../../store/redux/planner-slice';
import { isSameWeek } from '../../../utilities/date-utils/date-check';
import { PlannerTask, Task } from '../../../models/task-models/Task';
import { WeeklyPlanner as Planner } from '../../../models/planner-models/WeeklyPlanner';
import { getCurrentWeekBeginning } from '../../../utilities/date-utils/date-get';
import useDateTime, { ResetPeriod } from '../../../hooks/useDateTime';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import { adjustOverdueTask } from '../../../utilities/tasks-utils/task-util';
import IntroPanel from '../planner-nav/IntroPanel';
import PlannerHeader from '../planner-nav/PlannerHeader';
import WeeklyTable from './WeeklyTable';
import PlannerCard from '../../ui/cards/PlannerCard';
import PlannerTableCard from '../../ui/cards/PlannerTableCard';
import { foldActions } from '../../../store/redux/fold-slice';
import { ItemsView } from '../../../models/ui-models';
import BackgroundImage from '../../ui/design-elements/BackgroundImage';

interface Props {
    weeklyTasks: Task[];
    onMutate: () => void;
}

function populateWeeklyPlanner(tasks: Task[], weekBeginning: Date): Planner {
    const planner = new Planner(weekBeginning);
    for (const task of tasks) {
        let taskDate = new Date(task.timeString);
        const sameWeek = isSameWeek(weekBeginning, taskDate);
        adjustOverdueTask(task);

        if (sameWeek) {
            const plannerTask = new PlannerTask(task);
            plannerTask.plannerType = PlannerMode.WEEKLY;
            planner.addTask(plannerTask);
        }
    }
    return planner;
}

const WeeklyPlanner: React.FC<Props> = ({ weeklyTasks: initialTasks, onMutate }) => {
    const [planner, setPlanner] = useState<Planner | null>(null);

    const dispatch = useDispatch();

    const weekBeginning = getCurrentWeekBeginning();
    dispatch(plannerActions.setBeginningPeriod(weekBeginning.toString()));
    const {
        currentTimeStamp,
        addWeeks: addLocalWeeks,
        setCurrentTimeStamp,
    } = useDateTime(weekBeginning, ResetPeriod.WEEK);

    useEffect(() => {
        const newPlanner = populateWeeklyPlanner(initialTasks, currentTimeStamp);
        setPlanner(newPlanner);
    }, [initialTasks, currentTimeStamp]);

    // Only runs on mount.
    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(PlannerMode.WEEKLY));
        dispatch(foldActions.setView(ItemsView.TABLE));
    }, [dispatch]);

    // If the week beginning changes, the planner also has to change to load new tasks according to
    const weekNavigateHandler = (direction: number) => {
        if (direction !== 1 && direction !== -1)
            throw new Error('Direction parameter is wrong!');
        addLocalWeeks(direction);
    };

    const navigateCurrentHandler = useCallback(() => {
        // navigate back to current period (this week)
        setCurrentTimeStamp(weekBeginning);
    }, [setCurrentTimeStamp, weekBeginning]);

    return (
        <div>
            <BackgroundImage
                src="/bg-images/bg-weekly-planner.jpg"
                alt="weekly planner background image"
            />
            <PlannerCard>
                <IntroPanel
                    title={'Weekly Planner'}
                    message={
                        'Make your week compact with timeply planned weekly tasks added on your scheduler. Feel free to use templates to add repetitive tasks to each week, and see the analytics of your week done by our statistical analysis.'
                    }
                    beginningPeriod={currentTimeStamp}
                    onMutate={onMutate}
                />
                <PlannerTableCard>
                    <PlannerHeader beginningPeriod={currentTimeStamp} onMutate={onMutate} />
                    {!planner && (
                        <p className="text-center text-3xl text-slate-800">Loading...</p>
                    )}
                    {planner && (
                        <WeeklyTable
                            weekBeginning={currentTimeStamp}
                            planner={planner}
                            onChangeWeek={weekNavigateHandler}
                            onNavigateCurrentPeriod={navigateCurrentHandler}
                            onMutate={onMutate}
                        />
                    )}
                </PlannerTableCard>
            </PlannerCard>
        </div>
    );
};

export default WeeklyPlanner;
