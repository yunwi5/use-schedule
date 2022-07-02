import Link from 'next/link';
import { faCloudArrowDown, faTableList } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TemplateSection } from '../../../constants/about-sections';
import { AboutTheme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getNewTemplateLink } from '../../../utilities/link-utils';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/FeaturesGrid';
import VideoIntroduction from '../partials/VideoIntroduction';
import SectionButton from '../partials/SectionButton';

const TemplateTableDoc: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.BLUE}>
            <VideoIntroduction
                title={TemplateSection.name}
                id={TemplateSection.id}
                heading="The most convinient & efficient way to manage your time table"
                checkList={checkList}
                videoSrc={TemplateSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <SectionButton>
                <Link href={getNewTemplateLink()}>Try This Out!</Link>
            </SectionButton>
        </SectionCard>
    );
};

const checkList = [
    <>
        Combined with a <mark>Weekly Planner</mark> to <mark>automate</mark> your planning
        process with <mark>predefined tasks</mark> in the table you create.
    </>,
    <>
        Create Once, Apply Everywhere. Apply your time tables to <mark>any weeks</mark> you
        want by simply importing them <mark>all at once</mark>.
    </>,
    <>
        If you have manually typed or written 10~30 repetitive tasks in your planner every
        week, this is the perfect option to <mark>remove all your manual work</mark>!
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
        image: { src: `${TemplateSection.imagePath}/template-table.jpg` },
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
        image: { src: `${TemplateSection.imagePath}/template-import.jpg` },
        paragraphs: [
            <>
                You can find a <mark>&quot;Template Tables&quot; button</mark> in the weekly
                planner which pops up a modal that let you select the time table you want to
                import
            </>,
            <>
                Select <mark>multiple time tables</mark> you need for your selected week, then
                all tasks in those tables will be <mark>automatically imported</mark>!
            </>,
        ],
    },
];

export default TemplateTableDoc;
