import React, { useState } from 'react';
import AddItemIcon from '../../ui/icons/AddItemIcon';
import RecurringEventAdd from '../crud-operations/RecurringEventAdd';
import RecurringEventSorter from './RecurringEventSorter';
import RecurringSearch from './RecurringSearch';

interface Props {
    onInvalidate(): void;
}

// sorting selects on the left, searchbar and add icon on the right
const ControlNav: React.FC<Props> = ({ onInvalidate }) => {
    const [showItemAdd, setShowItemAdd] = useState(false);

    // Trigger event add when this icon is clicked by the user.
    const toggleAdd = () => setShowItemAdd((ps) => !ps);

    return (
        <nav className={'flex items-center gap-3 xl:mr-10'}>
            <RecurringEventSorter />
            <RecurringSearch />
            <div>
                <AddItemIcon text={'Add Event'} onClick={toggleAdd} />
            </div>
            {showItemAdd && <RecurringEventAdd onClose={toggleAdd} onAdd={onInvalidate} />}
        </nav>
    );
};

export default ControlNav;
