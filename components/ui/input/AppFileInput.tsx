import { faUpFromLine } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import classes from './AppFileInput.module.scss';

interface Props {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const AppFileInput: React.FC<Props> = (props) => {
    const { onChange } = props;

    return (
        <div>
            <input
                type="file"
                accept=".ics,.csv"
                name="file"
                id="file"
                onChange={onChange}
                className={classes.inputfile}
            />
            <label className={`${classes['label']} text-lg shadow-md`} htmlFor="file">
                <FontAwesomeIcon icon={faUpFromLine} className="icon-medium shadow-none mr-2" />
                Select a file to import
            </label>
        </div>
    );
};

export default AppFileInput;
