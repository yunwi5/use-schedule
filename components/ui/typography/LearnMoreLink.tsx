import Link from 'next/link';
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './LearnMoreLink.module.scss';

interface Props {
    href: string;
    className?: string;
}

const LearnMoreLink: React.FC<Props> = ({ children, href, className }) => {
    return (
        <Link href={href}>
            <a className={`mt-2 underline-from-middle ${classes.link} ${className || ''}`}>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={`text-blue-500 mr-2 scale-110`}
                />
                {children}
            </a>
        </Link>
    );
};

export default LearnMoreLink;
