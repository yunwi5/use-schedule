import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import AboutMain from '../components/about/AboutMain';
import { AppProperty } from '../constants/global-constants';

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>About Services | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Documentation of ${AppProperty.APP_NAME} services that that provide various planning functionalities of the app such as Planner, Templates, Custom List, Searching, Calendar, Data Analysis and Dashboard.`}
                />
            </Head>
            <AboutMain />
        </>
    );
};

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {
            message: 'Hello World',
        },
    };
};

export default About;
