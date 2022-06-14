import { RecurringItemMode } from '../../../../models/recurring-models';
import { eventStyles } from '../../../calendar/events/detail/detail-parts/common-styles';
import { styles as taskStyles } from '../../../tasks/task-modal/task-detail/task-parts/common-styles';
import { useAppSelector } from '../../../../store/redux';

export function useRecurringStyles() {
    const itemType = useAppSelector((state) => state.recurring.mode);
    if (itemType === RecurringItemMode.EVENT) {
        return eventStyles;
    }
    return taskStyles;
}
