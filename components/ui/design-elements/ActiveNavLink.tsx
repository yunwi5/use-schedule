import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';

interface Props {
    href: string;
    className: string;
    activeClassName?: string;
    onNavigate?: () => void;
}

function isActiveLink(router: NextRouter, hrefLink: string): boolean {
    let routerLink = router.asPath;
    const qPos = routerLink.indexOf('?'); // first appearance of query string
    if (qPos >= 0) {
        routerLink = routerLink.slice(0, qPos);
    }
    return routerLink === hrefLink;
}

const ActiveNavLink: React.FC<Props> = (props) => {
    const { href, className, activeClassName, onNavigate, children } = props;
    const router = useRouter();

    return (
        <Link href={href}>
            <a
                onClick={onNavigate}
                className={`${className} ${isActiveLink(router, href) ? activeClassName : ''}`}
            >
                {children}
            </a>
        </Link>
    );
};

export default ActiveNavLink;
