import React, { useState } from 'react';
import { faAlarmExclamation } from '@fortawesome/pro-duotone-svg-icons';

import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringEventQuery';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import {
    EventDate,
    EventDescription,
    EventDuration,
    EventHeading,
    EventImportance,
    EventLocation,
    EventParticipants,
    MeetingLink,
} from '../../calendar/events/detail/detail-parts';
import ExitIcon from '../../ui/icons/ExitIcon';
import RecurringItemDeleteModal from '../../ui/modal/modal-variation/RecurringItemDeleteModal';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import OperationList from '../../ui/OperationList';
import RecurringEventDuplicate from '../crud-operations/RecurringEventDuplicate';
import RecurringEventEdit from '../crud-operations/RecurringEventEdit';
import { RecurringEventInterval, RecurringDateInfo } from './item-parts';

interface Props {
    onClose(): void;
    onInvalidate(): void;
    recEvent: RecurringEvent;
}

const EventDetail: React.FC<Props> = (props) => {
    const { onClose, onInvalidate, recEvent } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { deleteRecEvent: deleteRecEvent } = useRecurringEventQuery({ onInvalidate });

    const { participants } = recEvent;

    const duplicateModalHandler = (show: boolean) => () => setShowDuplicateModal(show);

    const editActionHandler = () => {
        setShowEditModal(false);
        onInvalidate();
    };

    const editModalHandler = (show: boolean) => () => setShowEditModal(show);

    const duplicateActionHandler = () => {
        setShowDuplicateModal(false);
        onInvalidate();
    };

    const deleteModalHandler = (show: boolean) => () => setShowDeleteModal(show);

    const deleteActionHandler = (deleteGenerated: boolean) => {
        deleteRecEvent(recEvent.id, deleteGenerated);
    };

    return (
        <>
            <WrapperModal onClose={onClose}>
                <article className="min-h-[27rem] relative flex flex-col gap-3 justify-between text-slate-600">
                    <EventHeading event={recEvent} />
                    <ExitIcon onClose={onClose} className={'!-translate-y-[2px]'} />
                    <div className="overflow-y-scroll overflow-x-hidden flex-1 flex flex-col gap-3 lg:px-3 text-lg">
                        <RecurringEventInterval recEvent={recEvent} />
                        <EventLocation event={recEvent} />
                        <MeetingLink event={recEvent} />
                        <div
                            className={`grid grid-cols-2 grid-rows-2 justify-between gap-4 gap-x-2 sm:gap-x-4`}
                        >
                            <EventDate label={'Start Date'} date={recEvent.startDate} />
                            <EventDate
                                label={'End Date'}
                                date={recEvent.endDate}
                                icon={faAlarmExclamation}
                            />
                            <EventDuration event={recEvent} />
                            <EventImportance event={recEvent} />
                        </div>
                        {!!participants?.length && <EventParticipants event={recEvent} />}
                        <EventDescription event={recEvent} />
                        <RecurringDateInfo item={recEvent} />
                    </div>
                    <div className="mt-3 lg:px-3">
                        <OperationList
                            onEdit={editModalHandler(true)}
                            onDelete={deleteModalHandler(true)}
                            onDuplicate={duplicateModalHandler(true)}
                        />
                    </div>
                </article>
            </WrapperModal>
            {showEditModal && (
                <RecurringEventEdit
                    onClose={editModalHandler(false)}
                    onEdit={editActionHandler}
                    initialRecEvent={recEvent}
                />
            )}
            {showDuplicateModal && (
                <RecurringEventDuplicate
                    onClose={duplicateModalHandler(false)}
                    initialRecEvent={recEvent}
                    onDuplicate={duplicateActionHandler}
                />
            )}
            {showDeleteModal && (
                <RecurringItemDeleteModal
                    targetName={recEvent.name}
                    onAction={deleteActionHandler}
                    onClose={deleteModalHandler(false)}
                />
            )}
        </>
    );
};

export default EventDetail;
