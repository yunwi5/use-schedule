import { useMemo } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from '@auth0/nextjs-auth0';

import TaskSearch from '../../components/search/TaskSearchMain';
import { Task } from '../../models/task-models/Task';
import { getTasksFromAllCollection } from '../../db/pages-util';
import { convertToTasks } from '../../utilities/tasks-utils/task-util';
import useTaskQuery from '../../hooks/useTaskQuery';
import { nameFilterCallback } from '../../utilities/filter-utils/string-filter';
import { AppProperty } from '../../constants/global-constants';

interface Props {
    searchedTasks: Task[];
    searchWord: string;
}

const SearchPage: NextPage<Props> = (props) => {
    const { searchedTasks, searchWord } = props;

    const { allTasks: tasks, invalidateAllTasks } = useTaskQuery(searchedTasks);
    const searchFiltered = useMemo(
        () => tasks.filter((task) => nameFilterCallback(task, searchWord)),
        [searchWord, tasks],
    );

    return (
        <>
            <Head>
                <title>Task Search | {AppProperty.APP_NAME}</title>
                <meta name="description" content="User's search result for planner tasks" />
            </Head>
            <TaskSearch
                searchedTasks={searchFiltered}
                searchWord={searchWord}
                onInvalidate={invalidateAllTasks}
            />
        </>
    );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;
    const session = getSession(req, res);
    if (!session || !session.user) {
        return {
            redirect: {
                destination: '/api/auth/login',
                permanent: false,
            },
        };
    }
    const userId = session.user.sub;

    const { q = '' } = query;
    let searchWord = Array.isArray(q) ? q.join('') : q;

    const searchedTaskDocuments = (await getTasksFromAllCollection(userId, searchWord)).reduce(
        (accList, curr) => accList.concat(curr),
        [],
    );
    const searchedTasks = convertToTasks(searchedTaskDocuments);

    return {
        props: {
            searchedTasks,
            searchWord,
        },
    };
};
