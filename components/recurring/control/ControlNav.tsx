import React from 'react';
import RecurringEventSorter from './RecurringEventSorter';
import RecurringSearch from './RecurringSearch';

// sorting selects on the left, searchbar and add icon on the right
const ControlNav = () => {
    return (
        <nav className={'flex'}>
            <RecurringEventSorter />
            <RecurringSearch />
        </nav>
    );
};

export default ControlNav;
