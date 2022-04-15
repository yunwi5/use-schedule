import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
    TodoSort as SortingStandard,
    TodoSortList,
    SortingDirection,
} from "../../../models/sorting-models";
import DirectionSelect from "../../ui/sorting/DirectionSelect";
import SortingStandardSelect from "../../ui/sorting/SortingStandardSelect";

interface Props {
    onSort: (target: SortingStandard, direction: SortingDirection) => void;
}

const TodoSorter: React.FC<Props> = ({ onSort }) => {
    const [sortTarget, setSortTarget] = useState<SortingStandard | null>(null);
    const [direction, setDirection] = useState<SortingDirection | null>(null);

    const sortTargetHandler = (e: SelectChangeEvent<string>) => {
        const newTarget = e.target.value as SortingStandard;
        setSortTarget(newTarget);
        if (direction) onSort(newTarget, direction);
    };

    const directionHandler = (e: SelectChangeEvent<string>) => {
        const newDir = e.target.value as SortingDirection;
        setDirection(newDir);
        if (sortTarget) onSort(sortTarget, newDir);
    };

    return (
        <div className='flex items-center gap-3'>
            <SortingStandardSelect
                onChange={sortTargetHandler}
                sortTarget={sortTarget}
                sortList={TodoSortList}
            />
            <DirectionSelect onChange={directionHandler} direction={direction} />
        </div>
    );
};

export default TodoSorter;
