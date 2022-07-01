import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';

import { AppProperty } from '../constants/global-constants';
import { faArrowsRotate, faSnooze } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomMUIButton from '../components/ui/buttons/CustomMUIButton';

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

interface Props {
    onReload(): void;
}

const OfflineFallback: React.FC<Props> = ({ onReload }) => {
    return (
        <div className="min-h-[90vh] px-6 md:px-10 lg:px-16 py-10 flex flex-col justify-center items-center gap-7 text-slate-600">
            <h2 className={'text-3xl'}>
                <FontAwesomeIcon icon={faSnooze} className={'mr-2'} />
                You are currently offline...
            </h2>
            <h4 className={'mt-6 text-lg md:text-xl max-w-[50rem] text-center'}>
                Our scheduling services primarily based on online connection. So please
                makesure to connect to the internet to fully enjoy our services!
            </h4>
            <CustomMUIButton className={'mt-6 !px-8'} size="large" onClick={onReload}>
                <FontAwesomeIcon icon={faArrowsRotate} className={'mr-2'} /> Try reload
            </CustomMUIButton>
        </div>
    );
};

export default Fallback;
