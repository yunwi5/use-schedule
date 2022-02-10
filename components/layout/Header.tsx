import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
	return (
		<header>
			<h2>Task Manager</h2>
			<div>
				<Link href="/api/auth/login">
					<a>Login</a>
				</Link>
				<Link href="/api/auth/logout">
					<a>Logout</a>
				</Link>
			</div>
		</header>
	);
};

export default Header;
