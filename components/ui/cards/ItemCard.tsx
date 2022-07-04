import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAlarmClock,
    faCircleExclamationCheck,
    faHourglass,
    faListCheck,
    faListTree,
    faLocationDot,
    faStar,
} from '@fortawesome/pro-duotone-svg-icons';

import useWindowInnerWidth from '../../../hooks/useWindowInnerWidth';
import { Category } from '../../../models/task-models/Category';
import { Importance, Status } from '../../../models/task-models/Status';
import {
    getDurationFormat,
    getEventDateTimeFormat,
} from '../../../utilities/date-utils/date-format';
import { getInitialExpandMode, MOBILE_BREAKPOINT } from '../../../utilities/device-util';
import ItemCardButtons from '../buttons/ItemCardButtons';

interface Props {
    dateTime: Date;
    name: string;
    importance: Importance;
    status: Status;
    duration: number;
    icon: JSX.Element;
    statusToggler: JSX.Element;
    expand?: boolean;
    className?: string;
    category?: Category;
    location?: string;
    parentList?: string;
    onShowDetail(): void;
    onShowEdit(): void;
}

const leftBorderClass = 'sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400';

const ItemCard: React.FC<Props> = (props) => {
    const {
        dateTime,
        name,
        importance,
        status,
        duration,
        category,
        icon,
        statusToggler,
        expand,
        parentList,
        className,
        location,
        onShowDetail,
        onShowEdit,
    } = props;
    const [expandMode, setExpandMode] = useState<boolean>(getInitialExpandMode(expand));

    useWindowInnerWidth({
        breakPoint: MOBILE_BREAKPOINT,
        aboveBreakPointCallback: () => setExpandMode(true),
        belowBreakPointCallback: () => setExpandMode(false),
    });

    const statusClass = 'status-' + status.toLowerCase().replace(' ', '');

    useEffect(() => {
        if (expand !== undefined) setExpandMode(expand);
    }, [expand]);

    return (
        <>
            <article
                className={`relative flex flex-col text-slate-700 gap-3 sm:gap-4 px-2 lg:px-4 pl-3 lg:pl-7 py-2 overflow-hidden bg-slate-50  rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${className}`}
            >
                <div
                    className={`absolute top-0 left-0 w-[1.3%] sm:w-[1.05%] h-full z-0 ${statusClass}-bg`}
                ></div>
                <div className={`pr-[2.5rem] text-slate-500 font-bold text-base`}>
                    <FontAwesomeIcon
                        icon={faAlarmClock}
                        className={`text-slate-900 icon-medium mr-2`}
                    />
                    <time>{getEventDateTimeFormat(dateTime)}</time>
                    <span className={`inline-block ml-4 text-slate-500/90`}>
                        <FontAwesomeIcon icon={faHourglass} className="icon-medium mr-2" />
                        {getDurationFormat(duration)}
                    </span>
                    {statusToggler}
                </div>
                <div>
                    <h3 className={'text-lg sm:text-xl'} onClick={onShowDetail}>
                        {icon}
                        {name}
                    </h3>
                </div>
                {expandMode && (
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
                        {category && (
                            <span
                                className={
                                    'inline-block sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400'
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faListTree}
                                    className={'icon-medium mr-2 text-blue-600/90'}
                                />
                                {category}
                            </span>
                        )}
                        {location && (
                            <span
                                className={
                                    'inline-block sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400'
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className={'icon-medium mr-2 text-sky-600/90'}
                                />
                                {location}
                            </span>
                        )}
                        {parentList && (
                            <span
                                className={
                                    'inline-block sm:pl-5 sm:border-l-[3px] sm:border-l-slate-400'
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faListCheck}
                                    className={'icon-medium mr-2 text-indigo-600/90'}
                                />
                                {parentList}
                            </span>
                        )}
                    </div>
                )}
                <ItemCardButtons onShowDetail={onShowDetail} onShowEdit={onShowEdit} />
            </article>
        </>
    );
};

export default ItemCard;
