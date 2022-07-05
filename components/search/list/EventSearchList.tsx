import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/pro-light-svg-icons';

import { IEvent } from '../../../models/Event';
import EventCard from '../../calendar/events/card/EventCard';
import classes from './SearchList.module.scss';

interface Props {
    events: IEvent[];
    onInvalidate(): void;
    expandMode: boolean;
}

const EventSearchList: React.FC<Props> = (props) => {
    const { events, onInvalidate, expandMode } = props;

    return (
        <ul className={`${classes['search-list']} gap-3`}>
            {!events.length && (
                <h1 className="huge-heading">
                    <FontAwesomeIcon icon={faTriangleExclamation} className={classes.icon} />
                    No events found.
                </h1>
            )}
            {events.map((event) => {
                return (
                    <div key={event.id}>
                        <EventCard
                            event={event}
                            onInvalidate={onInvalidate}
                            expand={expandMode}
                        />
                    </div>
                );
            })}
        </ul>
    );
};

export default EventSearchList;
