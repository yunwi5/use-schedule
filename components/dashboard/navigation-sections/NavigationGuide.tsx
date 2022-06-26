import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComputerMouse,
    faEnvelopes,
    faMessageQuote,
} from '@fortawesome/pro-duotone-svg-icons';

import { getAboutLink, getContactLink } from '../../../utilities/link-utils';
import TableCard from '../cards/TableCard';

const guidances = [
    {
        suggestionText: 'Want to learn more about how to use these features & services?',
        linkText: "Let's go!",
        link: getAboutLink(),
        icon: faComputerMouse,
    },
    {
        suggestionText: 'Want to contact us for reporting bugs or suggesting improvements?',
        linkText: 'Contact Us!',
        link: getContactLink(),
        icon: faEnvelopes,
    },
];

const NavigationGuide: React.FC = () => {
    return (
        <TableCard className={`flex-1 sm:px-1 px-3 py-2 text-lg`}>
            <h3 className={`pl-2 text-2xl mb-1`}>Guidance & Recommendation</h3>
            <div className={`text-slate-700/90`}>
                {guidances.map((guide, idx) => (
                    <div key={idx} className={`flex flex-col gap-1 p-2`}>
                        <p className={`font-semibold`}>
                            <span className={`font-serif text-xl font-bold text-slate-500/90`}>
                                Q
                            </span>
                            &ensp;
                            {guide.suggestionText}
                        </p>
                        <Link href={guide.link}>
                            <a
                                className={`ml-6 w-fit inline-block text-sky-600/90 hover:text-blue-700 underline-from-start`}
                            >
                                <FontAwesomeIcon icon={guide.icon} className={`icon-medium`} />{' '}
                                {guide.linkText}
                            </a>
                        </Link>
                    </div>
                ))}
                <p className={`px-2 sm:flex sm:gap-1 sm:items-baseline`}>
                    <FontAwesomeIcon
                        icon={faMessageQuote}
                        className={`icon-medium mr-1 translate-y-1 text-xl`}
                    />{' '}
                    <span>
                        Our goal is to provide the best user experience for you so that you
                        find this app useful!
                    </span>
                </p>
            </div>
        </TableCard>
    );
};

export default React.memo(NavigationGuide);
