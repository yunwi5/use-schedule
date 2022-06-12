import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import { EventSort, EventSortList, SortingDirection } from '../../../models/sorting-models';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { recurringActions } from '../../../store/redux/recurring-slice';
import DirectionSelect from '../../ui/sorting/DirectionSelect';
import SortingStandardSelect from '../../ui/sorting/SortingStandardSelect';

const RecurringEventSorter: React.FC = () => {
    const dispatch = useAppDispatch();
    const { eventSortingStandard, sortingDirection } = useAppSelector((state) => state.recurring);

    const sortTargetHandler = (e: SelectChangeEvent<string>) => {
        const newTarget = e.target.value as EventSort;
        dispatch(recurringActions.setEventSortingStandard(newTarget));
    };

    const directionHandler = (e: SelectChangeEvent) => {
        const newDir = e.target.value as SortingDirection;
        dispatch(recurringActions.setSortingDirection(newDir));
    };

    return (
        <div className="flex gap-3 items-center">
            <SortingStandardSelect
                sortList={EventSortList}
                sortTarget={eventSortingStandard} // static at the moment
                onChange={sortTargetHandler}
            />
            <DirectionSelect direction={sortingDirection} onChange={directionHandler} />
        </div>
    );
};

export default RecurringEventSorter;
