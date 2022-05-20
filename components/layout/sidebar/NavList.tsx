import React from 'react';
import ActiveNavLink from '../../ui/design-elements/ActiveNavLink';

interface Props {
    listName: string | React.ReactNode;
    items: Array<{ name: string; link: string }>;
}

const NavList: React.FC<Props> = (props) => {
    const { listName, items } = props;

    return (
        <div className="last:border-b-gray-200 text-gray-100 pb-3 w-full">
            <h3 className="text-[1.4rem]">{listName}</h3>
            <ul className="list-none mt-1 text-lg">
                {items.map((item, idx) => (
                    <li className="py-1 pl-[2px] hover:text-sky-300" key={idx}>
                        <ActiveNavLink
                            href={item.link}
                            className={`pb-[3px] pl-2 border-l-[2.7px] border-transparent`}
                            activeClassName="font-bold brightness-105 border-l-[2.5px] text-blue-300 border-sky-300 border-blue-300"
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
