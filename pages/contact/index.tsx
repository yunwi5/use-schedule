import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import ContactMain from '../../components/contact/ContactMain';
import { AppProperty } from '../../constants/global-constants';

const Contact: NextPage = () => {
    return (
        <>
            <Head>
                <title>Contact Developer | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="User contact page to send feedback or messages to the app developer. User can write form to send messages, and user messages are displayed down the form."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <ContactMain />
            </div>
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

export default Contact;
