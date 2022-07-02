import { AboutStartSection } from '../../constants/about-sections';
import AboutNavigation from './nav/AboutNavigation';
import RecurringScheduleDoc from './documents/RecurringScheduleDoc';
import DashboardDoc from './documents/DashboardDoc';
import TodoListDoc from './documents/TodoListDoc';
import DataAnalysisDoc from './documents/DataAnalysisDoc';
import TemplateTableDoc from './documents/TemplateTableDoc';
import CalendarDoc from './documents/CalendarDoc';
import PlannerDoc from './documents/PlannerDoc';
import ImportExportDoc from './documents/ImportExportDoc';
import { AboutFooter, AboutHeading, AboutIntroduction, TypeWriting } from './sections';
import classes from './About.module.scss';

const AboutMain = () => {
    return (
        <div className={'min-h-[100%]'}>
            <main
                className={`px-3 sm:px-4 lg:px-6 xl:px-8 pt-12 pb-14 text-slate-700 ${classes.main}`}
            >
                <section id={AboutStartSection.id} className={'px-4 lg:px-8 xl:px-14'}>
                    <AboutHeading />
                    <AboutNavigation />
                </section>
                {/* Introduction & Typewriter animation */}
                <div
                    className={
                        '-mt-[1rem] flex flex-col gap-8 items-center px-3 sm:px-5 lg:px-12 xl:px-8'
                    }
                >
                    <AboutIntroduction />
                    <TypeWriting />
                </div>
                {/* Section Documentation */}
                <div className="mt-[.5rem]">
                    <CalendarDoc />
                    <DashboardDoc />
                    <RecurringScheduleDoc />
                    <PlannerDoc />
                    <TemplateTableDoc />
                    <TodoListDoc />
                    <DataAnalysisDoc />
                    <ImportExportDoc />
                </div>
                <AboutFooter />
            </main>
        </div>
    );
};

export default AboutMain;
