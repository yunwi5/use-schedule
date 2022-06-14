import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { recurringActions } from '../../../store/redux/recurring-slice';
import Searchbar from '../../ui/searchbar/Searchbar';

const RecurringSearch: React.FC = () => {
    const dispatch = useAppDispatch();
    const itemType = useAppSelector((state) => state.recurring.mode).toLowerCase();

    const searchHandler = (word: string) => dispatch(recurringActions.setSearchWord(word));

    return (
        <div className={'ml-auto mr-3'}>
            <Searchbar
                className={'min-h-[3rem]'}
                placeholder={`Search for recurring ${itemType}s`}
                onSearch={searchHandler}
            />
        </div>
    );
};

export default RecurringSearch;
