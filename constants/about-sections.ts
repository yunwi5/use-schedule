interface AboutSection {
    name: string;
    link: string;
}

// Total 8 sections to instroduce
export const CalendarSection = {
    name: 'Calendar',
    link: '#calendar',
};

export const DashboardSection = {
    name: 'Dashboard',
    id: 'dashboard',
    link: '#dashboard',
    videoSrc: '/videos/dashboard.mp4',
    imagePath: '/about/dashboard',
};

export const RecurringSection = {
    name: 'Recurring Schedules',
    id: 'recurring-schedules',
    link: '#recurring-schedules',
    videoSrc: '/videos/recurring-events-ex.mp4',
    imagePath: '/about/recurring',
};

export const AboutStartSection = { name: 'About', id: 'about-start', link: '#about-start' };

export const PlannerSection = { name: 'Task Planners', link: '#template-tables' };

export const TemplateSection = { name: 'Template tables', link: '#template-tables' };

export const DataAnalysisSection = { name: 'Data Analysis', link: '#data-analysis' };

export const TodoListSection = { name: 'Lists', link: '#todo-lists' };

export const ImportExportSection = {
    name: 'Import & Export Schedules',
    link: '#import-export',
};

export const AboutSectionList: AboutSection[] = [
    CalendarSection,
    DashboardSection,
    RecurringSection,
    PlannerSection,
    TemplateSection,
    DataAnalysisSection,
    TodoListSection,
    ImportExportSection,
];
