import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/pro-duotone-svg-icons';
import { eventStyles } from './common-styles';
import { IEvent } from '../../../../../models/Event';

interface Props {
    event: IEvent;
}

const MeetingLink: React.FC<Props> = ({ event: { meetingLink } }) => {
    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={faVideo} className={eventStyles.labelIconClass} />
                Meeting Link
            </span>
            <p>
                <a
                    href={meetingLink}
                    className={`text-blue-500 ${eventStyles.linkHoverClass} whitespace-pre-line`}
                >
                    {meetingLink || '-'}
                </a>
            </p>
        </div>
    );
};

export default MeetingLink;
