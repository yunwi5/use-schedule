import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import useEventQuery from '../hooks/useEventQuery';
import useTaskQuery from '../hooks/useTaskQuery';
import useTodoQuery from '../hooks/useTodoQuery';
import { AppProperty } from '../constants/global-constants';
import { useMemo } from 'react';
import { CalendarItem } from '../models/calendar-models/CalendarItem';
import { isCurrentDate } from '../utilities/date-utils/date-check';
import TodaySchedule from '../components/today-schedule/TodaySchedule';

const TodaySchedulePage: NextPage = () => {
    const { events, invalidateEvents, isLoading: eventLoading } = useEventQuery();
    const {
        allTasks: tasks,
        invalidateAllTasks: invalidateTasks,
        isLoading: taskLoading,
    } = useTaskQuery();
    const { todos, invalidateTodos, isLoading: todoLoading } = useTodoQuery();

    // today's calendar items
    const calendarItems = useMemo(() => {
        const items: CalendarItem[] = [...events, ...tasks, ...todos];
        return items.filter((item) => item.dateTime && isCurrentDate(item.dateTime));
    }, [events, tasks, todos]);

    const invalidateAll = () => {
        invalidateTasks();
        invalidateEvents();
        invalidateTodos();
    };

    const isLoading = taskLoading || eventLoading || todoLoading;

    return (
        <div>
            <Head>
                <title>Today Schedule | {AppProperty.APP_NAME}</title>
                <meta name="description" content="Today's schedules of the user" />
            </Head>
            <TodaySchedule
                items={calendarItems}
                onInvalidate={invalidateAll}
                isLoading={isLoading}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res } = context;
        const session = getSession(req, res);

        if (!session) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        // Get all tasks and todos of the user
        const userId: string = session.user.sub;
        if (!userId) {
            return {
                notFound: true,
                redirect: { destination: '/login', permanent: false },
            };
        }

        return {
            props: {},
        };
    },
});

export default TodaySchedulePage;
