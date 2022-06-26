import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import HomeMain from '../components/home/HomeMain';
import { AppProperty } from '../constants/global-constants';

const Home: NextPage = () => {
    const testDocument = () => {
        const elem = document.getElementById('test-doc');
        console.log(elem);
    };

    return (
        <>
            <Head>
                <title>Home | {AppProperty.APP_NAME}</title>
                <meta name="description" content={`Home page of ${AppProperty.APP_NAME}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeMain />
            <div id="test-doc"></div>
        </>
    );
};

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {},
    };
};

export default Home;
