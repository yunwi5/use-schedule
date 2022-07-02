import { addMinutes } from '../../../utilities/date-utils/date-control';
import EventForm from './form/EventForm';
import useEventAdd from '../../../hooks/event-hooks/useEventAdd';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';

interface Props {
    onClose: () => void;
    onAdd: () => void;
    beginningPeriod: Date;
}

const EventAdd: React.FC<Props> = ({ onClose, onAdd, beginningPeriod: initialPeriod }) => {
    const beginningPeriod = addMinutes(initialPeriod, 60 * 12);
    const { addEvent } = useEventAdd({ onAdd });

    return (
        <WrapperModal onClose={onClose}>
            <EventForm
                onSubmit={addEvent}
                onClose={onClose}
                beginningPeriod={beginningPeriod}
            />
        </WrapperModal>
    );
};

export default EventAdd;
