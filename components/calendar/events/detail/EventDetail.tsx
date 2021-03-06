import React, { useState } from 'react';

import { EventProps, IEvent } from '../../../../models/Event';
import ExitIcon from '../../../ui/icons/ExitIcon';
import EventEdit from '../EventEdit';
import WrapperModal from '../../../ui/modal/wrapper/WrapperModal';
import useEventDelete from '../../../../hooks/event-hooks/useEventDelete';
import OperationList from '../../../ui/OperationList';
import EventDuplicate from '../EventDuplicate';
import {
    EventLocation,
    EventDateTime,
    MeetingLink,
    EventStatus,
    EventHeading,
    EventParticipants,
    EventSection,
} from './detail-parts';
import RecurringEventDuplicate from '../../../recurring/crud-operations/RecurringEventDuplicate';
import { getDurationFormat } from '../../../../utilities/date-utils/date-format';
import { faHourglass, faMemoPad, faStarExclamation } from '@fortawesome/pro-duotone-svg-icons';

interface Props {
    onClose(): void;
    onInvalidate(): void;
    onEditEvent(eventProps: EventProps): void;
    event: IEvent;
}

const EventDetail: React.FC<Props> = (props) => {
    const { onClose, onInvalidate, onEditEvent, event } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showRecurringModal, setShowRecurringModal] = useState(false);
    const { deleteEvent } = useEventDelete({ onClose, event, onInvalidate });

    const { participants } = event;

    const editEventHandler = (eventProps: EventProps) => {
        setShowEditModal(false);
        onEditEvent(eventProps);
    };

    const eventDuplicateHandler = () => {
        setShowDuplicateModal(false);
        onInvalidate();
    };

    return (
        <>
            <WrapperModal onClose={onClose}>
                <article className="px-1 lg:px-2 min-h-[27rem] relative flex flex-col gap-3 justify-between text-slate-600">
                    <EventHeading event={event} />
                    <ExitIcon
                        onClose={onClose}
                        className={'!-translate-y-[2px] -translate-x-[.5rem]'}
                    />
                    <section className="mt-3 sm:mt-0 flex flex-col gap-3 px-4 sm:px-2 lg:px-4">
                        <div className="overflow-x-hidden flex-1 flex flex-col gap-3 text-[1.1rem] md:text-lg">
                            <EventLocation event={event} />
                            <MeetingLink event={event} />
                            {!!participants?.length && <EventParticipants event={event} />}
                            <div
                                className={`grid grid-cols-2 grid-rows-2 justify-between gap-4 gap-x-2 sm:gap-x-4`}
                            >
                                <EventDateTime item={event} />
                                <EventSection
                                    label={'duration'}
                                    value={getDurationFormat(event.duration)}
                                    icon={faHourglass}
                                />
                                <EventStatus event={event} onEdit={editEventHandler} />
                                <EventSection
                                    label={'importance'}
                                    value={event.importance}
                                    icon={faStarExclamation}
                                />
                            </div>
                            <EventSection
                                label={'description'}
                                value={event.description}
                                icon={faMemoPad}
                            />
                        </div>
                        <div className="mt-5 sm:mt-3">
                            <OperationList
                                onEdit={() => setShowEditModal(true)}
                                onDelete={deleteEvent}
                                onRecurring={() => setShowRecurringModal(true)}
                                onDuplicate={() => setShowDuplicateModal(true)}
                            />
                        </div>
                    </section>
                </article>
            </WrapperModal>
            {showEditModal && (
                <EventEdit
                    onClose={() => setShowEditModal(false)}
                    onDeleteEvent={onInvalidate}
                    onEditEvent={editEventHandler}
                    event={event}
                />
            )}
            {showDuplicateModal && (
                <EventDuplicate
                    onClose={() => setShowDuplicateModal(false)}
                    event={event}
                    onDuplicate={eventDuplicateHandler}
                />
            )}
            {showRecurringModal && (
                <RecurringEventDuplicate
                    onClose={() => setShowRecurringModal(false)}
                    onDuplicate={onInvalidate}
                    initialEvent={event}
                    formTitle="Add Recurring Event"
                />
            )}
        </>
    );
};

export default EventDetail;
