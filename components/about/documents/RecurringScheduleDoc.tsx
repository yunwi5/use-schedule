import React from 'react';
import Link from 'next/link';
import { faEdit, faTrashCan } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecurringSection } from '../../../constants/about-sections';

import { AboutTheme, Theme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getRecurringEventLink } from '../../../utilities/link-utils';
import Button from '../../ui/buttons/Button';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/features-grid/FeaturesGrid';
import VideoIntroduction from '../partials/video-introduction/VideoIntroduction';
import SectionButton from '../partials/SectionButton';

const RecurringSchedule: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.INDIGO}>
            <VideoIntroduction
                title={RecurringSection.name}
                id={RecurringSection.id}
                heading="The best way to save your time and make your planning as efficient as possible"
                checkList={checkList}
                videoSrc={RecurringSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <SectionButton>
                <Link href={getRecurringEventLink()}>Try This Out!</Link>
            </SectionButton>
        </SectionCard>
    );
};

const checkList = [
    <>
        Manage all your recurring events and tasks in <mark>one place</mark>.
    </>,
    <>
        <mark>Customize the recurring interval</mark> according to your needs i.e. every week,
        month or year
    </>,
    <>
        <mark>All the properties</mark> of your event and task will be <mark>duplicated</mark>{' '}
        and will be <mark>added</mark> to your calendar & planner&nbsp;
        <mark>automatically</mark>.
    </>,
];

const features: FeatureBox[] = [
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faEdit} className={'mr-2'} /> Edit all at once
            </>
        ),
        image: { src: `${RecurringSection.imagePath}/rec-edit.jpg` },
        paragraphs: [
            <>
                When you want to <mark>edit the property</mark> of your recurring shcedules
                like title, description and location, you can do it in <mark>once place!</mark>
            </>,
            <>
                You can <mark>optionally edit</mark> the properties of all generated schedules
                in the <mark>recurring item page</mark>.
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faTrashCan} className={'mr-2'} /> Delete all at once
            </>
        ),
        image: { src: `${RecurringSection.imagePath}/rec-delete.jpg` },
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
