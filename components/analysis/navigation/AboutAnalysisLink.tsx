import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { DataAnalysisSection } from '../../../constants/about-sections';
import { getAboutLink } from '../../../utilities/link-utils';
import classes from './AboutAnalysisLink.module.scss';

const AboutAnalysis = () => {
    return (
        <Link href={getAboutLink(DataAnalysisSection.link)}>
            <a className={`ml-1 lg:ml-3 cursor-pointer ${classes.container}`}>
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="max-w-[2rem] max-h-[2rem] text-3xl text-sky-600/80 shadow-sm cursor-pointer transition-all hover:scale-125 hover:text-blue-500"
                />
                <p
                    className={`text-base px-2 py-2 rounded-sm bg-gray-500 text-gray-50 hover:bg-gray-700 shadow-md ${classes.text}`}
                >
                    See More
                </p>
            </a>
        </Link>
    );
};

export default AboutAnalysis;
