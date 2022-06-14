import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { useQuery, useQueryClient } from 'react-query';
import RecurringMain from '../../components/recurring/RecurringMain';
import { useEffect } from 'react';
import { recurringActions } from '../../store/redux/recurring-slice';
import { RecurringItemMode } from '../../models/recurring-models';
import { useAppDispatch } from '../../store/redux';
import { AppProperty } from '../../constants/global-constants';

interface Props {}

const RecurringTasks: NextPage<Props> = (props) => {
    const dispatch = useAppDispatch();

    const invalidateRecTasks = () => {};

    // use redux to globally share the recurring events / tasks!
    // instead of passing recurringEvents as props
    useEffect(() => {
        dispatch(recurringActions.setMode(RecurringItemMode.TASK));
    }, [dispatch]);

    return (
        <div>
            <Head>
                <title>Recurring Tasks | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Weekly task planner for users to manage and allocate their tasks"
                />
            </Head>
            <RecurringMain onInvalidate={invalidateRecTasks} items={[]} />
        </div>
    );
};

export default RecurringTasks;

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
