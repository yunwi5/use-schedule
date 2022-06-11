import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarExclamation } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { IEvent } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';
import { Importance, ImportanceList } from '../../../../../models/task-models/Status';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    register: UseFormRegister<any>;
    initialEvent?: IEvent;
}

const EventImportanceInput: React.FC<Props> = ({ register, initialEvent }) => {
    return (
        <div className={`${classes.section} w-[45%]`}>
            <label htmlFor="importance">
                <FontAwesomeIcon icon={faStarExclamation} className={labelIconClass} />
                Importance
            </label>
            <select
                id="importance"
                defaultValue={initialEvent?.importance || Importance.IMPORTANT}
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
