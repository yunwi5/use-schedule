import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import HomeMain from "../components/home-parts/HomeMain";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Task Manager Home Page</title>
                <meta name="description" content="Home page of Task Manager app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeMain />
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

export default Home;
