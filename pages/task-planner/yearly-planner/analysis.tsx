import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from '@auth0/nextjs-auth0';

import { getTasksFromAllCollection, getEventsFromPage } from '../../../db/pages-util';
import { Task } from '../../../models/task-models/Task';
import { convertToTasks } from '../../../utilities/tasks-utils/task-util';
import { convertToAppObjectList } from '../../../utilities/gen-utils/object-util';
import { getCurrentYearBeginning, getYearBeginning } from '../../../utilities/date-utils/date-get';
import { IEvent } from '../../../models/Event';
import YearlyAnalysis from '../../../components/analysis/analysis-main/YearlyAnalysis';
import useEventQuery from '../../../hooks/useEventQuery';
import useTaskQuery from '../../../hooks/useTaskQuery';
import { AppProperty } from '../../../constants/global-constants';

interface Props {
    initialAllTasks: Task[];
    initialEvents: IEvent[];
    initialStartDate: string;
}

const WeeklyAnalysisPage: NextPage<Props> = (props) => {
    const { initialAllTasks, initialEvents, initialStartDate } = props;

    // make sure it is always beginning of week, not just random day
    const beginningDate = initialStartDate.trim()
        ? getYearBeginning(new Date(initialStartDate))
        : getCurrentYearBeginning();

    const { allTasks } = useTaskQuery(initialAllTasks);
    const { events } = useEventQuery(initialEvents);

    return (
        <div>
            <Head>
                <title>Yearly Data Analysis | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Analyze user's yearly task data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            <YearlyAnalysis tasks={allTasks} events={events} beginningDate={beginningDate} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;
    const session = getSession(req, res);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    const userId = session.user.sub;

    const { start_date } = query;
    const startDate: string = Array.isArray(start_date)
        ? start_date.join(' ')
        : start_date || getCurrentYearBeginning().toDateString();
    const allTasksPromise = getTasksFromAllCollection(userId);
    const eventsPromise = getEventsFromPage(userId);

    const [[wTaskData, mTaskData, yTaskData], eventsData] = await Promise.all([
        allTasksPromise,
        eventsPromise,
    ]);
    const allTaskData = [...wTaskData, ...mTaskData, ...yTaskData];

    return {
        props: {
            initialAllTasks: convertToAppObjectList(allTaskData),
            initialEvents: convertToAppObjectList(eventsData),
            initialStartDate: startDate,
        },
    };
};

export default WeeklyAnalysisPage;
