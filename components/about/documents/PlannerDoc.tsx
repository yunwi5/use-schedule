import Link from 'next/link';
import { faFunction, faListTree } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    ImportExportSection,
    PlannerSection,
    TemplateSection,
} from '../../../constants/about-sections';
import { AboutTheme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getAnalysisLink, getPlannerLink } from '../../../utilities/link-utils';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/FeaturesGrid';
import VideoIntroduction from '../partials/VideoIntroduction';
import SectionButton from '../partials/SectionButton';
import { PlannerMode } from '../../../models/planner-models/PlannerMode';

const PlannerDoc: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.SKY}>
            <VideoIntroduction
                title={PlannerSection.name}
                id={PlannerSection.id}
                heading="Planners that are optimized for schedule settings as well as goal settings"
                checkList={checkList}
                videoSrc={PlannerSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <SectionButton>
                <Link href={getPlannerLink(PlannerMode.WEEKLY)}>Try This Out!</Link>
            </SectionButton>
        </SectionCard>
    );
};

const checkList = [
    <>
        Three versions of planners including <mark>weekly planner</mark>,{' '}
        <mark>monthly planner</mark> and <mark>yearly planner</mark> specific to your{' '}
        <mark>personal scheduling</mark> and <mark>goal settings</mark>.
    </>,
    <>
        Weekly planner supporting both <mark>list view</mark> and <mark>time table</mark> view
        to suit your preference!
    </>,
    <>
        Monthly planner and yearly planner are specifically designed to let you set your{' '}
        <mark>monthly</mark> and <mark>yearly goals</mark>.
    </>,
];

const features: FeatureBox[] = [
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faFunction} className={'mr-2'} /> Various utility
                functionalities
            </>
        ),
        image: { src: `${PlannerSection.imagePath}/planner-util.jpg`, height: 40 },
        paragraphs: [
            <>
                Provide bunch of utilities including filtering, searching, folding, as well as
                changing the layout between list view and table view (for weekly planner).
            </>,
            <>
                On top of that, you can also see the{' '}
                <Link href={getAnalysisLink(PlannerMode.WEEKLY)}>analytics</Link>,{' '}
                <a href={TemplateSection.link}>import template tables</a>, as well as{' '}
                <a href={ImportExportSection.link}>import tasks from and export tasks</a> to
                external apps!
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faListTree} className={'mr-2'} /> Task details &
                subtasks extension
            </>
        ),
        image: { src: `${PlannerSection.imagePath}/task-modal.jpg` },
        paragraphs: [
            <>
                Make your task very much <mark>in detail</mark> by adding various properties!
                But you don&quot;t need to be stressed as <mark>the only property</mark> you
                need to add each time is <mark>title</mark>!
            </>,
            <>
                Each task can optionally have a <mark>list of subtasks</mark> which breaks down
                the <mark>progress of your task</mark> in <mark>smaller details</mark>. If your
                task is large, subtasks can help you!
            </>,
        ],
    },
];

export default PlannerDoc;
