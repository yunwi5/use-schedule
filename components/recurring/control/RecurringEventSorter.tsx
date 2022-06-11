import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { EventSort, EventSortList, SortingDirection } from '../../../models/sorting-models';
import DirectionSelect from '../../ui/sorting/DirectionSelect';
import SortingStandardSelect from '../../ui/sorting/SortingStandardSelect';

const RecurringEventSorter: React.FC = () => {
    const sortTargetHandler = (e: SelectChangeEvent<string>) => {
        const newTarget = e.target.value;
        console.log('new sorting target:', newTarget);
    };

    const directionHandler = (e: SelectChangeEvent) => {
        const newDir = e.target.value as SortingDirection;
        console.log('new direction:', newDir);
    };

    return (
        <div className="flex gap-3 items-center">
            <SortingStandardSelect
                sortList={EventSortList}
                sortTarget={EventSort.NAME} // static at the moment
                onChange={sortTargetHandler}
            />
            <DirectionSelect direction={SortingDirection.Ascending} onChange={directionHandler} />
        </div>
    );
};

export default RecurringEventSorter;
