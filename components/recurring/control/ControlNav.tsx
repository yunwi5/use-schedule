import React, { useState } from 'react';
import { RecurringItemMode } from '../../../models/recurring-models';
import { useAppSelector } from '../../../store/redux';
import AddItemIcon from '../../ui/icons/AddItemIcon';
import RecurringEventAdd from '../crud-operations/RecurringEventAdd';
import RecurringTaskAdd from '../crud-operations/RecurringTaskAdd';
import RecurringEventSorter from './RecurringEventSorter';
import RecurringSearch from './RecurringSearch';

interface Props {
    onInvalidate(): void;
}

// sorting selects on the left, searchbar and add icon on the right
const ControlNav: React.FC<Props> = ({ onInvalidate }) => {
    const [showItemAdd, setShowItemAdd] = useState(false);
    const itemMode = useAppSelector((state) => state.recurring.mode);
    const isEvent = itemMode === RecurringItemMode.EVENT;

    // Trigger event add when this icon is clicked by the user.
    const addModalHandler = (show: boolean) => () => setShowItemAdd(show);

    return (
        <nav className={'flex items-center gap-3 xl:mr-10'}>
            <RecurringEventSorter />
            <RecurringSearch />
            <div>
                <AddItemIcon text={`Add ${itemMode}`} onClick={addModalHandler(true)} />
            </div>
            {showItemAdd && isEvent && (
                <RecurringEventAdd onClose={addModalHandler(false)} onAdd={onInvalidate} />
            )}
            {showItemAdd && !isEvent && (
                <RecurringTaskAdd onClose={addModalHandler(false)} onAdd={onInvalidate} />
            )}
        </nav>
    );
};

export default ControlNav;
