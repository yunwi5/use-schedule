import React from 'react';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';

interface Props {
    recEvent: RecurringEvent;
    onInvalidate(): void;
    onClose(): void;
}

const RecurringEventDetail: React.FC<Props> = (props) => {
    const { recEvent, onInvalidate, onClose } = props;

    return <div>RecurringEventDetail</div>;
};

export default RecurringEventDetail;
