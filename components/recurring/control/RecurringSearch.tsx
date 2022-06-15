import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { recurringActions } from '../../../store/redux/recurring-slice';
import Searchbar from '../../ui/searchbar/Searchbar';

const RecurringSearch: React.FC = () => {
    const dispatch = useAppDispatch();
    const itemType = useAppSelector((state) => state.recurring.mode).toLowerCase();

    const searchHandler = (word: string) => dispatch(recurringActions.setSearchWord(word));

    return (
        <div className={'mr-3 lg:mr-6 flex-1 max-w-[26rem]'}>
            <Searchbar
                className={'min-h-[3rem]'}
                placeholder={`Search for recurring ${itemType}s`}
                onSearch={searchHandler}
            />
        </div>
    );
};

export default RecurringSearch;
