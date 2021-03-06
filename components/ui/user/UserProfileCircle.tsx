import React, { useState } from 'react';
import Image from 'next/image';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-duotone-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';

import UserDropDown from './UserDropdown';
import { isValidEmail } from '../../../utilities/form-utils/validation-util';

interface Props {
    pictureLink: string | null | undefined;
    name: string | null | undefined;
}

function isProfilePicture(picLink: string | null | undefined) {
    // If it is an avadar picture that displays random number, do not display it.
    if (!picLink || picLink.includes('gravatar.com/avatar')) return false;
    return true;
}

const UserPicCircle: React.FC<Props> = ({ pictureLink, name }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const pictureDisplayable = isProfilePicture(pictureLink);

    // username can be the same as email if the user used local authentication
    // in that case, do not display the email.
    const displayName = name && !isValidEmail(name);

    return (
        <ClickAwayListener onClickAway={() => setShowDropDown(false)}>
            <div
                className={
                    'relative cursor-pointer flex gap-1 items-center py-[.25rem] px-3 rounded-sm hover:bg-gray-300'
                }
                onClick={() => setShowDropDown((ps) => !ps)}
            >
                <div
                    className={`w-[2.3rem] h-[2.3rem] flex justify-center items-center text-lg rounded-full border-2 ${
                        pictureDisplayable ? 'border-none' : 'border-slate-400'
                    } bg-slate-700 text-slate-50 overflow-hidden`}
                >
                    {pictureDisplayable && pictureLink && (
                        // Got error with next/image (external link not allowed)
                        <Image
                            src={pictureLink}
                            alt=""
                            width="100%"
                            height="100%"
                            objectFit="cover"
                        />
                    )}
                    {!pictureDisplayable && (
                        <div className="tracking-wider">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    )}
                </div>
                {displayName && (
                    <p className="w-max text-base text-gray-700 whitespace-nowrap px-1">
                        {name}
                    </p>
                )}
                <FontAwesomeIcon icon={faCaretDown} className={''} />
                {showDropDown && <UserDropDown />}
            </div>
        </ClickAwayListener>
    );
};

export default UserPicCircle;
