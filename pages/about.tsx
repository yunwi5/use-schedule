import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>About Task Manager</title>
                <meta
                    name="description"
                    content="About page of Task Manager app that describes details of the functionalities of the app such as Planner, Templates, Custom List, Searching, Calendar, Data Analysis and Dashboard."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1 className="text-4xl text-center">About Page</h1>
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

export default About;
