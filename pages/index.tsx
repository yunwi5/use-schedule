import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import HomeMain from '../components/home/HomeMain';
import { AppProperty } from '../constants/global-constants';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Home | {AppProperty.APP_NAME}</title>
                <meta name="description" content={`Home page of ${AppProperty.APP_NAME}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeMain />
        </>
    );
};

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {},
    };
};

export default Home;
