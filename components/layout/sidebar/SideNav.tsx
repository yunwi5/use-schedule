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
            className={`bg-slate-50 border-r-[2px] z-40 border-slate-500 xl:!min-w-[10.5rem] h-full p-2 flex flex-col gap-2 items-start ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
            } ease-in-out duration-[.5s] ${classes.sidenav}`}
        >
            <ActiveNavLink
                href={calendarLink.link}
                className={`text-xl text-slate-700/90 hover:text-sky-500 border-l-[2.7px] border-transparent`}
                activeClassName="pl-2 font-bold brightness-105 border-l-[2.7px] !text-blue-500 !border-blue-400"
            >
                {calendarLink.name}
            </ActiveNavLink>
            <ActiveNavLink
                href={dashboardLink.link}
                className={`text-xl text-slate-700/90 hover:text-sky-600 border-l-[2.7px] border-transparent`}
                activeClassName="pl-2 font-bold brightness-105 border-l-[2.7px] !text-blue-500 !border-blue-400"
            >
                {dashboardLink.name}
            </ActiveNavLink>
            <NavList listName="Recurring Items" items={recurringScheduleLinks} />
            <NavList listName="Data Analysis" items={dataAnalysisLinks} />
            <NavList listName="Task Planners" items={plannerLinks} />
            <NavList listName="Template Tables" items={templateLinks} />
            <NavList listName="Lists" items={todoLinks} />
        </nav>
    );
};

export default SideNav;
