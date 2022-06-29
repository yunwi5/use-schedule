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
import CalendarDoc from './sections/CalendarDoc';
import PlannerDoc from './sections/PlannerDoc';

const AboutMain = () => {
    return (
        <div className={'min-h-[100%]'}>
            <main
                className={`px-3 sm:px-4 lg:px-6 xl:px-8 pt-8 pb-10 text-slate-700 ${classes.main}`}
            >
                <section id={AboutStartSection.id} className={'px-4 lg:px-8 xl:px-14'}>
                    <div className="mb-10 pl-[10%] text-left sm:text-center">
                        <h1 className="mb-3 text-3xl lg:text-4xl text-slate-600">
                            About{' '}
                            <span className={'text-sky-600'}>{AppProperty.APP_NAME}</span>{' '}
                            Services
                        </h1>
                        {/* <h3 className={'text-xl'}>
                            Organized documentation for all features & functionalities
                        </h3> */}
                    </div>
                    <AboutNavigation />
                </section>
                <div className="mt-[10rem]"></div>
                <CalendarDoc />
                <DashboardDoc />
                <RecurringScheduleDoc />
                <PlannerDoc />
                <TemplateTableDoc />
                <TodoListDoc />
                <DataAnalysisDoc />
            </main>
        </div>
    );
};

export default AboutMain;
