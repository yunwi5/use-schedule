import React from 'react';
import { AboutStartSection } from '../../constants/about-sections';
import { AppProperty } from '../../constants/global-constants';
import AboutNavigation from './nav/AboutNavigation';
import RecurringScheduleDoc from './sections/RecurringScheduleDoc';
import DashboardDoc from './sections/DashboardDoc';
import TodoListDoc from './sections/TodoListDoc';
import DataAnalysisDoc from './sections/DataAnalysisDoc';
import TemplateTableDoc from './sections/TemplateTableDoc';
import classes from './About.module.scss';

const AboutMain = () => {
    return (
        <div className={'min-h-[100%]'}>
            <main
                className={`px-3 sm:px-4 lg:px-6 xl:px-8 pt-8 pb-10 text-slate-700 ${classes.main}`}
            >
                <div className="mb-5" id={AboutStartSection.id}>
                    <h1 className="mb-3 text-4xl text-slate-600">
                        About <span className={'text-sky-600'}>{AppProperty.APP_NAME}</span>{' '}
                        Services
                    </h1>
                    <h3 className={'text-xl'}>
                        Organized documentation for all features & functionalities
                    </h3>
                </div>
                <AboutNavigation />
                <div className="mt-[10rem]"></div>
                <DashboardDoc />
                <RecurringScheduleDoc />
                <TemplateTableDoc />
                <TodoListDoc />
                <DataAnalysisDoc />
            </main>
        </div>
    );
};

export default AboutMain;
