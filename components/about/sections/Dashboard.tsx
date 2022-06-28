import React from 'react';
import Link from 'next/link';
import {
    faCalendarCircleExclamation,
    faCalendarDays,
    faChartLineUp,
    faMemoPad,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DashboardSection } from '../../../constants/about-sections';
import { AboutTheme, Theme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getNewTemplateLink } from '../../../utilities/link-utils';
import Button from '../../ui/buttons/Button';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/features-grid/FeaturesGrid';
import VideoIntroduction from '../partials/video-introduction/VideoIntroduction';

const Dashboard: React.FC = () => {
    const checkList = [
        <>
            <mark>Weekly data summary</mark> including weekly workload, weekly completion rate
            etc.
        </>,
        <>
            Allows you to <mark>time travel</mark> to different periods by simply navigating
            through the <mark>mini calendar</mark> on the top!
        </>,
        <>
            Your schedule <mark>trend summary</mark> and <mark>progress summary</mark> that you
            can check in a minute.
        </>,
    ];

    const features: FeatureBox[] = [
        {
            heading: (
                <>
                    <FontAwesomeIcon icon={faChartLineUp} className={'mr-2'} /> Trend
                    comparison across periods
                </>
            ),
            image: { src: `${DashboardSection.imagePath}/trend.jpg` },
            paragraphs: [
                <>
                    You can easily compare the workload in <mark>recent weeks</mark> by simply
                    looking at the trend chart.
                </>,
                <>
                    The chart is really <mark>flexible</mark>, and it allows you to change the
                    <mark>number of weeks</mark> you want to view at once i.e. 5, 10, 15 and 20
                    recent weeks.
                </>,
            ],
        },
        {
            heading: (
                <>
                    <FontAwesomeIcon icon={faCalendarDays} className={'mr-2'} /> Time Travel
                    With mini calendar
                </>
            ),
            image: { src: `${DashboardSection.imagePath}/mini-calendar.jpg`, height: 45 },
            paragraphs: [
                <>
                    The <mark>mini calendar</mark> in our dashboard basically allows you to
                    time <mark>travel in different periods</mark> you navigate to.
                </>,
                <>
                    All the <mark>dashboard data</mark> including weekly data, upcoming events
                    & tasks, recent trends, progress summary are adjusted to your{' '}
                    <mark>selected week</mark>!
                </>,
            ],
        },
        {
            heading: (
                <>
                    <FontAwesomeIcon icon={faCalendarCircleExclamation} className={'mr-2'} />{' '}
                    View upcoming schedules
                </>
            ),
            image: { src: `${DashboardSection.imagePath}/upcomings.jpg` },
            paragraphs: [
                <>
                    You can view upcoming events and tasks of your selected week in the{' '}
                    <mark>Upcomings table</mark>.
                </>,
                <>
                    It is useful to find out <mark>which events and tasks</mark> you had in
                    that <mark>specific period</mark> by using it alongside with the{' '}
                    <mark>mini calendar</mark>.
                </>,
            ],
        },
        {
            heading: (
                <>
                    <FontAwesomeIcon icon={faMemoPad} className={'mr-2'} /> Summary of your
                    template tables
                </>
            ),
            image: { src: `${DashboardSection.imagePath}/dashboard-table.jpg`, height: 30 },
            paragraphs: [
                <>
                    The later section also includes the summary of your template time table you
                    defined. It shows total tasks, total hours you spend, as well as its
                    importance.
                </>,
                <>
                    You can <Link href={getNewTemplateLink()}>make your own time table</Link>{' '}
                    that defines <mark>weekly schedules</mark> that are repetitive, then import
                    them in your planner to <mark>save your planning time</mark>.
                </>,
            ],
        },
    ];

    return (
        <SectionCard theme={AboutTheme.BLUE}>
            <VideoIntroduction
                title={DashboardSection.name}
                id={DashboardSection.id}
                heading="Become an admin of your daily schedules using our comprehensive dashboard!"
                checkList={checkList}
                videoSrc={DashboardSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <Button theme={Theme.TERTIARY} className={'self-center  !px-8 !rounded-full'}>
                Try This Out!
            </Button>
        </SectionCard>
    );
};

export default Dashboard;
