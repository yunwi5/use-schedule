import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useQuery, useQueryClient } from 'react-query';

import RecurringMain from '../../components/recurring/RecurringMain';
import { AppProperty } from '../../constants/global-constants';
import { fetchRecurringEvents } from '../../lib/recurring/recurring-event-apis';
import { processRecurringEvents } from '../../utilities/recurring-utils';
import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';
import { useAppDispatch } from '../../store/redux';
import { recurringActions } from '../../store/redux/recurring-slice';
import { RecurringItemMode } from '../../models/recurring-models';

interface Props {}

const RecurringEvents: NextPage<Props> = (props) => {
    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();
    const { data, isError, error } = useQuery('recurring-events', fetchRecurringEvents);
    if (isError) {
        console.error('Event errors:', error);
    }
    const recurringEvents: RecurringEvent[] = useMemo(
        () => (data ? processRecurringEvents(data) : []),
        [data],
    );

    const invalidateRecEvents = () => queryClient.invalidateQueries('recurring-events');

    // use redux to globally share the recurring events / tasks!
    // instead of passing recurringEvents as props
    useEffect(() => {
        dispatch(recurringActions.setMode(RecurringItemMode.EVENT));
    }, [dispatch]);

    return (
        <div>
            <Head>
                <title>Recurring Events | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Weekly task planner for users to manage and allocate their tasks"
                />
            </Head>
            <RecurringMain onInvalidate={invalidateRecEvents} items={recurringEvents} />
        </div>
    );
};

export default RecurringEvents;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res } = context;
        const session = getSession(req, res);
        if (!session)
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };

        return {
            props: {},
        };
    },
});
