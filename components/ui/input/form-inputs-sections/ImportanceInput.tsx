import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarExclamation } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { Importance, ImportanceList } from '../../../../models/task-models/Status';
import classes from './FormInput.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialItem?: { importance?: string };
    className?: string;
}

const EventImportanceInput: React.FC<Props> = ({ register, initialItem, className }) => {
    return (
        <div className={`${classes.section} w-[45%] ${className}`}>
            <label htmlFor="importance">
                <FontAwesomeIcon icon={faStarExclamation} className={labelIconClass} />
                Importance
            </label>
            <select
                id="importance"
                defaultValue={initialItem?.importance || Importance.IMPORTANT}
                {...register('importance')}
            >
                {ImportanceList.map((imp) => (
                    <option key={imp} value={imp}>
                        {imp}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EventImportanceInput;
