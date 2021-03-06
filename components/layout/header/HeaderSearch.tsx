import { useRouter } from 'next/router';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons';

import MainSearchbar, { SearchTarget } from '../../ui/searchbar/MainSearchbar';
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
                        className={`max-w-[1.5rem] text-2xl cursor-pointer ${styles['search-icon']}`}
                        onClick={() => onShowSearch((prev) => !prev)}
                    />
                )}
                <MainSearchbar
                    onSearch={searchHandler}
                    className={`${styles.search} ${!showSearch ? styles.hide : ''}`}
                />
            </div>
        </ClickAwayListener>
    );
};

export default HeaderSearch;
