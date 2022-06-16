import React, { useState } from 'react';

import { RecurringItemMode } from '../../../models/recurring-models';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import AddItemIcon from '../../ui/icons/AddItemIcon';
import RecurringEventAdd from '../crud-operations/RecurringEventAdd';
import RecurringTaskAdd from '../crud-operations/RecurringTaskAdd';
import RecurringEventSorter from './RecurringEventSorter';
import RecurringSearch from './RecurringSearch';
import { recurringActions } from '../../../store/redux/recurring-slice';
import CustomMUIButton from '../../ui/buttons/CustomMUIButton';
import DropDownToggler from '../../ui/icons/DropDownToggler';
import useWindowInnerWidth from '../../../hooks/useWindowInnerWidth';

interface Props {
    onInvalidate(): void;
}

// sorting selects & button on the left, searchbar and add icon on the right on the laptop screen.
// sorting selects & buttons on the bottom, searchbar and add icon on the top on the mobile & tablet screen (dropdown menu)
const ControlNav: React.FC<Props> = ({ onInvalidate }) => {
    const dispatch = useAppDispatch();
    const { mode, showDetail } = useAppSelector((state) => state.recurring);
    const isEvent = mode === RecurringItemMode.EVENT;

    const [showItemAdd, setShowItemAdd] = useState(false);
    // Layout changes to dropdown menu in the tablet & mobile size (under 768px)
    // Show dropdown menu items only when showDropdown is true.
    // When the layout goes to laptop screen, setShowDropdown has to go back to true so that they are always
    // shown in the laptop/desktop screen.
    const [showDropdown, setShowDropdown] = useState(true);

    useWindowInnerWidth({ breakPoint: 768, aboveBreakPointCallback: () => setShowDropdown(true) });

    // Trigger event add when this icon is clicked by the user.
    const addModalHandler = (show: boolean) => () => setShowItemAdd(show);

    // Trigger global state dispatch to show details of the item card by expanding the card.
    const itmeDetailhandler = () => dispatch(recurringActions.toggleShowDetail());

    // breakpoint for chaning layout is md size = 768px (row layout to col layout)
    return (
        <nav className={'flex flex-col md:flex-row md:items-center md:gap-4 xl:mr-10'}>
            <div
                className={`md:ml-auto pb-4 md:pb-0 w-full md:w-fit md:border-b-0 ${
                    showDropdown ? 'border-b-2 border-b-slate-300' : ''
                } flex items-center justify-between order-1 md:order-2`}
            >
                <RecurringSearch />
                <AddItemIcon
                    text={`Add ${mode}`}
                    onClick={addModalHandler(true)}
                    className="ml-auto"
                />
                <DropDownToggler
                    onToggle={() => setShowDropdown((ps) => !ps)}
                    showDropDown={showDropdown}
                    className={'md:hidden !ml-3 !text-3xl'}
                />
            </div>
            {showDropdown && (
                <div
                    className={`nav-list flex gap-3 order-2 py-4 px-2 bg-slate-100 md:bg-transparent md:order-1`}
                >
                    <RecurringEventSorter />
                    <CustomMUIButton onClick={itmeDetailhandler} className="max-w-[17.5rem]">
                        <span>{showDetail ? 'Hide Detail' : 'Show Detail'}</span>
                    </CustomMUIButton>
                </div>
            )}
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
