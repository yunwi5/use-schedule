import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons';

import classes from './MainSearchbar.module.scss';

export type SearchTarget = 'Event' | 'Task';

interface Props {
    onSearch: (target: SearchTarget, word: string) => void;
    className?: string;
}

const MainSearch: React.FC<Props> = (props) => {
    const { onSearch, className } = props;
    const [text, setText] = useState('');
    const [searchTarget, setSearchTarget] = useState<SearchTarget>('Event');

    const searchTargetHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTarget = e.target.value as SearchTarget;
        setSearchTarget(newTarget);
    };

    const searchHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search:', searchTarget, text);
        onSearch(searchTarget, text);
    };

    return (
        <form className={`${classes.search} ${className}`} onSubmit={searchHandler}>
            <div className={classes['input-wrapper']}>
                <select className={classes.select} onChange={searchTargetHandler}>
                    <option>Event</option>
                    <option>Task</option>
                </select>
                <input
                    className={classes.input}
                    type="search"
                    placeholder={`Search your ${
                        searchTarget === 'Event' ? 'events' : 'tasks'
                    }`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setText(e.target.value)
                    }
                />
            </div>
            <button className={classes.button} type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.icon} />
            </button>
        </form>
    );
};

export default MainSearch;
