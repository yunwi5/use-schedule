import React, { useState } from 'react';
import {
    faAlarmClock,
    faAlarmExclamation,
    faHourglass,
    faMemoPad,
    faStarExclamation,
} from '@fortawesome/pro-duotone-svg-icons';

import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringEventQuery';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import {
    EventHeading,
    EventLocation,
    EventParticipants,
    EventSection,
    MeetingLink,
} from '../../calendar/events/detail/detail-parts';
import ExitIcon from '../../ui/icons/ExitIcon';
import RecurringItemDeleteModal from '../../ui/modal/modal-variation/RecurringItemDeleteModal';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import OperationList from '../../ui/OperationList';
import RecurringEventDuplicate from '../crud-operations/RecurringEventDuplicate';
import RecurringEventEdit from '../crud-operations/RecurringEventEdit';
import { RecurringItemInterval, RecurringDateInfo } from './item-parts';
import {
    getDurationFormat,
    getFullDateFormat,
} from '../../../utilities/date-utils/date-format';

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
                <article className="px-1 lg:px-2 min-h-[27rem] relative flex flex-col gap-3 justify-between text-slate-600">
                    <EventHeading event={recEvent} />
                    <ExitIcon onClose={onClose} className={'!-translate-y-[2px]'} />
                    <section className="mt-3 sm:mt-0 flex flex-col gap-3 px-4 sm:px-2 lg:px-4">
                        <div className="hide-scrollbar overflow-y-scroll overflow-x-hidden flex-1 flex flex-col gap-3 text-lg">
                            <RecurringItemInterval recItem={recEvent} />
                            <EventLocation event={recEvent} />
                            <MeetingLink event={recEvent} />
                            <div
                                className={`grid grid-cols-2 grid-rows-2 justify-between gap-4 gap-x-2 sm:gap-x-4`}
                            >
                                <EventSection
                                    label={'start date'}
                                    value={getFullDateFormat(recEvent.startDate)}
                                    icon={faAlarmClock}
                                />
                                <EventSection
                                    label={'end date'}
                                    value={getFullDateFormat(recEvent.endDate)}
                                    icon={faAlarmExclamation}
                                />
                                <EventSection
                                    label={'duration'}
                                    value={getDurationFormat(recEvent.duration)}
                                    icon={faHourglass}
                                />
                                <EventSection
                                    label={'importance'}
                                    value={recEvent.importance}
                                    icon={faStarExclamation}
                                />
                            </div>
                            {!!participants?.length && <EventParticipants event={recEvent} />}
                            <EventSection
                                label={'description'}
                                value={recEvent.description}
                                icon={faMemoPad}
                            />
                            <RecurringDateInfo item={recEvent} />
                        </div>
                        <div className="mt-5 sm:mt-3">
                            <OperationList
                                onEdit={editModalHandler(true)}
                                onDelete={deleteModalHandler(true)}
                                onDuplicate={duplicateModalHandler(true)}
                            />
                        </div>
                    </section>
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
                    initialEvent={recEvent}
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
