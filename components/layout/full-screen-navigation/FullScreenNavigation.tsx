import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useAppLinks from '../../../hooks/useAppLinks';
import ActiveNavLink from '../../ui/design-elements/ActiveNavLink';
import layoutClasses from '../Layout.module.scss';
import classes from './FullScreenNavigation.module.scss';

interface Props {
    onToggleSidebar(): void;
    showSidebar: boolean;
}

const FullScreenNavigation: React.FC<Props> = ({ onToggleSidebar, showSidebar }) => {
    const {
        calendarLink,
        dashboardLink,
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
                        <ActiveNavLink href={calendarLink.link} className={classes.link}>
                            {calendarLink.name}
                        </ActiveNavLink>
                    </li>
                    <li className={classes.item}>
                        <ActiveNavLink href={dashboardLink.link} className={classes.link}>
                            {dashboardLink.name}
                        </ActiveNavLink>
                    </li>
                    <li className={classes.sublist}>
                        <h3 className={classes.label}>Task Planners</h3>
                        <div className="flex flex-col gap-2">
                            {plannerLinks.map((pl, idx) => (
                                <ActiveNavLink key={idx} href={pl.link} className={classes.link}>
                                    {pl.name}
                                </ActiveNavLink>
                            ))}
                        </div>
                    </li>
                    <li className={classes.sublist}>
                        <h3 className={classes.label}>Time Tables</h3>
                        <div className="flex flex-col gap-2">
                            {templateLinks.map((template, idx) => (
                                <ActiveNavLink
                                    key={idx}
                                    href={template.link}
                                    className={classes.link}
                                >
                                    {template.name}
                                </ActiveNavLink>
                            ))}
                        </div>
                    </li>
                    <li className={classes.sublist}>
                        <h3 className={classes.label}>Data Analysis</h3>
                        <div className="flex flex-col gap-2">
                            {dataAnalysisLinks.map((analysis, idx) => (
                                <ActiveNavLink
                                    key={idx}
                                    href={analysis.link}
                                    className={classes.link}
                                >
                                    {analysis.name}
                                </ActiveNavLink>
                            ))}
                        </div>
                    </li>
                    <li className={classes.sublist}>
                        <h3 className={classes.label}>Todo Lists</h3>
                        <div className="flex flex-col gap-2">
                            {todoLinks.map((todoList, idx) => (
                                <ActiveNavLink
                                    key={idx}
                                    href={todoList.link}
                                    className={classes.link}
                                >
                                    {todoList.name}
                                </ActiveNavLink>
                            ))}
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default FullScreenNavigation;
