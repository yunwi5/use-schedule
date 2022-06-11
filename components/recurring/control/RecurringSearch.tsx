import React from 'react';
import Searchbar from '../../ui/searchbar/Searchbar';

// Search functionality needs to be implemented using redux
const RecurringSearch: React.FC = (props) => {
    const searchHandler = (word: string) => {
        console.log('search word:', word);
    };

    return (
        <div className={'ml-auto mr-3'}>
            <Searchbar
                className={'min-h-[3rem]'}
                placeholder={'Search for recurring event'}
                onSearch={searchHandler}
            />
        </div>
    );
};

export default RecurringSearch;
