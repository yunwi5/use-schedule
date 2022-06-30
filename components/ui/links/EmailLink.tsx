import React from 'react';
import classes from './EmailLink.module.scss';

interface Props {
    userName: string;
    email: string;
    subject?: string;
    body?: string;
    putComma?: boolean;
}

const EmailLink: React.FC<Props> = (props) => {
    const { userName, email, subject, body, putComma } = props;
    const emailLink = `mailto:${email}?subject=${subject || ''}&body=${`${body || ''}`}`;

    const linkHoverClass = 'hover:underline-offset-2 hover:underline';

    return (
        <span className={classes.email}>
            <a href={emailLink} className={`text-blue-500 ${linkHoverClass}`}>
                {userName}
                {putComma && <>&#44;</>}
            </a>
            <span className={classes.popup}>
                <a href={emailLink} className={linkHoverClass}>
                    {email}
                </a>
            </span>
        </span>
    );
};

export default EmailLink;
