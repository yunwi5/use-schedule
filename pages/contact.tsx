import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
    return (
        <>
            <Head>
                <title>Contact Task Manager Developer</title>
                <meta
                    name="description"
                    content="User contact page to send feedback or messages to the app developer. User can write form to send messages, and user messages are displayed down the form."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1 className="text-4xl text-center">Contact Page</h1>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {
            message: "Hello World",
        },
    };
};

export default Contact;
