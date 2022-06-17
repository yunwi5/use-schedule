import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleExclamationCheck,
    faHourglass,
    faLocationDot,
    faStar,
    faTimer,
} from '@fortawesome/pro-duotone-svg-icons';

import { CalendarItemType, getItemIcon } from '../../../../models/calendar-models/CalendarItemType';
import { IEvent } from '../../../../models/Event';
import {
    getDurationFormat,
    getEventDateTimeFormat,
} from '../../../../utilities/date-utils/date-format';
import ItemCardButtons from '../../../ui/buttons/ItemCardButtons';
import EventDetail from '../detail/EventDetail';
import EventEdit from '../EventEdit';
import EventStatusToggler from './EventStatusToggler';

interface Props {
    event: IEvent;
    onInvalidate: () => void;
}

const leftBorderClass = 'sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400';

const EventCard: React.FC<Props> = ({ event, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const { dateTime, name, importance, location, status, duration } = event;

    const statusClass = 'status-' + status.toLowerCase().replace(' ', '');

    return (
        <>
            <article
                className={`relative flex flex-col text-slate-700 gap-3 px-2 lg:px-4 pl-3 lg:pl-7 py-2 overflow-hidden bg-sky-50  rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
            >
                <div
                    className={`absolute top-0 left-0 w-[1.05%] h-full z-0 ${statusClass}-bg`}
                ></div>
                <div className={`text-slate-500 font-bold text-base`}>
                    <FontAwesomeIcon icon={faTimer} className={`text-slate-900 icon-medium mr-2`} />
                    <time>{getEventDateTimeFormat(dateTime)}</time>
                    <span className={`inline-block ml-4 text-slate-500/90`}>
                        <FontAwesomeIcon icon={faHourglass} className="icon-medium mr-2" />
                        {getDurationFormat(duration)}
                    </span>
                    <EventStatusToggler event={event} onInvalidate={onInvalidate} />
                </div>
                <div>
                    <h3 className={'text-lg sm:text-xl'} onClick={() => setShowDetail(true)}>
                        <span className={`text-sky-600`}>
                            {getItemIcon(CalendarItemType.EVENT)}
                        </span>
                        {name}
                    </h3>
                </div>
                <div
                    className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 text-base sm:text-lg overflow-hidden`}
                >
                    <span className={'inline-block'}>
                        <FontAwesomeIcon icon={faStar} className={'icon-medium text-amber-500'} />{' '}
                        {importance}
                    </span>
                    <span className={`inline-block ${statusClass} ${leftBorderClass}`}>
                        <FontAwesomeIcon
                            icon={faCircleExclamationCheck}
                            className={'icon-medium'}
                        />{' '}
                        {status}
                    </span>
                    {location && (
                        <span
                            className={
                                'inline-block sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400'
                            }
                        >
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className={'icon-medium mr-2 text-sky-600/90'}
                            />
                            {location}
                        </span>
                    )}
                </div>
                <ItemCardButtons
                    onShowDetail={() => setShowDetail(true)}
                    onShowEdit={() => setShowEdit(true)}
                />
            </article>
            {showDetail && (
                <EventDetail
                    event={event}
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                />
            )}
            {showEdit && (
                <EventEdit
                    event={event}
                    onClose={() => setShowEdit(false)}
                    onEditEvent={onInvalidate}
                />
            )}
        </>
    );
};

export default EventCard;
