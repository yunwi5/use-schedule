import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintbrushPencil, faSquareList } from '@fortawesome/pro-duotone-svg-icons';

import { TodoListSection } from '../../../constants/about-sections';
import { AboutTheme } from '../../../models/design-models';
import { FeatureBox } from '../../../models/ui-models';
import { getNewTodoListLink } from '../../../utilities/link-utils';
import SectionCard from '../cards/SectionCard';
import FeaturesGrid from '../partials/FeaturesGrid';
import VideoIntroduction from '../partials/VideoIntroduction';
import SectionButton from '../partials/SectionButton';

const TodoList: React.FC = () => {
    return (
        <SectionCard theme={AboutTheme.INDIGO}>
            <VideoIntroduction
                title={TodoListSection.name}
                id={TodoListSection.id}
                heading="Group todos that belong together and manage them in one place!"
                checkList={checkList}
                videoSrc={TodoListSection.videoSrc}
            />
            <FeaturesGrid features={features} />
            <SectionButton>
                <Link href={getNewTodoListLink()}>Try This Out!</Link>
            </SectionButton>
        </SectionCard>
    );
};

const checkList = [
    <>
        Define <mark>your own list</mark> with our preferred domain (title), and then add todos
        that belong to your domain to <mark>manage them altogether</mark>!
    </>,
    <>
        <mark>Extremely quick</mark> to add, but tons of options to{' '}
        <mark>customize each todo</mark> item!
    </>,
    <>
        Each todo can have <mark>sub todos</mark> nested inside itself, in order to provide
        further <mark>details</mark> and <mark>flexibility</mark>.
    </>,
];

const features: FeatureBox[] = [
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faPaintbrushPencil} className={'mr-2'} /> Select your
                custom theme
            </>
        ),
        image: { src: `${TodoListSection.imagePath}/todo-theme.jpg`, width: '99%' },
        paragraphs: [
            <>
                Select the theme which can <mark>customize your list</mark> with a unique
                design!
            </>,
            <>
                We provide <mark>15 themes</mark> that are based on{' '}
                <mark>beautiful sceneries</mark> across the world.
            </>,
        ],
    },
    {
        heading: (
            <>
                <FontAwesomeIcon icon={faSquareList} className={'scale-[120%] mr-2'} /> Summary
                table of your list
            </>
        ),
        image: { src: `${TodoListSection.imagePath}/todo-summary.jpg`, width: '105%' },
        paragraphs: [
            <>
                Each list has its own <mark>summary table</mark> that represents the{' '}
                <mark>current status</mark> of your list, including <mark>completed</mark>{' '}
                todos, <mark>overdue</mark> todos, todos for <mark>today</mark>, and todos for
                the <mark>current week</mark>.
            </>,
        ],
    },
];

export default TodoList;
