import { CalendarItem } from '../../models/calendar-models/CalendarItem';
import { IEvent, isInstanceOfEvent } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { isInstanceOfTask } from '../../models/task-models/Task';
import { DateTodo, isInstanceOfTodo } from '../../models/todo-models/Todo';
import EventCard from '../calendar/events/card/EventCard';
import TaskCardNew from '../tasks/TaskCardNew';
import TodoCardXL from '../todos/cards/TodoCardXL';

interface Props {
    timeLabel: string;
    items: CalendarItem[];
    onInvalidate(): void;
    expandItems: boolean;
}

const TimeLine: React.FC<Props> = (props) => {
    const { timeLabel, items, onInvalidate, expandItems } = props;

    return (
        <li className={'flex flex-col md:flex-row gap-3'}>
            <time
                className={'min-w-[6rem] text-slate-500/70 font-semibold text-2xl md:text-3xl'}
            >
                {timeLabel}
            </time>
            <div className={'flex-1 flex flex-col gap-3'}>
                {items.map((item) => {
                    if (isInstanceOfEvent(item)) {
                        return (
                            <EventCard
                                key={item.id}
                                event={item as IEvent}
                                onInvalidate={onInvalidate}
                                expand={expandItems}
                            />
                        );
                    } else if (isInstanceOfTask(item)) {
                        return (
                            <TaskCardNew
                                key={item.id}
                                task={item as AbstractTask}
                                onInvalidate={onInvalidate}
                                expand={expandItems}
                            />
                        );
                    } else if (isInstanceOfTodo(item)) {
                        return (
                            <TodoCardXL
                                key={item.id}
                                todo={item as DateTodo}
                                onInvalidate={onInvalidate}
                                expand={expandItems}
                            />
                        );
                    }
                    return;
                })}
            </div>
        </li>
    );
};

export default TimeLine;
