import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { getTasksFromAllCollection, getEventsFromPage } from '../../../db/pages-util';
import { Task } from '../../../models/task-models/Task';
import { convertToAppObjectList } from '../../../utilities/gen-utils/object-util';
import {
    getCurrentMonthBeginning,
    getMonthBeginning,
} from '../../../utilities/date-utils/date-get';
import MontlyAnalysis from '../../../components/analysis/analysis-main/MontlyAnalysis';
import { IEvent } from '../../../models/Event';
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

    // make sure it is always beginning of month, not just random day
    const beginningDate = initialStartDate.trim()
        ? getMonthBeginning(new Date(initialStartDate))
        : getCurrentMonthBeginning();

    const { allTasks } = useTaskQuery(initialAllTasks);
    const { events } = useEventQuery(initialEvents);

    return (
        <div>
            <Head>
                <title>Montly Data Analysis | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Analyze user's montly task data with data visualization methods specifically charts. Use line chart to represent user task trend, pie/doughnut chart to represent task data in a specific period"
                />
            </Head>
            <MontlyAnalysis tasks={allTasks} events={events} beginningDate={beginningDate} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
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
            : start_date || getCurrentMonthBeginning().toDateString();
        const allTasksPromise = getTasksFromAllCollection(userId);
        const eventsPromise = getEventsFromPage(userId);

        // Need to convert to App style object (i.e. id instead of _id)
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
    },
});

export default WeeklyAnalysisPage;
