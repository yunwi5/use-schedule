import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-duotone-svg-icons';

interface Props {
    pictureLink: string | null | undefined;
    userName: string | null | undefined;
}

function isProfilePicture(picLink: string | null | undefined) {
    // If it is an avadar picture that displays random number, do not display it.
    if (!picLink || picLink.includes('gravatar.com/avatar')) return false;
    return true;
}

const UserPicCircle: React.FC<Props> = ({ pictureLink, userName }) => {
    const pictureDisplayable = isProfilePicture(pictureLink);

    return (
        <div
            className={`w-[2.3rem] h-[2.3rem] flex justify-center items-center text-lg rounded-full border-2 ${
                pictureDisplayable ? 'border-none' : 'border-slate-400'
            } bg-slate-700 text-slate-50 overflow-hidden`}
        >
            {pictureDisplayable && pictureLink && (
                // Got error with next/image (external link not allowed)
                <Image src={pictureLink} alt="" width="100%" height="100%" objectFit="cover" />
            )}
            {!pictureDisplayable && (
                <div className="tracking-wider">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </div>
    );
};

export default UserPicCircle;
