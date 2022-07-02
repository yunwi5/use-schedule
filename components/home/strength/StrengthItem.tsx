import { faCode, IconDefinition } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Strength.module.scss';

export interface Strength {
    icon: IconDefinition | null;
    heading: string;
    text: string | JSX.Element;
}

const StrengthItem: React.FC<Strength> = (props) => {
    const { icon, heading, text } = props;

    return (
        <article
            className={`px-2 py-3 rounded-sm flex flex-col items-center gap-2 ${classes.strength}`}
        >
            <FontAwesomeIcon
                icon={icon || faCode}
                className={`mb-1 text-blue-500 ${classes.icon}`}
            />
            <h3 className={`text-2xl capitalize ${classes['section-heading']}`}>{heading}</h3>
            <p className={'text-center'}>{text}</p>
        </article>
    );
};

export default StrengthItem;
