import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons';

import classes from './MainSearch.module.scss';

interface Props {
    onSearch: (word: string) => void;
    className?: string;
}

const MainSearch: React.FC<Props> = (props) => {
    const { onSearch, className } = props;
    const [text, setText] = useState('');

    const searchHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(text);
    };

    return (
        <form className={`${classes.search} ${className}`} onSubmit={searchHandler}>
            <input
                className={classes.input}
                type="search"
                placeholder="Search your event"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
            <button className={classes.button}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.icon} />
            </button>
        </form>
    );
};

export default MainSearch;
