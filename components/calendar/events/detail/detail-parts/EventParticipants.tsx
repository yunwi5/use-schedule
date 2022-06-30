import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/pro-duotone-svg-icons';

import EmailLink from '../../../../ui/links/EmailLink';
import { IEvent } from '../../../../../models/Event';
import { eventStyles } from './common-styles';

interface Props {
    event: IEvent;
}

const EventParticipants: React.FC<Props> = ({ event }) => {
    const { name, description, participants } = event;

    const numParticipants = participants ? participants.length : 0;

    return (
        <div className="flex flex-col">
            <span className={`${eventStyles.labelClass}`}>
                <FontAwesomeIcon icon={faUsers} className={eventStyles.labelIconClass} />
                Participants
            </span>
            {participants && (
                <div className="flex flex-wrap gap-3">
                    {participants.map((p, idx) => (
                        <EmailLink
                            key={idx}
                            userName={p.name}
                            email={p.email}
                            subject={name}
                            body={description}
                            putComma={idx < numParticipants - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventParticipants;
