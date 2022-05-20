import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { GITHUB_LINK, FACEBOOK_LINK, LINKEDIN_LINK } from "../constants";
import classes from "./Footer.module.scss";

const Footer: React.FC<{ className: string }> = ({ className }) => {
    const iconClass =
        "transition-all cursor-pointer hover:text-blue-700 hover:scale-110 max-w-[2.2rem]";
    const iconLabelClass =
        "px-[6px] py-[2px] text-base bg-blue-100 hover:bg-blue-200 hover:text-blue-700 hover:underline hover:cursor-pointer hover:underline-offset-2 shadow-md rounded-xl text-slate-500";

    const brandLinks = [
        { label: "Github!", link: GITHUB_LINK, icon: faGithub },
        { label: "Facebook!", link: FACEBOOK_LINK, icon: faFacebook },
        { label: "LinkedIn!", link: LINKEDIN_LINK, icon: faLinkedin },
    ];

    return (
        <footer
            className={`w-full flex-col gap-3 md:flex-row flex justify-between items-center md:items-start md:px-4 lg:px-8 pt-4 border-t-2 border-slate-300 ${className}`}
        >
            <p>&copy; 2022 JYK Inc. All rights reserved.</p>
            <div className="flex text-[2.6rem] text-slate-700">
                {brandLinks.map((brand) => (
                    <div
                        key={brand.label}
                        className={`flex-col gap-1 flex justify-center ${classes["icon-wrapper"]}`}
                    >
                        <a href={brand.link} className="flex justify-center items-center">
                            <FontAwesomeIcon icon={brand.icon as any} className={iconClass} />
                        </a>
                        <a href={brand.link} className={`${iconLabelClass} block ${classes.label}`}>
                            {brand.label}
                        </a>
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default memo(Footer);
