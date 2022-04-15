import React, { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

//
import {
    TaskSort as SortingStandard,
    TaskSortList,
    SortingDirection,
} from "../../models/sorting-models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/pro-duotone-svg-icons";

import classes from "./TaskSearch.module.scss";
import DirectionSelect from "../ui/sorting/DirectionSelect";
import SortingStandardSelect from "../ui/sorting/SortingStandardSelect";

interface Props {
    onSort: (target: SortingStandard, direction: SortingDirection) => void;
    onRandomize: () => void;
}

const TaskSort: React.FC<Props> = ({ onSort, onRandomize }) => {
    const [sortTarget, setSortTarget] = useState<null | SortingStandard>(null);
    const [direction, setDirection] = useState<null | SortingDirection>(null);

    const sortTargetHandler = (e: SelectChangeEvent) => {
        const newStandard = e.target.value ? (e.target.value as SortingStandard) : null;
        setSortTarget(newStandard);
    };

    const sortDirectionHandler = (e: SelectChangeEvent) => {
        const newDirection = e.target.value ? (e.target.value as SortingDirection) : null;
        setDirection(newDirection);
    };

    const randomizeHandler = () => {
        setSortTarget(null);
        setDirection(null);
        onRandomize();
    };

    useEffect(() => {
        if (sortTarget && direction) {
            console.log(`Start sorting. Target: ${sortTarget}, Direction: ${direction}`);
            onSort(sortTarget, direction);
        }
    }, [sortTarget, direction, onSort]);

    return (
        <div className='flex items-center gap-3'>
            <SortingStandardSelect
                onChange={sortTargetHandler}
                sortTarget={sortTarget}
                sortList={TaskSortList}
            />
            <DirectionSelect onChange={sortDirectionHandler} direction={direction} />
            <div onClick={randomizeHandler}>
                <FontAwesomeIcon icon={faShuffle} className={classes.icon} />
            </div>
        </div>
    );
};

export default TaskSort;
