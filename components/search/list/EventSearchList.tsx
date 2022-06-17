import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/pro-light-svg-icons';
import { faCircleInfo } from '@fortawesome/pro-duotone-svg-icons';

import { EventSort as SortingStandard } from '../../../models/sorting-models';
import { getDateTimeFormat, getDurationFormat } from '../../../utilities/date-utils/date-format';

import { IEvent } from '../../../models/Event';
import EventCard from '../../calendar/events/card/EventCard';
import classes from './SearchList.module.scss';

interface Props {
    events: IEvent[];
    sortingStandard: SortingStandard | null;
    onInvalidate(): void;
}

function getEventsortingInfo(event: IEvent, sortingStandard: SortingStandard | null) {
    let showInfo = true;
    let labelFormat: string | JSX.Element = '';

    switch (sortingStandard) {
        case SortingStandard.DATETIME:
            const dateTimeFormat = getDateTimeFormat(event.dateTime);
            labelFormat = (
                <>
                    <strong>Date Time</strong> {dateTimeFormat}
                </>
            );
            break;
        case SortingStandard.IMPORTANCE:
            labelFormat = <strong>{event.importance}</strong>;
        case SortingStandard.DURATION:
            const durationFormat = getDurationFormat(event.duration).trim() || 'No Duration';
            labelFormat = (
                <>
                    <strong>Event Duration</strong> {durationFormat}
                </>
            );
            break;
        default:
            showInfo = false;
    }

    return { showInfo, labelFormat };
}

const EventSearchList: React.FC<Props> = (props) => {
    const { events, sortingStandard, onInvalidate } = props;

    return (
        <ul className={classes['search-list']}>
            {!events.length && (
                <h1 className="huge-heading">
                    <FontAwesomeIcon icon={faTriangleExclamation} className={classes.icon} />
                    No events found.
                </h1>
            )}
            {events.map((event) => {
                const { showInfo, labelFormat } = getEventsortingInfo(event, sortingStandard);
                return (
                    <div key={event.id}>
                        {showInfo && (
                            <div className={`${classes.label} ${classes['label-event']}`}>
                                <span>{'Event'}</span>
                                <span className="ml-4">
                                    <FontAwesomeIcon icon={faCircleInfo} className={classes.icon} />
                                    <span className={classes['sorting-label']}>{labelFormat}</span>
                                </span>
                            </div>
                        )}
                        <EventCard event={event} onInvalidate={onInvalidate} />
                    </div>
                );
            })}
        </ul>
    );
};

export default EventSearchList;
