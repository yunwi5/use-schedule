import React from "react";

import { getAppImagePath } from "../helper";
import PlannerFeature from "./Feature";
import classes from "../Home.module.scss";

const Features: React.FC = () => {
    const featuresList = [plannerFeature, tmeplateFeature, customListFeature];

    return (
        <section className={`mt-6 p-6 text-slate-600 ${classes.features}`}>
            <h1 className={classes.heading}>Features We Have</h1>
            <div className="flex flex-col gap-16">
                {featuresList.map((feature, idx) => {
                    return <PlannerFeature key={idx} {...feature} isEven={idx % 2 == 0} />;
                })}
            </div>
        </section>
    );
};

const plannerFeature = {
    name: "planner",
    mainImg: getAppImagePath("planner2-ex.jpg"),
    headingLabel: "Periodic planners",
    heading: "Complete schedular that makes your life compact",
    paragraph1:
        "We have 3 kinds of planners, weekly planner, montly planner and yearly planner that can suit your custom needs.",
    paragraph2:
        "You can also see the details of every task you created. Each task can have its sub tasks, if your task is too large and has some sub parts.",
    btnLink: "/task-planner/weekly-planner",
};

const tmeplateFeature = {
    name: "template",
    mainImg: getAppImagePath("template-ex.jpg"),
    headingLabel: "Time table template",
    heading: "Life booster that can speed your scheduling process",
    paragraph1:
        "Are you constantly annoyed by adding repetitive tasks to every single week when you schedule?",
    paragraph2:
        "If then, this functionality is for you! You can build your own table, and then appli whenever week you want, by simply importing it! It only takes 5 seconds.",
    btnLink: "/templates/new",
};

const customListFeature = {
    name: "custom-list",
    mainImg: getAppImagePath("custom-list-ex.jpg"),
    headingLabel: "Custom Todo List",
    heading: "Custom thematic todo list highly specific to your needs",
    paragraph1:
        "You can group tasks that are specific to certain subject or topic into one list that you define.",
    paragraph2:
        "You define it and you style it. We provide 12+ custom themes that you can apply to decorate your custom list!",
    btnLink: "/todos/new",
};

export default Features;
