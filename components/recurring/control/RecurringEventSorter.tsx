import { SelectChangeEvent } from '@mui/material/Select';

import {
    EventSort,
    EventSortList,
    SortingDirection,
    TaskSortList,
} from '../../../models/sorting-models';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { recurringActions } from '../../../store/redux/recurring-slice';
import DirectionSelect from '../../ui/sorting/DirectionSelect';
import SortingStandardSelect from '../../ui/sorting/SortingStandardSelect';
import { RecurringItemMode } from '../../../models/recurring-models';

const useRecSortingStandardAndList = () => {
    const { mode, eventSortingStandard, taskSortingStandard } = useAppSelector(
        (state) => state.recurring,
    );

    if (mode === RecurringItemMode.EVENT) {
        return {
            sortingStandard: eventSortingStandard,
            sortingList: EventSortList,
        };
    }
    return {
        sortingStandard: taskSortingStandard,
        sortingList: TaskSortList,
    };
};

const RecurringEventSorter: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sortingDirection } = useAppSelector((state) => state.recurring);
    const { sortingStandard, sortingList } = useRecSortingStandardAndList();

    const sortTargetHandler = (e: SelectChangeEvent<string>) => {
        const newTarget = e.target.value as EventSort;
        dispatch(recurringActions.setSortingStandard(newTarget));
    };

    const directionHandler = (e: SelectChangeEvent) => {
        const newDir = e.target.value as SortingDirection;
        dispatch(recurringActions.setSortingDirection(newDir));
    };

    return (
        <div className={`flex gap-3 items-center`}>
            <SortingStandardSelect
                sortList={sortingList}
                sortTarget={sortingStandard} // static at the moment
                onChange={sortTargetHandler}
            />
            <DirectionSelect direction={sortingDirection} onChange={directionHandler} />
        </div>
    );
};

export default RecurringEventSorter;
