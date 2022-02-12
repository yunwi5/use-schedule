import React from "react";
import Link from "next/link";

interface Props {
	listName: string | React.ReactNode;
	items: Array<{ name: string; link: string }>;
}

const NavList: React.FC<Props> = (props) => {
	const { listName, items } = props;

	return (
		<div className="border-b-gray-200 border-b-2 text-gray-100 pb-3 mt-6 w-full first:mt-2">
			<h3 className="text-[1.4rem]">{listName}</h3>
			<ul className="list-none ml-2 mt-2 text-lg">
				{items.map((item, idx) => (
					<li className="py-1" key={idx}>
						<Link href={item.link}>{item.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavList;
