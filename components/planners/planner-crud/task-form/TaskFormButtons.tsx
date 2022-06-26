import React from 'react';

import { Size, Theme } from '../../../../models/design-models';
import Button from '../../../ui/buttons/Button';
import classes from './TaskForm.module.scss';

interface Props {
    isEdit?: boolean;
    onDelete?: () => void;
}

const FormButtons: React.FC<Props> = (props) => {
    const { isEdit, onDelete } = props;

    return (
        <div className={classes.btns}>
            <Button className="!px-6" theme={Theme.TERTIARY} size={Size.MEDIUM} type="submit">
                Confirm
            </Button>
            {isEdit && onDelete && (
                <Button
                    theme={Theme.DANGER}
                    size={Size.MEDIUM}
                    className="!px-6"
                    type="button"
                    onClick={onDelete}
                >
                    Delete
                </Button>
            )}
        </div>
    );
};

export default FormButtons;
