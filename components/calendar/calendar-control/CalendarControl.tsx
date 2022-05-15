import React from 'react';
import { CalendarFilter, FilterStorage } from './calendar-filter';
import ItemCreate from './item-create/ItemCreate';

import { useAppDispatch } from '../../../store/redux';
import { calendarActions } from '../../../store/redux/calendar-slice';
import Modal from '../../ui/modal/Modal';
import classes from './CalendarControl.module.scss';
import CalendarImportExport from './calendar-import-export/CalendarImportExport';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import { IEvent } from '../../../models/Event';

interface Props {
    onInvalidate: () => void;
    beginningPeriod: Date;
    tasks: AbstractTask[];
    events: IEvent[];
}

const CalendarControl: React.FC<Props> = (props) => {
    const { onInvalidate, beginningPeriod, tasks, events } = props;

    const dispatch = useAppDispatch();

    const content = (
        <>
            <ItemCreate onInvalidate={onInvalidate} beginningPeriod={beginningPeriod} />
            <nav className="max-h-[44.5rem] flex-1 flex flex-col gap-1 border-l-2 border-t-2 border-slate-200">
                <CalendarImportExport
                    tasks={tasks}
                    events={events}
                    beginningPeriod={beginningPeriod}
                />
                <CalendarFilter />
            </nav>
        </>
    );

    return (
        <>
            <Modal
                onClose={() => dispatch(calendarActions.toggleSidebar())}
                modalClass={classes.modal}
                backdropClass={classes.backdrop}
            >
                <section
                    className={`xl:min-w-[10rem] pr-3 -mt-[.47rem] flex flex-col gap-3 ${classes['calendar-control']}`}
                >
                    {content}
                </section>
                {/* Providing initial calendar filtering options that user has previously stored. */}
            </Modal>
            <div className={`${classes['control-container']}`}>
                <section
                    className={`flex-1 xl:min-w-[10rem] pr-3 -mt-[.47rem] flex flex-col gap-3 ${classes['calendar-control']}`}
                >
                    {content}
                </section>
            </div>
            <FilterStorage />
        </>
    );
};

export default CalendarControl;
