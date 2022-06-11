import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useAppLinks from '../../../hooks/useAppLinks';
import ActiveNavLink from '../../ui/design-elements/ActiveNavLink';
import layoutClasses from '../Layout.module.scss';
import FullNavList from './FullNavList';
import classes from './FullScreenNavigation.module.scss';

interface Props {
    onToggleSidebar(): void;
    showSidebar: boolean;
}

const FullScreenNavigation: React.FC<Props> = ({ onToggleSidebar, showSidebar }) => {
    const {
        calendarLink,
        dashboardLink,
        recurringScheduleLinks,
        dataAnalysisLinks,
        plannerLinks,
        templateLinks,
        todoLinks,
    } = useAppLinks();

    return (
        <div
            className={`${layoutClasses['full-screen-navigation']} ${classes.navigation} ${
                showSidebar ? classes['navigation-visible'] : ''
            }`}
        >
            <div className={classes.exit} onClick={onToggleSidebar}>
                <FontAwesomeIcon icon={faXmark} className={`icon-large ${classes.icon}`} />
            </div>
            <div className={classes.background}>&nbsp;</div>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    <li className={classes.item}>
                        <ActiveNavLink
                            onNavigate={onToggleSidebar}
                            href={calendarLink.link}
                            className={classes.link}
                        >
                            {calendarLink.name}
                        </ActiveNavLink>
                    </li>
                    <li className={classes.item}>
                        <ActiveNavLink
                            onNavigate={onToggleSidebar}
                            href={dashboardLink.link}
                            className={classes.link}
                        >
                            {dashboardLink.name}
                        </ActiveNavLink>
                    </li>
                    <FullNavList
                        onNavigate={onToggleSidebar}
                        listName={'Recurring Schedules'}
                        items={recurringScheduleLinks}
                    />
                    <FullNavList
                        onNavigate={onToggleSidebar}
                        listName={'Task Planners'}
                        items={plannerLinks}
                    />
                    <FullNavList
                        onNavigate={onToggleSidebar}
                        listName={'Time Tables'}
                        items={templateLinks}
                    />
                    <FullNavList
                        onNavigate={onToggleSidebar}
                        listName={'Time Tables'}
                        items={templateLinks}
                    />
                    <FullNavList
                        onNavigate={onToggleSidebar}
                        listName={'Data Analysis'}
                        items={dataAnalysisLinks}
                    />
                    <FullNavList
                        onNavigate={onToggleSidebar}
                        listName={'Todo Lists'}
                        items={todoLinks}
                    />
                </ul>
            </nav>
        </div>
    );
};

export default FullScreenNavigation;
