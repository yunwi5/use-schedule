import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
	href: string;
	className: string;
	activeClassName?: string;
}

const ActiveNavLink: React.FC<Props> = (props) => {
	const { href, className, activeClassName, children } = props;
	const router = useRouter();

	return (
		<Link href={href}>
			<a className={`${className} ${router.asPath === href ? activeClassName : ''}`}>
				{children}
			</a>
		</Link>
	);
};

export default ActiveNavLink;
