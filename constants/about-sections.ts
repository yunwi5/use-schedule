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
    link: '#dashboard',
};

export const RecurringSection = { name: 'Recurring Schedules', link: '#recurring-schedules' };

export const PlannerSection = { name: 'Template tables', link: '#template-tables' };

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
