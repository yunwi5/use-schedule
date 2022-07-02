import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClone,
    faPenToSquare,
    faRotate,
    faTrashCan,
} from '@fortawesome/pro-duotone-svg-icons';

import classes from './OperationList.module.scss';

interface Props {
    onEdit(): void;
    onDuplicate(): void;
    onDelete(): void;
    onRecurring?: () => void;
    hoverColorClass?: string;
}

const OperationList: React.FC<Props> = (props) => {
    const { onEdit, onDuplicate, onRecurring, onDelete, hoverColorClass } = props;

    const iconClass = `icon-large cursor-pointer text-[1.65rem] transition-all ${
        hoverColorClass || 'hover:text-sky-500/90'
    } hover:scale-110`;

    return (
        <div className="my-2 flex gap-9 items-center text-slate-500/90">
            <div onClick={onEdit} className={classes.operation}>
                <span
                    className={`py-1 px-2 rounded-sm text-sm font-semibold bg-slate-500/90 text-slate-50 ${classes['operation-label']}`}
                >
                    Edit
                </span>
                <FontAwesomeIcon icon={faPenToSquare} className={iconClass} />
            </div>
            {/* Show recurring option only if the prop function is given */}
            {onRecurring && (
                <div onClick={onRecurring} className={classes.operation}>
                    <span
                        className={`py-1 px-2 rounded-sm text-sm font-semibold bg-slate-500/90 text-slate-50 ${classes['operation-label']}`}
                    >
                        Recurring
                    </span>
                    <FontAwesomeIcon icon={faRotate} className={iconClass} />
                </div>
            )}
            <div onClick={onDuplicate} className={classes.operation}>
                <span
                    className={`py-1 px-2 rounded-sm text-sm font-semibold bg-slate-500/90 text-slate-50 ${classes['operation-label']}`}
                >
                    Duplicate
                </span>
                <FontAwesomeIcon icon={faClone} className={iconClass} />
            </div>
            <div onClick={onDelete} className={classes.operation}>
                <span
                    className={`py-1 px-2 rounded-sm text-sm font-semibold bg-slate-500/90 text-slate-50 ${classes['operation-label']}`}
                >
                    Delete
                </span>
                <FontAwesomeIcon icon={faTrashCan} className={iconClass} />
            </div>
        </div>
    );
};

export default OperationList;
