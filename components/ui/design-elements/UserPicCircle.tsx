import React from "react";
import Image from "next/image";
import { getNameInitial } from "../../../utilities/gen-utils/string-util";

interface Props {
    pictureLink: string | null | undefined;
    userName: string | null | undefined;
}

function isProfilePicture(picLink: string | null | undefined) {
    // If it is an avadar picture that displays random number, do not display it.
    if (!picLink || picLink.includes("gravatar.com/avatar")) return false;
    return true;
}

const UserPicCircle: React.FC<Props> = ({ pictureLink, userName }) => {
    console.log("piclink:", pictureLink);
    const pictureDisplayable = isProfilePicture(pictureLink);
    const userInitial = getNameInitial("Yun Jo");

    return (
        <div
            className={`w-[2.3rem] h-[2.3rem] flex justify-center items-center text-lg rounded-full border-2 ${
                pictureDisplayable ? "border-none" : "border-slate-400"
            } bg-slate-700 text-slate-50 overflow-hidden`}
        >
            {pictureDisplayable && pictureLink && (
                // Got error with next/image (external link not allowed)
                <img src={pictureLink} alt={userName || "User"} className="object-cover" />
            )}
            {!pictureDisplayable && <div className="tracking-wider">{userInitial}</div>}
        </div>
    );
};

export default UserPicCircle;
