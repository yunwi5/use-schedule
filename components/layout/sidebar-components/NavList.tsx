import React from 'react';
import Link from 'next/link';
import ActiveNavLink from '../../ui/design-elements/ActiveNavLink';

interface Props {
	listName: string | React.ReactNode;
	items: Array<{ name: string; link: string }>;
}

const NavList: React.FC<Props> = (props) => {
	const { listName, items } = props;

	return (
		<div className='border-b-gray-200 border-b-2 text-gray-100 pb-3 mt-6 w-full first:mt-2'>
			<h3 className='text-[1.4rem]'>{listName}</h3>
			<ul className='list-none mt-2 text-lg'>
				{items.map((item, idx) => (
					<li className='py-1 pl-[2px]' key={idx}>
						<ActiveNavLink
							href={item.link}
							className={`pb-[3px] pl-2 border-l-[2.7px] border-transparent`}
							activeClassName='font-bold brightness-105 border-l-[2.5px] text-blue-300 border-sky-300 border-blue-300'
						>
							{item.name}
						</ActiveNavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavList;
