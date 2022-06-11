import React from 'react';
import ActiveNavLink from '../../ui/design-elements/ActiveNavLink';
import classes from './FullScreenNavigation.module.scss';

interface Props {
    listName: string | React.ReactNode;
    items: Array<{ name: string; link: string }>;
    onNavigate(): void;
}

const FullNavList: React.FC<Props> = ({ listName, items, onNavigate }) => {
    return (
        <li className={classes.sublist}>
            <h3 className={classes.label}>{listName}</h3>
            <div className="flex flex-col gap-2">
                {items.map((item, idx) => (
                    <ActiveNavLink
                        key={idx}
                        href={item.link}
                        onNavigate={onNavigate}
                        className={classes.link}
                    >
                        {item.name}
                    </ActiveNavLink>
                ))}
            </div>
        </li>
    );
};

export default FullNavList;
