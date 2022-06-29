interface AboutSection {
    name: string;
    link: string;
}

export const AboutStartSection = { name: 'About', id: 'about-start', link: '#about-start' };

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
    imagePath: '/about-images/dashboard',
};

export const DataAnalysisSection = {
    name: 'Data Analysis',
    id: 'data-analysis',
    link: '#data-analysis',
    videoSrc: '/videos/data-analysis.mp4',
    imagePath: '/about-images/analysis',
};

export const TodoListSection = {
    name: 'Lists',
    id: 'todo-lists',
    link: '#todo-lists',
    videoSrc: '/videos/todo-list.mp4',
    imagePath: '/about-images/todo',
};

export const TemplateSection = {
    name: 'Template tables',
    id: 'template-tables',
    link: '#template-tables',
    videoSrc: '/videos/template-table.mp4',
    imagePath: '/about-images/template',
};

export const PlannerSection = {
    name: 'Task Planners',
    id: 'template-tables',
    link: '#template-tables',
    videoSrc: '/videos/planner.mp4',
    imagePath: '/about-images/planner',
};

export const RecurringSection = {
    name: 'Recurring Schedules',
    id: 'recurring-schedules',
    link: '#recurring-schedules',
    videoSrc: '/videos/recurring-events.mp4',
    imagePath: '/about-images/recurring',
};

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
