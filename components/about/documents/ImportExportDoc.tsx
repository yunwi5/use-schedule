import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faFileImport } from '@fortawesome/pro-duotone-svg-icons';

import { DataAnalysisSection, ImportExportSection } from '../../../constants/about-sections';
import { AboutTheme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getCalendarLink } from '../../../utilities/link-utils';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/features-grid/FeaturesGrid';
import VideoIntroduction from '../partials/video-introduction/VideoIntroduction';
import SectionButton from '../partials/SectionButton';

const ImportExportDoc: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.BLUE}>
            <VideoIntroduction
                title={ImportExportSection.name}
                id={ImportExportSection.id}
                heading="Flexible data exchange with external applications"
                checkList={checkList}
                videoSrc={ImportExportSection.videoSrc}
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
        Share your <mark>schedules and progress</mark> with <mark>external applications</mark>,
        for example Google calendar!
    </>,
    <>
        Quickly Import & Export schedules with <mark>custom configuration</mark>.
    </>,
    <>
        You can import schedules from apps like Google calendar then go to the{' '}
        <a href={DataAnalysisSection.link}>Data Analysis section</a> to see your analytics!
        This is one other <mark>niche use case</mark>!
    </>,
];

const features: FeatureBox[] = [
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faFileImport} className={'scale-125 mr-2'} /> Import
                schedules from any apps!
            </>
        ),
        image: { src: `${ImportExportSection.imagePath}/ical-import.jpg`, height: 80 },
        paragraphs: [
            <>
                Almost every modern calendar application including Google Calendar{' '}
                <mark>supports ICalendar file</mark> for importing and exporting the schedules.
            </>,
            <>
                <mark>University calendars</mark> frequently support ICalendar file for the
                export, so if you are students, you can{' '}
                <mark>transfer University schedules</mark> to our app quickly with this
                functionality!
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faFileExport} className={'scale-[120%] mr-2'} /> Custom
                configuration for the export
            </>
        ),
        image: { src: `${ImportExportSection.imagePath}/ical-export.jpg`, height: 80 },
        paragraphs: [
            <>
                You can optionally choose the <mark>type of schedules</mark> like events or
                tasks you want to export .
            </>,
            <>
                For maximized configuration, we also enabled{' '}
                <mark>selecting the intervals</mark> you want to export. For example, if you
                want to <mark>avoid duplication of events</mark> in other apps, you can
                optionally <mark>choose some specific intervals</mark> to prevent that.
            </>,
        ],
    },
];

export default ImportExportDoc;
