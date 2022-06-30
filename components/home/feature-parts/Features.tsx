import React from 'react';

import { getAppImagePath } from '../helper';
import Feature from './Feature';
import classes from '../Home.module.scss';
import {
    getAnalysisLink,
    getCalendarLink,
    getDashboardLink,
    getRecurringEventLink,
} from '../../../utilities/link-utils';

const Features: React.FC = () => {
    const featuresList = [
        dashboardFeature,
        calendarFeature,
        analysisFeature,
        recurringFeature,
        plannerFeature,
        tmeplateFeature,
        customListFeature,
    ];

    return (
        <section className={`mt-6 p-6 text-slate-600 ${classes.features}`}>
            <h1 className={classes.heading}>Features We Have</h1>
            <div className="flex flex-col gap-16">
                {featuresList.map((feature, idx) => {
                    return <Feature key={idx} {...feature} isEven={idx % 2 == 0} />;
                })}
            </div>
        </section>
    );
};

const plannerFeature = {
    name: 'planner',
    mainImg: getAppImagePath('planner-ex.jpg'),
    headingLabel: 'Periodic planners',
    heading: 'Complete schedular that makes your life compact',
    paragraphs: [
        'We have 3 kinds of planners, weekly planner, montly planner and yearly planner that can suit your custom needs.',
        'You can also see the details of every task you created. Each task can have its sub tasks, if your task is too large and has some sub parts.',
    ],
    btnLink: '/task-planner/weekly-planner',
};

const calendarFeature = {
    name: 'calendar',
    mainImg: getAppImagePath('calendar-ex.jpg'),
    headingLabel: 'All in one calendar',
    heading: 'Calendar to collaborate all your schedules',
    paragraphs: [
        'Support grid layout as well as agenda layout to view the schedules in order to suit your visual satisfaction.',
        'Provide filtering options to filter the items.',
        'Import & Export features to let you import from and export to external applications.',
    ],
    btnLink: getCalendarLink(),
};

const recurringFeature = {
    name: 'recurring',
    mainImg: getAppImagePath('recurring-ex.jpg'),
    headingLabel: 'Recurring Schedules',
    heading: 'Manage repetitive events & tasks efficiently',
    paragraphs: [
        'One of the most efficient ways to manage all your recurring schedules in one place',
        'You can see all the details of your recurring schedule, and you can edit or delete all of them at the same time!',
    ],
    btnLink: getRecurringEventLink(),
};

const dashboardFeature = {
    name: 'dashboard',
    mainImg: getAppImagePath('dashboard-ex.jpg'),
    headingLabel: 'Admin Dashboard',
    heading: 'Feel like an admin of your daily schedules!',
    paragraphs: [
        'Detailed trend & progress summary that provides intuitive overview of your schedules.',
        'Not only the current period, you can also navigate to the different periods to see the overview of the past & future using the mini calendar!',
    ],
    btnLink: getDashboardLink(),
};

const analysisFeature = {
    name: 'data-analysis',
    mainImg: getAppImagePath('analysis-ex.jpg'),
    headingLabel: 'Data Analytics',
    heading: 'The most comprehensive data analysis features',
    paragraphs: [
        'Provide three different verions of data analysis including weekly, montly and yearly analysis to suit your needs.',
        'Seven different sections that fully cover trend, periodic, and categorical analysis of your schedules',
    ],
    btnLink: getAnalysisLink(),
};

const tmeplateFeature = {
    name: 'template',
    mainImg: getAppImagePath('template-ex.jpg'),
    headingLabel: 'Time table template',
    heading: 'Life booster that can speed your scheduling process',
    paragraphs: [
        'Are you constantly annoyed by adding repetitive tasks to every single week when you schedule?',
        'If then, this functionality is for you! You can build your own table, and then appli whenever week you want, by simply importing it! It only takes 5 seconds.',
    ],
    btnLink: '/templates/new',
};

const customListFeature = {
    name: 'custom-list',
    mainImg: getAppImagePath('custom-list-ex.jpg'),
    headingLabel: 'Custom Todo List',
    heading: 'Custom thematic todo list highly specific to your needs',
    paragraphs: [
        'You can group tasks that are specific to certain subject or topic into one list that you define.',
        'You define it and you style it. We provide 12+ custom themes that you can apply to decorate your custom list!',
    ],
    btnLink: '/todos/new',
};

export default Features;
