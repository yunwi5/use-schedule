import React from 'react';
import { useAppDispatch } from '../../../store/redux';
import { recurringActions } from '../../../store/redux/recurring-slice';
import Searchbar from '../../ui/searchbar/Searchbar';

// Search functionality needs to be implemented using redux
const RecurringSearch: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const searchHandler = (word: string) => {
        dispatch(recurringActions.setSearchWord(word));
    };

    return (
        <div className={'ml-auto mr-3'}>
            <Searchbar
                className={'min-h-[3rem]'}
                placeholder={'Search for recurring events'}
                onSearch={searchHandler}
            />
        </div>
    );
};

export default RecurringSearch;
