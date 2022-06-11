import useAppLinks from '../../../hooks/useAppLinks';
import NavList from './NavList';
import ActiveNavLink from '../../ui/design-elements/ActiveNavLink';
import classes from '../Layout.module.scss';

interface Props {
    onToggleSidebar: () => void;
    showSidebar: boolean;
}

const SideNav: React.FC<Props> = ({ showSidebar }) => {
    const {
        calendarLink,
        dashboardLink,
        dataAnalysisLinks,
        recurringScheduleLinks,
        plannerLinks,
        templateLinks,
        todoLinks,
    } = useAppLinks();

    return (
        <nav
            className={`bg-slate-500/90 xl:!min-w-[10.5rem] h-full p-2 flex flex-col gap-2 items-start ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
            } ease-in-out duration-[.5s] ${classes.sidenav}`}
        >
            <ActiveNavLink
                href={calendarLink.link}
                className={`text-[1.4rem] text-gray-100 hover:text-sky-300 border-l-[2.7px] border-transparent`}
                activeClassName="pl-2 font-bold brightness-105 border-l-[2.7px] text-blue-300 !border-sky-300 border-blue-300"
            >
                {calendarLink.name}
            </ActiveNavLink>
            <ActiveNavLink
                href={dashboardLink.link}
                className={`text-[1.4rem] text-gray-100 hover:text-sky-300 border-l-[2.7px] border-transparent`}
                activeClassName="pl-2 font-bold brightness-105 border-l-[2.7px] text-blue-300 !border-sky-300 border-blue-300"
            >
                {dashboardLink.name}
            </ActiveNavLink>
            <NavList listName="Recurring Items" items={recurringScheduleLinks} />
            <NavList listName="Data Analysis" items={dataAnalysisLinks} />
            <NavList listName="Task Planners" items={plannerLinks} />
            <NavList listName="Time Tables" items={templateLinks} />
            <NavList listName="Custom Lists" items={todoLinks} />
        </nav>
    );
};

export default SideNav;
