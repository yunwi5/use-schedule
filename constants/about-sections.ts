interface AboutSection {
    name: string;
    id: string;
    link: string;
    videoSrc: string; // path to video mp4 file
    imagePath: string; // path to directory as each section has more than 1 images
}

export const AboutStartSection = { name: 'About', id: 'about-start', link: '#about-start' };

// Total 8 sections to instroduce
export const CalendarSection = {
    name: 'Calendar',
    id: 'calendar',
    link: '#calendar',
    videoSrc: '/videos/calendar.mp4',
    imagePath: '/about-images/calendar',
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
    id: 'planner',
    link: '#planner',
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
    name: 'Import & Export',
    id: 'import-export',
    link: '#import-export',
    videoSrc: '/videos/ical-import.mp4',
    imagePath: '/about-images/import-export',
};

export const AboutSectionList: AboutSection[] = [
    CalendarSection,
    DashboardSection,
    RecurringSection,
    PlannerSection,
    TemplateSection,
    TodoListSection,
    DataAnalysisSection,
    ImportExportSection,
];
