import React from 'react';
import Link from 'next/link';
import {
    faChartColumn,
    faChartMixed,
    faChartPie,
    faMessageBot,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DataAnalysisSection } from '../../../constants/about-sections';
import { AboutTheme, Theme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getWeeklyAnalysisLink } from '../../../utilities/link-utils';
import Button from '../../ui/buttons/Button';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/features-grid/FeaturesGrid';
import VideoIntroduction from '../partials/video-introduction/VideoIntroduction';

const DataAnalysis: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.SKY}>
            <VideoIntroduction
                title={DataAnalysisSection.name}
                id={DataAnalysisSection.id}
                heading="The most comprehensive and detailed data analysis of your personal schedules"
                checkList={checkList}
                videoSrc={DataAnalysisSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <Button theme={Theme.SECONDARY} className={'self-center  !px-8 !rounded-full'}>
                <Link href={getWeeklyAnalysisLink()}>Try This Out!</Link>
            </Button>
        </SectionCard>
    );
};

const checkList = [
    <>
        Provide <mark>three different analysis modes</mark> including{' '}
        <mark>weekly analysis</mark>, <mark>monthly analysis</mark> and{' '}
        <mark>yearly analysis</mark>.
    </>,
    <>
        Navigate to <mark>different periods</mark> you want and see the <mark>analytics</mark>{' '}
        in that week, month and year.
    </>,
    <>
        Comprehensive analysis <mark>across 7 sections</mark> including{' '}
        <mark>trend analysis</mark>, <mark>periodic analysis</mark> and{' '}
        <mark>categorical analysis</mark>.
    </>,
];

const features: FeatureBox[] = [
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faChartMixed} className={'mr-2'} /> Flexible data
                visualization
            </>
        ),
        image: { src: `${DataAnalysisSection.imagePath}/trend-chart.jpg` },
        paragraphs: [
            <>
                Trend chart visually <mark>compares your workload</mark> in recent weeks,
                months and years depending on the analysis mode.
            </>,
            <>
                You can <mark>filter the events & tasks</mark> based on the status and{' '}
                <mark>control the number of periods</mark> you want to visualize.
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faChartPie} className={'mr-2'} /> Various chart type
                supports
            </>
        ),
        image: { src: `${DataAnalysisSection.imagePath}/flex-chart.jpg` },
        paragraphs: [
            <>
                We don&apos;t just stick to one type of chart! Feel free to change any chart to
                the <mark>chart type</mark> that you prefer.
            </>,
            <>
                We provide chart types including <mark>bar</mark>, <mark>pie</mark>,
                <mark>doughnut</mark> and <mark>polar</mark> to maximise your{' '}
                <mark>visual satisfaction</mark>!
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faChartColumn} className={'mr-2'} /> Direct comparison
                to previous periods
            </>
        ),
        image: {
            src: `${DataAnalysisSection.imagePath}/comparison-chart.jpg`,
        },
        paragraphs: [
            <>
                Clicking the <mark>&apos;Show Comparison&apos;</mark> button will pop up the{' '}
                <mark>comparison chart</mark> which will compare your data to the
                <mark>previous week</mark>, <mark>month</mark> or <mark>year</mark>.
            </>,
            <>
                Hence, it is easy to know how many schedules you have or how the distribution
                of your schedules <mark>changes</mark>!
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faMessageBot} className={'mr-2'} /> Analysis message of
                your schedules
            </>
        ),
        image: { src: `${DataAnalysisSection.imagePath}/analysis-message.jpg` },
        paragraphs: [
            <>
                We also make sure to provide the <mark>analytic message</mark> right below the
                chart to specifically explain the <mark>trend</mark>, <mark>distribution</mark>{' '}
                and <mark>comparison</mark> of your data!
            </>,
            <>
                Analytic message usually explains <mark>key summary statistics</mark> of the
                data of the chart it refers to.
            </>,
        ],
    },
];

export default DataAnalysis;
