import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { useQuery, useQueryClient } from 'react-query';
import RecurringEventsMain from '../../components/recurring/RecurringEventsMain';

interface Props {}

const RecurringEvents: NextPage<Props> = (props) => {
    return (
        <div>
            <Head>
                <title>Weekly Task Planner</title>
                <meta
                    name="description"
                    content="Weekly task planner for users to manage and allocate their tasks"
                />
            </Head>
            <RecurringEventsMain />
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
