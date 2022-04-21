import React from "react";
import HomeFeedback from "./HomeFeedback";
import HomeIntro from "./HomeIntro";

const HomeMain: React.FC = () => {
    return (
        <main className={"bg-slate-50"}>
            <HomeIntro />
            <HomeFeedback />
        </main>
    );
};

export default HomeMain;
