import React, { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import { SortingDirection } from '../../models/sorting-models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/pro-duotone-svg-icons';

import DirectionSelect from '../ui/sorting/DirectionSelect';
import SortingStandardSelect from '../ui/sorting/SortingStandardSelect';
import classes from './SearchMain.module.scss';

interface Props {
    onSort: (target: string, direction: SortingDirection) => void;
    sortList: string[];
    onRandomize: () => void;
}

const ItemSorter: React.FC<Props> = ({ onSort, onRandomize, sortList }) => {
    const [sortTarget, setSortTarget] = useState<null | string>(null);
    const [direction, setDirection] = useState<null | SortingDirection>(null);

    const sortTargetHandler = (e: SelectChangeEvent) => {
        const newStandard = e.target.value ? e.target.value : null;
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
            onSort(sortTarget, direction);
        }
    }, [sortTarget, direction, onSort]);

    return (
        <div className="flex items-center gap-3">
            <SortingStandardSelect
                onChange={sortTargetHandler}
                sortTarget={sortTarget}
                sortList={sortList}
            />
            <DirectionSelect onChange={sortDirectionHandler} direction={direction} />
            <div onClick={randomizeHandler}>
                <FontAwesomeIcon icon={faShuffle} className={classes.icon} />
            </div>
        </div>
    );
};

export default ItemSorter;
