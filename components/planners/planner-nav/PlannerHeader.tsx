import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faList, faTablePivot } from '@fortawesome/pro-duotone-svg-icons';

import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { foldActions } from '../../../store/redux/fold-slice';
import { filterActions } from '../../../store/redux/filter-slice';
import PlannerTaskAdd from '../planner-crud/TaskAdd';
import Searchbar from '../../ui/searchbar/Searchbar';
import PlannerFilter from '../planner-support/PlannerFilter';
import Button from '../../ui/buttons/Button';
import { Theme, Size, ButtonTheme } from '../../../models/design-models';
import { ItemsView } from '../../../models/ui-models';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';
import classes from './PlannerHeader.module.scss';

interface Props {
    beginningPeriod: Date;
    onMutate: () => void;
    preventTaskAdd?: {
        message: string;
    };
}

const PlannerHeader: React.FC<Props> = (props) => {
    const { beginningPeriod, onMutate, preventTaskAdd } = props;
    const dispatch = useAppDispatch();
    const { isFolded, itemsView } = useAppSelector((state) => state.fold);
    const plannerMode = useAppSelector((state) => state.planner.plannerMode);

    const [isAdding, setIsAdding] = useState(false);

    const foldTasksHandler = () => {
        dispatch(foldActions.toggleFold());
    };

    const searchHandler = (text: string) => {
        dispatch(filterActions.updateSearchWord(text));
    };

    const taskAddOpener = () => {
        if (!preventTaskAdd) setIsAdding((prev) => !prev);
        else alert(preventTaskAdd.message);
    };

    const showFoldToggle = itemsView === ItemsView.LIST;
    const showItemsView =
        plannerMode === PlannerMode.TEMPLATE || plannerMode === PlannerMode.WEEKLY;

    return (
        <nav className={`${classes.header} flex items-center justify-between p-4 w-full`}>
            {/* Task Add Modal */}
            {isAdding && (
                <PlannerTaskAdd
                    onClose={() => setIsAdding(false)}
                    onAddTask={() => onMutate()}
                    beginningPeriod={beginningPeriod}
                />
            )}

            <PlannerFilter />

            <div className={classes.right}>
                <Searchbar
                    className={'!max-w-[14rem]'}
                    placeholder="Search Task"
                    onSearch={searchHandler}
                />
                {showFoldToggle && (
                    <Button
                        className={`flex items-center ${classes.btn} border-slate-100`}
                        theme={isFolded ? ButtonTheme.PRIMARY : ButtonTheme.PRIMARY_EMPTY}
                        size={Size.MEDIUM}
                        onClick={foldTasksHandler}
                    >
                        <FontAwesomeIcon
                            className="mr-2 max-w-[1.3rem]"
                            icon={faFolderOpen as any}
                        />{' '}
                        {isFolded ? 'Expand All' : 'Fold All'}
                    </Button>
                )}
                {showItemsView && (
                    <Button
                        className={`flex items-center ${classes.btn} border-slate-100`}
                        theme={ButtonTheme.PRIMARY_EMPTY}
                        size={Size.MEDIUM}
                        onClick={() => dispatch(foldActions.toggleView())}
                    >
                        {itemsView === ItemsView.TABLE && (
                            <>
                                <FontAwesomeIcon
                                    icon={faList}
                                    className="icon-medium mr-2 translate-y-[0.1rem]"
                                />
                                List View
                            </>
                        )}
                        {itemsView === ItemsView.LIST && (
                            <>
                                <FontAwesomeIcon
                                    icon={faTablePivot}
                                    className="icon-medium mr-2 translate-y-[0.1rem]"
                                />
                                Table View
                            </>
                        )}
                    </Button>
                )}
                <Button
                    className={`rounded-md ${classes.btn}`}
                    theme={Theme.PRIMARY}
                    size={Size.MEDIUM}
                    onClick={taskAddOpener}
                >
                    + Add Task
                </Button>
            </div>
        </nav>
    );
};

export default PlannerHeader;
