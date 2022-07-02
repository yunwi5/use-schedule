import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import HomeMain from '../components/home/HomeMain';
import { AppProperty } from '../constants/global-constants';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Home | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`${AppProperty.APP_NAME} application to manage personal or business schedules. Use dashboard and data analysis to examine your schedule patterns. Use recurring schedules and template tables to minimize repetitive work.`}
                />
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
