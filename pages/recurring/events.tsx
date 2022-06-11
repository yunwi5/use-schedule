import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { useQuery, useQueryClient } from 'react-query';
import RecurringEventsMain from '../../components/recurring/RecurringEventsMain';
import { AppProperty } from '../../constants/global-constants';
import { fetchRecurringEvents } from '../../lib/recurring/recurring-event-apis';
import { processRecurringEvents } from '../../utilities/recurring-utils';

interface Props {}

const RecurringEvents: NextPage<Props> = (props) => {
    const queryClient = useQueryClient();
    const { data, isError, error } = useQuery('recurring-events', fetchRecurringEvents);
    if (isError) {
        console.error('Event errors:', error);
    }
    const recurringEvents = data ? processRecurringEvents(data) : [];
    console.log('recurring events:', recurringEvents);

    const invalidateRecEvents = () => queryClient.invalidateQueries('recurring-events');

    // use redux to globally share the recurring events / tasks!
    // instead of passing recurringEvents as props

    return (
        <div>
            <Head>
                <title>Recurring Events | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Weekly task planner for users to manage and allocate their tasks"
                />
            </Head>
            <RecurringEventsMain onInvalidate={invalidateRecEvents} />
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
