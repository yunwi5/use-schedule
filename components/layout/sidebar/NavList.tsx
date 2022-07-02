import React, { useState } from 'react';
import ActiveNavLink from '../../ui/design-elements/ActiveNavLink';
import DropDownToggler from '../../ui/icons/DropDownToggler';

interface Props {
    listName: string | React.ReactNode;
    items: Array<{ name: string; link: string }>;
}

const NavList: React.FC<Props> = (props) => {
    const { listName, items } = props;
    const [showDropDown, setShowDropDown] = useState(true);

    return (
        <div className="last:border-b-gray-200 text-slate-700/90 pb-3 w-full">
            <h3 className="flex items-center justify-between gap-2 text-[1.1rem] font-bold text-slate-600/70">
                {listName}
                <DropDownToggler
                    onToggle={() => setShowDropDown((ps) => !ps)}
                    showDropDown={showDropDown}
                    className={`scale-75`}
                />
            </h3>
            {showDropDown && (
                <ul className={`transition-all list-none mt-2 text-lg`}>
                    {items.map((item, idx) => (
                        <li className="mt-1 py-1 pl-[2px] hover:text-sky-600" key={idx}>
                            <ActiveNavLink
                                href={item.link}
                                className={`pb-[3px] pl-2 border-l-[2.5px] border-transparent`}
                                activeClassName="font-bold brightness-105 text-blue-500 !border-blue-400"
                            >
                                {item.name}
                            </ActiveNavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NavList;
