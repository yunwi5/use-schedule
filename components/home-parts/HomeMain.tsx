import React from "react";
import Features from "./feature-parts/Features";
import HomeFeedback from "./HomeFeedback";
import HomeIntro from "./HomeIntro";

const HomeMain: React.FC = () => {
    return (
        <main className={"bg-slate-100 h-[100%]"}>
            <HomeIntro />
            <Features />
            <HomeFeedback />
        </main>
    );
};

export default HomeMain;
