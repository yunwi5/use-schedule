import React, { useState } from 'react';
import { Size, Theme } from '../../../../models/design-models';
import TaskAdd from '../../../planners/planner-crud/TaskAdd';
import Button from '../../../ui/buttons/Button';
import EventAdd from '../../events/EventAdd';

interface Props {
    onAdd: () => void;
    beginningPeriod: Date;
}

const ItemCreateBar: React.FC<Props> = (props) => {
    const { onAdd, beginningPeriod } = props;
    const [showEventAdd, setShowEventAdd] = useState(false);
    const [showTaskAdd, setShowTaskAdd] = useState(false);

    const handleSubmit = () => {
        onAdd();
        setShowEventAdd(false);
        setShowTaskAdd(false);
    };

    return (
        <>
            <div className="border-t-2 py-1 bg-blue-100/70 border-blue-300">
                <Button
                    theme={Theme.SECONDARY}
                    className={'!min-w-[3.5rem]'}
                    size={Size.XSMALL}
                    onClick={() => setShowEventAdd(true)}
                >
                    + Event
                </Button>
                <Button
                    theme={Theme.TERTIARY}
                    size={Size.XSMALL}
                    className={'!min-w-[3.5rem]'}
                    onClick={() => setShowTaskAdd(true)}
                >
                    + Task
                </Button>
            </div>
            {showEventAdd && (
                <EventAdd
                    onClose={() => setShowEventAdd(false)}
                    onAdd={handleSubmit}
                    beginningPeriod={beginningPeriod}
                />
            )}
            {showTaskAdd && (
                <TaskAdd
                    onClose={() => setShowTaskAdd(false)}
                    onAddTask={handleSubmit}
                    beginningPeriod={beginningPeriod}
                />
            )}
        </>
    );
};

export default ItemCreateBar;
