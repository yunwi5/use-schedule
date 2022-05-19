import EventForm from './form/EventForm';
import { IEvent } from '../../../models/Event';
import WrapperModal from '../../ui/modal/modal-variation/WrapperModal';
import useEventAdd from '../../../hooks/event-hooks/useEventAdd';

interface Props {
    event: IEvent;
    onClose(): void;
    onDuplicate(): void;
}

const EventDuplicate: React.FC<Props> = (props) => {
    const { event, onClose, onDuplicate } = props;
    const { addEvent } = useEventAdd({ onAdd: onDuplicate });

    return (
        <WrapperModal onClose={onClose}>
            <EventForm
                heading={'Duplicate Event'}
                initialEvent={event}
                onSubmit={addEvent}
                onClose={onClose}
                beginningPeriod={event.dateTime}
            />
        </WrapperModal>
    );
};

export default EventDuplicate;
