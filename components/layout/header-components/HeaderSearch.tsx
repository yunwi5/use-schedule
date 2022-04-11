import React from 'react';
import { useRouter } from 'next/router';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons';

import MainSearch from '../../ui/searchbar/MainSearch';
import styles from './Header.module.scss';

interface Props {
	onShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
	showSearch: boolean;
}

const HeaderSearch: React.FC<Props> = ({ onShowSearch, showSearch }) => {
	const router = useRouter();

	const searchHandler = (word: string) => {
		router.push(`/task-planner/search?q=${word}`);
	};

	return (
		<ClickAwayListener onClickAway={onShowSearch.bind(null, false)}>
			<div className={`${styles['heading-inner']}`}>
				{!showSearch && (
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className={`max-w-[1.5rem] text-2xl cursor-pointer ${!showSearch
							? styles['search-icon']
							: styles['hide-search-icon']}`}
						onClick={() => onShowSearch((prev) => !prev)}
					/>
				)}
				<MainSearch
					onSearch={searchHandler}
					className={`${!showSearch ? styles['hide-search'] : ''}`}
				/>
			</div>
		</ClickAwayListener>
	);
};

export default HeaderSearch;
