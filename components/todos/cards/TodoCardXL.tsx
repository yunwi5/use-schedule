import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAlarmClock,
    faCircleExclamationCheck,
    faHourglass,
    faListCheck,
    faStar,
} from '@fortawesome/pro-duotone-svg-icons';
import { DateTodo } from '../../../models/todo-models/Todo';
import { getTodoImportance, getTodoStatus } from '../../../utilities/todos-utils/todo-util';
import {
    getDurationFormat,
    getEventDateTimeFormat,
} from '../../../utilities/date-utils/date-format';
import {
    CalendarItemType,
    getItemIcon,
} from '../../../models/calendar-models/CalendarItemType';
import ItemCardButtons from '../../ui/buttons/ItemCardButtons';
import TodoDetail from '../todo-detail/TodoDetail';
import { useAppSelector } from '../../../store/redux';
import useTodoQuery from '../../../hooks/useTodoQuery';
import StatusTogglerButton from '../../ui/buttons/StatusTogglerButton';

interface Props {
    todo: DateTodo;
    onInvalidate: () => void;
    expand?: boolean;
}

const leftBorderClass = 'sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400';

// New version of todo card that is responsive
// Used in TodaySchedule section to match the styles with Event and Task card.
const TodoCardXL: React.FC<Props> = ({ todo, onInvalidate, expand = true }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const lists = useAppSelector((state) => state.todoList.lists);
    const parentList = lists.find((list) => list.id === todo.listId);
    const { patchTodo, deleteTodo } = useTodoQuery(onInvalidate, parentList);

    const { name, duration } = todo;
    const status = getTodoStatus(todo);
    const statusClass = 'status-' + status.toLowerCase().replace(' ', '');

    const importance = getTodoImportance(todo);

    const completionHandler = () => {
        patchTodo(todo.id, { isCompleted: !todo.isCompleted });
    };

    const todoDetailProps = {
        todo,
        listName: parentList ? parentList.name : '',
        onClose: () => {
            setShowDetail(false);
            setShowEdit(false);
        },
        onMutateTodo: patchTodo,
        onDeleteTodo: deleteTodo,
    };

    return (
        <>
            <article
                className={`relative flex flex-col text-slate-700 gap-1 sm:gap-4 px-2 lg:px-4 pl-3 lg:pl-7 py-2 overflow-hidden bg-slate-50  rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
            >
                <div
                    className={`absolute top-0 left-0 w-[1.05%] h-full z-0 ${statusClass}-bg`}
                ></div>
                <div className={`text-slate-500 font-bold text-base`}>
                    <FontAwesomeIcon
                        icon={faAlarmClock}
                        className={`text-slate-900 icon-medium mr-2`}
                    />
                    {todo.dateTime && <time>{getEventDateTimeFormat(todo.dateTime)}</time>}
                    <span className={`inline-block ml-4 text-slate-500/90`}>
                        <FontAwesomeIcon icon={faHourglass} className="icon-medium mr-2" />
                        {getDurationFormat(duration || 0)}
                    </span>
                    <StatusTogglerButton status={status} onToggle={completionHandler} />
                </div>
                <div>
                    <h3 className={'text-lg sm:text-xl'} onClick={() => setShowDetail(true)}>
                        <span className={`text-indigo-600`}>
                            {getItemIcon(CalendarItemType.TODO)}
                        </span>
                        {name}
                    </h3>
                </div>
                {expand && (
                    <div
                        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 text-base sm:text-lg overflow-hidden`}
                    >
                        <span className={'inline-block'}>
                            <FontAwesomeIcon
                                icon={faStar}
                                className={'icon-medium text-amber-500'}
                            />{' '}
                            {importance}
                        </span>
                        <span className={`inline-block ${statusClass} ${leftBorderClass}`}>
                            <FontAwesomeIcon
                                icon={faCircleExclamationCheck}
                                className={'icon-medium'}
                            />{' '}
                            {status}
                        </span>
                        {
                            <span
                                className={
                                    'inline-block sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400'
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faListCheck}
                                    className={'icon-medium mr-2 text-indigo-600/90'}
                                />
                                {parentList?.name}
                            </span>
                        }
                    </div>
                )}
                <ItemCardButtons
                    onShowDetail={() => setShowDetail(true)}
                    onShowEdit={() => setShowEdit(true)}
                />
            </article>
            {showDetail && <TodoDetail {...todoDetailProps} />}
            {showEdit && <TodoDetail {...todoDetailProps} initialEditing={true} />}
        </>
    );
};

export default TodoCardXL;
