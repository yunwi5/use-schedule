import { faBinoculars } from "@fortawesome/pro-duotone-svg-icons";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Size, Theme } from "../../../models/design-models";
import Button from "../../ui/Button";
import classes from "../Home.module.scss";

interface Props {
    name: string;
    mainImg: string;
    headingLabel: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    btnLink: string;

    isEven: boolean;
}

const ImgElement: React.FC<{ mainImg: string; className: string }> = ({ mainImg, className }) => {
    return (
        <div className={`${classes["img-container"]} ${className}`}>
            <div className={`${classes["img-main"]}`}>
                <Image
                    src={mainImg}
                    alt={"Planner"}
                    width="100"
                    height="100"
                    layout="responsive"
                    className={`${classes["feature-img"]}`}
                />
            </div>
        </div>
    );
};

const PlannerFeature: React.FC<Props> = (props) => {
    const { name, mainImg, headingLabel, heading, paragraph1, paragraph2, btnLink, isEven } = props;
    const router = useRouter();

    const textHighlight = isEven ? "text-sky-500" : "text-blue-500";

    return (
        <article
            className={`flex gap-2 items-center pb-6 border-b-2 border-slate-300 ${
                classes.feature
            } ${isEven ? "" : classes["feature-reverse"]} ${classes[`feature-${name}`]}`}
        >
            <ImgElement mainImg={mainImg} className={classes["img-container-horizontal"]} />
            <div className={`px-6 py-2 flex flex-col gap-6 ${classes.content}`}>
                <div>
                    <span className={`text-lg uppercase ${textHighlight}`}>{headingLabel}</span>
                    <h2 className={`my-2 capitalize italic ${classes["sub-heading"]}`}>
                        {heading}
                    </h2>
                </div>
                <ImgElement mainImg={mainImg} className={classes["img-container-vertical"]} />
                <div className="max-w-[46rem] flex flex-col gap-2">
                    <p>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={`mr-2 inline ${textHighlight} text-lg max-w-[1.2rem]`}
                        />
                        {paragraph1}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={`mr-2 inline ${textHighlight} text-lg max-w-[1.2rem]`}
                        />
                        {paragraph2}
                    </p>
                </div>
                <div>
                    <Button
                        theme={isEven ? Theme.SECONDARY : Theme.TERTIARY}
                        size={Size.MEDIUM}
                        onClick={() => router.push(btnLink)}
                        className={"!min-w-[10rem]"}
                    >
                        <FontAwesomeIcon
                            icon={faBinoculars}
                            className={`mr-2 inline text-lg max-w-[1.2rem]`}
                        />
                        Go Explore
                    </Button>
                </div>
            </div>
        </article>
    );
};

export default PlannerFeature;
