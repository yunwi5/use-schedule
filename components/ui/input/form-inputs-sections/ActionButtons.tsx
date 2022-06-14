import React from 'react';
import { Theme } from '../../../../models/design-models';
import Button from '../../buttons/Button';

import classes from './FormInput.module.scss';

interface Props {
    onDelete?: () => void;
}

const EventButtons: React.FC<Props> = ({ onDelete }) => {
    return (
        <div className={classes.action}>
            <Button type="submit" theme={Theme.TERTIARY} className={'!min-w-[8rem]'}>
                Confirm
            </Button>
            {onDelete && (
                <Button
                    type="button"
                    onClick={onDelete}
                    theme={Theme.DANGER}
                    className={'!min-w-[8rem]'}
                >
                    Delete
                </Button>
            )}
        </div>
    );
};

export default EventButtons;
