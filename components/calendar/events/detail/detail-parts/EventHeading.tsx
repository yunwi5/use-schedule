import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarStar } from '@fortawesome/pro-duotone-svg-icons';

const EventHeading: React.FC<{ event: { name: string } }> = ({ event: { name } }) => {
    return (
        <h2
            className={`text-xl md:text-2xl lg:text-3xl pb-2 border-b-2 border-sky-400/50 whitespace-nowrap overflow-hidden`}
        >
            <FontAwesomeIcon
                icon={faCalendarStar}
                className="inline-block text-sky-500/90 max-w-[1.8rem] max-h-[1.8rem] mr-2"
            />
            {name}
        </h2>
    );
};

export default EventHeading;
