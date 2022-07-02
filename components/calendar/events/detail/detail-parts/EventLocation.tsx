import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/pro-duotone-svg-icons';
import { eventStyles } from './common-styles';

interface Props {
    event: { location?: string };
}

const googleMapBaseURL = 'http://maps.google.com/maps?q=';

const EventLocation: React.FC<Props> = ({ event: { location } }) => {
    return (
        <div className="flex flex-col">
            <span className={eventStyles.labelClass}>
                <FontAwesomeIcon icon={faLocationDot} className={eventStyles.labelIconClass} />
                Location
            </span>
            <p>
                <a
                    className={`text-blue-500  ${eventStyles.linkHoverClass}`}
                    href={`${googleMapBaseURL}${location}`}
                >
                    {location || '-'}
                </a>
            </p>
        </div>
    );
};

export default EventLocation;
