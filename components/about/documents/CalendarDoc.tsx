import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardListCheck, faGrid2 } from '@fortawesome/pro-duotone-svg-icons';

import { CalendarSection } from '../../../constants/about-sections';
import { AboutTheme, Theme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getCalendarLink } from '../../../utilities/link-utils';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/FeaturesGrid';
import VideoIntroduction from '../partials/VideoIntroduction';
import SectionButton from '../partials/SectionButton';

const RecurringSchedule: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.SKY}>
            <VideoIntroduction
                title={CalendarSection.name}
                id={CalendarSection.id}
                heading="Overview of all the schedules visualized in the most user friendly way"
                checkList={checkList}
                videoSrc={CalendarSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <SectionButton>
                <Link href={getCalendarLink()}>Try This Out!</Link>
            </SectionButton>
        </SectionCard>
    );
};

const checkList = [
    <>
        View & Handle <mark>all the schedules</mark> in one place including events, tasks and
        todos (that have set date & time)!
    </>,
    <>
        Provide <mark>various filtering options</mark> on the sidebar which allows you to
        <mark>select specific types</mark> of schedules you want to view.
    </>,
    <>
        Support full <mark>import & export functionalities</mark> to allow flexible data
        transfer to and from external calendars such as <mark>Google Calendar</mark>.
    </>,
];

const features: FeatureBox[] = [
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faGrid2} className={'mr-2'} /> Responsive Calendar Grid
                Layout
            </>
        ),
        image: { src: `${CalendarSection.imagePath}/calendar-grid.jpg` },
        paragraphs: [
            <>
                The calendar grid is <mark>responsive</mark>, meaning it has been adjusted for
                all of <mark>mobile</mark>, <mark>tablet</mark> and{' '}
                <mark>desktop screen sizes</mark>!
            </>,
            <>
                Clicking the calendar cell will <mark>expand the cell</mark> as well as extra
                options that easily allow you to <mark>add events & tasks on that date</mark>.
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faClipboardListCheck} className={'mr-2'} /> Well
                organized agenda layout
            </>
        ),
        image: { src: `${CalendarSection.imagePath}/calendar-agenda.jpg` },
        paragraphs: [
            <>
                If you add wrong event or task accidently, or if you want to delete your events
                or tasks, you can <mark>optionally delete</mark> all <mark>duplicated</mark>
                schedules at once by deleting the one in the <mark>recurring item page</mark>.
            </>,
        ],
    },
];

export default RecurringSchedule;
