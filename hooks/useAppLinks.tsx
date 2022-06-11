import { Template } from '../models/template-models/Template';
import { useAppSelector } from '../store/redux';
import { getShortNameWithRest } from '../utilities/gen-utils/string-util';

const useAppLinks = () => {
    const templates = useAppSelector((state) => state.template.templates) || [];
    const userTemplateItems = templates.map((tem: Template) => ({
        name: getShortNameWithRest(tem.name, 15),
        link: `/templates/${tem.id}`,
    }));

    const todoLists = useAppSelector((state) => state.todoList.lists) || [];
    const userTodoLists = todoLists.map((list) => ({
        name: getShortNameWithRest(list.name, 15),
        link: `/todos/${list.id}`,
    }));

    const calendarLink = { name: 'Calendar', link: '/calendar' };

    const dashboardLink = { name: 'Dashboard', link: '/dashboard' };

    const recurringScheduleLinks = [
        { name: 'Recurring Events', link: '/recurring/events' },
        { name: 'Recurring Tasks', link: '/recurring/tasks' },
    ];

    const plannerLinks = [
        {
            name: 'Weekly Planner',
            link: '/task-planner/weekly-planner',
        },
        {
            name: 'Monthly Planner',
            link: '/task-planner/monthly-planner',
        },
        {
            name: 'Yearly Planner',
            link: '/task-planner/yearly-planner',
        },
    ];
    const templateLinks = [
        ...userTemplateItems,
        {
            name: '+ Add New',
            link: '/templates/new',
        },
    ];
    const dataAnalysisLinks = [
        {
            name: 'Weekly Analysis',
            link: '/task-planner/weekly-planner/analysis',
        },
        {
            name: 'Monthly Analysis',
            link: '/task-planner/monthly-planner/analysis',
        },
        {
            name: 'Yearly Analysis',
            link: '/task-planner/yearly-planner/analysis',
        },
    ];

    // Need to fetch some existing custom lists for the user.
    const todoLinks = [...userTodoLists, { name: '+ New List', link: '/todos/new' }];

    return {
        calendarLink,
        dashboardLink,
        recurringScheduleLinks,
        dataAnalysisLinks,
        plannerLinks,
        templateLinks,
        todoLinks,
    };
};

export default useAppLinks;
