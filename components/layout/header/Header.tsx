import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-duotone-svg-icons';

import HeaderSearch from './HeaderSearch';
import UserPicCircle from '../../ui/user/UserProfileCircle';
import headerClasses from './Header.module.scss';
import layoutClasses from '../Layout.module.scss';
import Image from 'next/image';
import { AppProperty } from '../../../constants/global-constants';

interface Props {
    onToggleSidebar: () => void;
}

const linkClass = 'hover:text-blue-400';

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
    const [showSearch, setShowSearch] = useState(true); // Show or hide full searchbar on the mobile screen
    const { user, isLoading } = useUser();

    const isLoggedIn = user && !isLoading;

    return (
        <header
            className={`text-slate-700 bg-slate-200 ${layoutClasses.header} ${headerClasses.header}`}
        >
            {/* Left Side */}
            <div className={`${headerClasses.heading}`}>
                <FontAwesomeIcon
                    icon={faBars}
                    className="min-w-[1.4rem] max-w-[1.5rem] text-2xl cursor-pointer transition-all hover:scale-110 hover:text-blue-600"
                    onClick={onToggleSidebar}
                />
                <Link href="/">
                    <a
                        className={`text-xl font-semibold ml-6 flex items-center gap-2 ${
                            showSearch ? headerClasses.hide : ''
                        } ${headerClasses['app-name']}`}
                    >
                        <div className={'-translate-y-[2px]'}>
                            <Image src="/logos/logo.png" alt="Logo" width="37" height="37" />
                        </div>
                        {AppProperty.APP_NAME}
                    </a>
                </Link>
                <HeaderSearch onShowSearch={setShowSearch} showSearch={showSearch} />
            </div>

            {/* Right side */}
            <div
                className={`space-x-5 text-lg font-semibold text-slate-700/90 flex items-center`}
            >
                <Link href="/about">
                    <a className={linkClass}>About</a>
                </Link>
                <Link href="/contact">
                    <a className={linkClass}>Contact</a>
                </Link>
                {!isLoggedIn && (
                    <Link href="/api/auth/login">
                        <a className={linkClass}>Login</a>
                    </Link>
                )}

                {!isLoggedIn && (
                    <Link href="/api/auth/login">
                        <a className={linkClass}>Sign Up</a>
                    </Link>
                )}
                {isLoggedIn && (
                    <div className="flex-1 pr-0 sm:pr-1 ml-auto flex justify-end">
                        <UserPicCircle pictureLink={user.picture} name={user.name} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
