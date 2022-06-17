import React from 'react';
import { useRouter } from 'next/router';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons';

import MainSearch, { SearchTarget } from '../../ui/searchbar/MainSearch';
import styles from './Header.module.scss';
import { getSearchLink } from '../../../utilities/link-utils';

interface Props {
    onShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    showSearch: boolean;
}

const HeaderSearch: React.FC<Props> = ({ onShowSearch, showSearch }) => {
    const router = useRouter();

    const searchHandler = (target: SearchTarget, word: string) => {
        const searchLink = getSearchLink(target, word);
        router.push(searchLink);
    };

    return (
        <ClickAwayListener onClickAway={onShowSearch.bind(null, false)}>
            <div className={`${styles['heading-inner']}`}>
                {!showSearch && (
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className={`max-w-[1.5rem] text-2xl cursor-pointer ${
                            !showSearch ? styles['search-icon'] : styles.hide
                        }`}
                        onClick={() => onShowSearch((prev) => !prev)}
                    />
                )}
                <MainSearch
                    onSearch={searchHandler}
                    className={`${!showSearch ? styles.hide : ''}`}
                />
            </div>
        </ClickAwayListener>
    );
};

export default HeaderSearch;
