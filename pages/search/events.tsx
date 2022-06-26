import { useMemo } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from '@auth0/nextjs-auth0';

import { getEventsFromPage } from '../../db/pages-util';
import { convertToAppObjectList } from '../../utilities/gen-utils/object-util';
import { nameFilterCallback } from '../../utilities/filter-utils/string-filter';
import { IEvent } from '../../models/Event';
import useEventQuery from '../../hooks/useEventQuery';
import EventSearchMain from '../../components/search/EventSearchMain';
import { AppProperty } from '../../constants/global-constants';

interface Props {
    searchedEvents: IEvent[];
    searchWord: string;
}

const SearchPage: NextPage<Props> = (props) => {
    const { searchedEvents, searchWord } = props;

    const { events, invalidateEvents } = useEventQuery(searchedEvents);
    const searchFiltered = useMemo(
        () => events.filter((event) => nameFilterCallback(event, searchWord)),
        [searchWord, events],
    );

    return (
        <>
            <Head>
                <title>Event Search | {AppProperty.APP_NAME}</title>
                <meta name="description" content="User's search result for planner tasks" />
            </Head>
            <EventSearchMain
                searchedEvents={searchFiltered}
                searchWord={searchWord}
                onInvalidate={invalidateEvents}
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

    const searchedEventsDocs = await getEventsFromPage(userId, searchWord);
    const searchedEvents: IEvent[] = convertToAppObjectList(searchedEventsDocs);

    return {
        props: {
            searchedEvents,
            searchWord,
        },
    };
};
