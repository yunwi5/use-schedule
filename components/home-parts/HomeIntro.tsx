import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Size, Theme } from "../../models/design-models";
import Button from "../ui/Button";
import { getHomeImagePath } from "./helper";
import classes from "./Home.module.scss";

const HomeIntro: React.FC = () => {
    const router = useRouter();

    const appName = process.env.APP_NAME;
    return (
        <section
            className={`h-full min-h-[90wh] w-[100%] bg-slate-500 flex items-center justify-center ${classes.intro}`}
        >
            {/* Next Image is not loading. Why is it happening? */}
            <Image
                src="/home-images/blue-table.jpg"
                alt=""
                layout="responsive"
                width="100"
                height="100"
                quality={100}
                className={classes["background"]}
            />
            <img
                src="/home-images/blue-table.jpg"
                alt="Home background"
                width="100"
                height="100"
                className={classes["background"]}
            />
            <div className={`z-2 flex flex-col gap-9 px-5 ${classes.content}`}>
                <h1
                    className={`text-slate-50 leading-tight text-[3.1rem] md:text-[3.7rem] text-center`}
                >
                    Welcome to {appName}
                </h1>
                <p className={`text-yellow-50 brightness-110 text-xl max-w-[40rem]`}>
                    <span>
                        The only applicaiton you need to organize your daily life in the most
                        efficient and organized way.
                    </span>{" "}
                    <span className={`block mt-3 md:inline`}>
                        We have various functionalities including templates, calendar, and data
                        analysis that can boost your life.
                    </span>
                </p>
                <div className={`mt-4 flex-col sm:flex-row flex gap-5 items-center justify-center`}>
                    <Button
                        onClick={() => router.push("/about")}
                        theme={Theme.SECONDARY}
                        size={Size.MEDIUM_LARGE}
                        className={`!rounded-full w-[12rem] hover:shadow-md hover:shadow-yellow-100`}
                    >
                        About Services
                    </Button>
                    <Button
                        onClick={() => router.push("/templates/new")}
                        theme={Theme.TERTIARY}
                        size={Size.MEDIUM_LARGE}
                        className={`!rounded-full w-[12rem] hover:shadow-md hover:shadow-yellow-100`}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HomeIntro;
