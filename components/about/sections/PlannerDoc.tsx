import Link from 'next/link';
import { faCloudArrowDown, faTableList } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PlannerSection } from '../../../constants/about-sections';
import { AboutTheme, Theme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getNewTemplateLink } from '../../../utilities/link-utils';
import Button from '../../ui/buttons/Button';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/features-grid/FeaturesGrid';
import VideoIntroduction from '../partials/video-introduction/VideoIntroduction';

const PlannerDoc: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.BLUE}>
            <VideoIntroduction
                title={PlannerSection.name}
                id={PlannerSection.id}
                heading="Planners that are optimized for schedule settings as well as goal settings"
                checkList={checkList}
                videoSrc={PlannerSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <Button theme={Theme.TERTIARY} className={'self-center !px-8 !rounded-full'}>
                <Link href={getNewTemplateLink()}>Try This Out!</Link>
            </Button>
        </SectionCard>
    );
};

const checkList = [
    <>
        Three versions of planners including weekly planner, monthly planner and yearly planner
        specific to your personal scheduling and goal settings.
    </>,
    <>
        Weekly planner supporting both list view and time table view to suit your preference!{' '}
    </>,
    <>
        Monthly planner and yearly planner are specifically designed to let you set your
        monthly or yearly goals.
    </>,
];

const features: FeatureBox[] = [
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faTableList} className={'mr-2'} /> Real time table
                looking template
            </>
        ),
        image: { src: `${PlannerSection.imagePath}/template-table.jpg` },
        paragraphs: [
            <>
                Template table supports both <mark>time table view</mark> and{' '}
                <mark>list view</mark> to fit your visual preference!
            </>,
            <>
                Especially, time table view <mark>visualizes your weekly schedules</mark> like
                a school/university time table!
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faCloudArrowDown} className={'mr-2'} /> Import multiple
                tables at once!
            </>
        ),
        image: { src: `${PlannerSection.imagePath}/template-import.jpg` },
        paragraphs: [
            <>
                You can find a &quot;Template Tables&quot; button in the weekly planner which
                pops up a modal that let you select the time table you want to import
            </>,
            <>
                Select <mark>multiple time tables</mark> you need for your selected week, then
                all tasks in those tables will be <mark>automatically imported</mark>!
            </>,
        ],
    },
];

export default PlannerDoc;
