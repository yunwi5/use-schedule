import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';

import { AppProperty } from '../constants/global-constants';
import OfflineFallback from '../components/OfflineFallback';

const Fallback: NextPage = () => {
    const router = useRouter();

    const reloadPage = () => {
        router.push('/');
    };

    return (
        <div className={'h-full'}>
            <Head>
                <title>Offline | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="UseSchedule application for managing personal schedules"
                />
            </Head>
            <OfflineFallback onReload={reloadPage} />
        </div>
    );
};

export default Fallback;
