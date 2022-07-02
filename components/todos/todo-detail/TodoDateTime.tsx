import { addDays } from '../../../utilities/date-utils/date-control';
import {
    getFullDateFormat,
    getISODateFormat,
} from '../../../utilities/date-utils/date-format';
import classes from './TodoDetail.module.scss';

interface Props {
    isEditing: boolean;
    dateTime: Date | null;
    onChange: (newDate: string) => void;
}

const TodoDateTime: React.FC<Props> = (props) => {
    const { isEditing, dateTime, onChange } = props;

    const dateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const defaultValue = '';
    return (
        <div className={`${classes.section} ${classes.dateTime}`}>
            <label htmlFor="todo-date">Due Date</label>
            {!isEditing && (
                <p className={classes.value}>
                    {dateTime ? getFullDateFormat(dateTime) : defaultValue}
                </p>
            )}
            {isEditing && (
                <input
                    type="date"
                    id="todo-date"
                    value={dateTime ? getISODateFormat(addDays(dateTime, -1)) : ''}
                    onChange={dateHandler}
                />
            )}
        </div>
    );
};

export default TodoDateTime;
