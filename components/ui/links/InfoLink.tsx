import Link from 'next/link';
import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './InfoLink.module.scss';

interface Props {
    href: string;
    className?: string;
}

const AboutAnalysis: React.FC<Props> = ({ href, className }) => {
    return (
        <Link href={href}>
            <a
                className={`ml-1 lg:ml-3 cursor-pointer ${classes.container} ${
                    className || ''
                }`}
            >
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="max-w-[2rem] max-h-[2rem] text-3xl text-sky-600/80 shadow-sm cursor-pointer transition-all hover:scale-125 hover:text-blue-500"
                />
                <p
                    className={`text-base px-2 py-2 rounded-sm bg-gray-500 text-gray-50 hover:bg-gray-700 shadow-md ${classes.text}`}
                >
                    Learn More
                </p>
            </a>
        </Link>
    );
};

export default AboutAnalysis;
