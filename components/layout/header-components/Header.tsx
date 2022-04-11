import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-duotone-svg-icons';

import HeaderSearch from './HeaderSearch';
import classes from '../Layout.module.scss';
import styles from './Header.module.scss';

interface Props {
	onToggleSidebar: () => void;
}

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
	const [ showSearch, setShowSearch ] = useState(true); // Show or hide full searchbar on the mobile screen
	const { user, isLoading } = useUser();

	const isLoggedIn = user && !isLoading;

	return (
		<header className={`text-slate-700 bg-slate-200 ${classes.header} ${styles.header}`}>
			{/* Left Side */}
			<div className={`${styles.heading}`}>
				<FontAwesomeIcon
					icon={faBars}
					className='max-w-[1.5rem] text-2xl cursor-pointer'
					onClick={onToggleSidebar}
				/>
				<Link href='/'>
					<a className={`text-2xl ml-4 ${showSearch ? styles.hide : ''}`}>Task Manager</a>
				</Link>
				<HeaderSearch onShowSearch={setShowSearch} showSearch={showSearch} />
			</div>

			{/* Right side */}
			<div className={`space-x-5 text-lg font-semibold text-slate-500 ${styles.nav}`}>
				<Link href='/api/auth/login'>
					<a>About</a>
				</Link>
				<Link href='/api/auth/login'>
					<a>Contact</a>
				</Link>
				{!isLoggedIn && (
					<Link href='/api/auth/login'>
						<a>Login</a>
					</Link>
				)}

				{!isLoggedIn && (
					<Link href='/api/auth/login'>
						<a>Sign Up</a>
					</Link>
				)}
				{isLoggedIn && (
					<Link href='/api/auth/logout'>
						<a>Logout</a>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
