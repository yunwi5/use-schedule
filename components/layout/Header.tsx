import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-duotone-svg-icons';
import MainSearch from '../ui/searchbar/MainSearch';

import classes from './Layout.module.scss';

interface Props {
	onToggleSidebar: () => void;
}

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
	const { user, isLoading } = useUser();
	const router = useRouter();

	const isLoggedIn = user && !isLoading;

	const searchHandler = (word: string) => {
		router.push(`/task-planner/search?q=${word}`);
	};

	return (
		<header
			className={`flex z-10 items-center py-3 pl-4 pr-4 justify-between text-slate-700 bg-slate-200 ${classes.header}`}
		>
			<FontAwesomeIcon
				icon={faBars}
				className='max-w-[1.5rem] text-2xl cursor-pointer'
				onClick={onToggleSidebar}
			/>
			<div className='flex items-center mr-auto gap-[2.5rem]'>
				<h2 className='text-2xl ml-4'>Task Manager</h2>
				<MainSearch onSearch={searchHandler} />
			</div>
			<div className='space-x-5 text-lg font-semibold text-slate-500'>
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
