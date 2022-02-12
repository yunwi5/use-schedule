import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-duotone-svg-icons";

interface Props {
	onToggleSidebar: () => void;
}

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
	const { user, isLoading } = useUser();

	const isLoggedIn = user && !isLoading;

	return (
		<header className="flex items-center py-4 pl-4 pr-4 justify-between text-slate-700 bg-slate-200">
			<FontAwesomeIcon
				icon={faBars}
				className="max-w-[1.5rem] text-2xl cursor-pointer"
				onClick={onToggleSidebar}
			/>
			<h2 className="text-2xl mr-auto ml-4">Task Manager</h2>
			<div className="space-x-5 text-lg font-semibold text-slate-500">
				<Link href="/api/auth/login">
					<a>About</a>
				</Link>
				<Link href="/api/auth/login">
					<a>Contact</a>
				</Link>
				{!isLoggedIn && (
					<Link href="/api/auth/login">
						<a>Login</a>
					</Link>
				)}

				{!isLoggedIn && (
					<Link href="/api/auth/login">
						<a>Sign Up</a>
					</Link>
				)}
				{isLoggedIn && (
					<Link href="/api/auth/logout">
						<a>Logout</a>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
