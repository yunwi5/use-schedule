import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/pro-duotone-svg-icons';

import { styles } from './common-styles';

interface Props {
    label: string;
    value: string;
    icon: IconDefinition;
}

const TaskSection: React.FC<Props> = ({ label, value, icon }) => {
    return (
        <div className="flex flex-col">
            <span className={`${styles.labelClass}`}>
                <FontAwesomeIcon icon={icon} className={styles.labelIconClass} />
                {label}
            </span>
            <span>{value}</span>
        </div>
    );
};

export default TaskSection;
