import {
    faArrowDownSquareTriangle,
    faChartUser,
    faClipboardListCheck,
    faCloudArrowUp,
    faForwardFast,
    faLaptopMobile,
} from '@fortawesome/pro-duotone-svg-icons';
import StrengthItem, { Strength } from './StrengthItem';

import { AppProperty } from '../../../constants/global-constants';
import homeClasses from '../Home.module.scss';
import classes from './Strength.module.scss';

const HomeStrengthGrid: React.FC = () => {
    return (
        <div className={`max-w-[97%] px-4 lg:px-8 xl:px-12 text-slate-700 ${classes.grid}`}>
            <h2 className={`${homeClasses.heading} ${classes.heading} text-slate-600`}>
                Why <span className={'text-slate-600'}>{AppProperty.APP_NAME}</span>
            </h2>
            {strengths.map((strength, idx) => (
                <StrengthItem key={idx} {...strength} />
            ))}
        </div>
    );
};

// static information
const strengths: Strength[] = [
    {
        icon: faClipboardListCheck,
        heading: 'Solid Planning',
        text: 'Solid support for planning process including calendars and planners which support both list and grid layouts.',
    },
    {
        icon: faChartUser,
        heading: 'Analytics & Visualization',
        text: 'Dashboard and data analysis sections support extremely detailed custom analytics based on your scheduling data.',
    },
    {
        icon: faForwardFast,
        heading: 'Efficiency of use',
        text: 'Tons of tools to minimize your planning time. Try our recurring schedules and template tables.',
    },
    {
        icon: faLaptopMobile,
        heading: 'Resonsiveness',
        text: 'All the pages are responsive so that you can use this app in either mobile, tablet or desktop screens.',
    },
    {
        icon: faArrowDownSquareTriangle,
        heading: 'Utilities',
        text: 'Various utility functionality support like filtering, sorting and searching options for the calendar and planners.',
    },
    {
        icon: faCloudArrowUp,
        heading: 'Easy and quick set up',
        text: 'Very quick to set up using our import feature to import all the schedules from other app you have been using.',
    },
];

export default HomeStrengthGrid;
