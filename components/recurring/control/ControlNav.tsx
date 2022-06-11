import React, { useState } from 'react';
import AddItemIcon from '../../ui/icons/AddItemIcon';
import RecurringEventAdd from '../crud-operations/RecurringEventAdd';
import RecurringEventSorter from './RecurringEventSorter';
import RecurringSearch from './RecurringSearch';

// sorting selects on the left, searchbar and add icon on the right
const ControlNav = () => {
    const [showItemAdd, setShowItemAdd] = useState(false);

    // Trigger event add when this icon is clicked by the user.
    const addHandler = () => {
        setShowItemAdd(true);
    };

    return (
        <nav className={'flex items-center gap-3 xl:mr-10'}>
            <RecurringEventSorter />
            <RecurringSearch />
            <div className={''}>
                <AddItemIcon text={'Add Event'} onClick={addHandler} />
            </div>
            {showItemAdd && (
                <RecurringEventAdd onClose={() => setShowItemAdd(false)} onAdd={() => {}} />
            )}
        </nav>
    );
};

export default ControlNav;
