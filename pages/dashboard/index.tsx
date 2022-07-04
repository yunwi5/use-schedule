import { NextPage } from 'next';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';

import DashboardMain from '../../components/dashboard/DashboardMain';
import { DashboardContextProvider } from '../../store/context/dashboard-context';
import { getLoginLink } from '../../utilities/link-utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
    // initialTasks: Task[];
    // initialEvents: IEvent[];
}

const DashboardPage: NextPage<Props> = (props) => {
    const user = useUser().user?.sub;
    const router = useRouter();
    console.log('user:', user);

    useEffect(() => {
        if (!user) {
            router.replace(getLoginLink());
        }
    }, [user, router]);

    return (
        <div>
            <Head>
                <title>User Dashboard | UseSchedule</title>
                <meta
                    name="description"
                    content="Dashboard that summarizes user schedules with charts and tables"
                />
            </Head>
            <DashboardContextProvider>
                <DashboardMain />
            </DashboardContextProvider>
        </div>
    );
};

// export const getStaticProps: GetStaticProps = () => {

// }

// export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
//     async getServerSideProps(context) {
//         // const { req, res } = context;
//         // const session = getSession(req, res);
//         // const userId = session?.user.sub;

//         // const allTasksPromise = getTasksFromAllCollection(userId);
//         // const eventsPromise = getEventsFromPage(userId);

//         // // Need to convert to App style object (i.e. id instead of _id)
//         // const [[wTaskDocs, mTaskDocs, yTaskDocs], eventsData] = await Promise.all([
//         //     allTasksPromise,
//         //     eventsPromise,
//         // ]);
//         // const allTasks = [...wTaskDocs, ...mTaskDocs, ...yTaskDocs];

//         return {
//             props: {
//                 // initialAllTasks: convertToTasks(allTasks),
//                 // initialEvents: convertToAppObjectList(eventsData),
//             },
//         };
//     },
// });

export default DashboardPage;
