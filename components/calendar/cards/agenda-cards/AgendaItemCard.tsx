import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
import {
    faCalendarCheck,
    faDiagramNested,
    faHourglass,
    faListTree,
    faLocationDot,
    faMagnifyingGlass,
    faPenToSquare,
    faStarExclamation,
} from '@fortawesome/pro-duotone-svg-icons';

import { CalendarItem } from '../../../../models/calendar-models/CalendarItem';
import { CalendarItemType, getItemIcon } from '../../../../models/calendar-models/CalendarItemType';
import { Importance, Status } from '../../../../models/task-models/Status';
import {
    getDurationFormat,
    getLongUserTimeFormat,
} from '../../../../utilities/date-utils/date-format';
import { useAppSelector } from '../../../../store/redux';
import DropDownToggler from '../../../ui/icons/DropDownToggler';

interface Props {
    item: CalendarItem;
    itemType: CalendarItemType;
    status: Status;
    importance: Importance;
    location?: string;
    category?: string;
    subCategory?: string;
    onShowDetail(): void;
    onShowEdit(): void;
}

const AgendaItemCard: React.FC<Props> = (props) => {
    const {
        item,
        itemType,
        status,
        importance,
        location,
        category,
        subCategory,
        onShowEdit,
        onShowDetail,
    } = props;
    const [showDropdownDetail, setShowDropdownDetail] = useState(false);
    const externalShowDropdown: boolean = useAppSelector(
        (state) => state.calendar.showAgendaDropdown,
    );

    useEffect(() => {
        setShowDropdownDetail(externalShowDropdown);
    }, [externalShowDropdown]);

    if (!item.dateTime) return <span />;

    const calendarIcon = getItemIcon(itemType);
    const iconColor =
        itemType === CalendarItemType.EVENT
            ? 'text-sky-600/75'
            : itemType === CalendarItemType.TASK
            ? 'text-blue-600/75'
            : 'text-indigo-500/75';

    const bgColor = 'bg-slate-50';
    const iconClass = `inline-block mr-2 max-w-[1.5rem] ${iconColor}`;

    const toggleDropdown = () => setShowDropdownDetail((prevState) => !prevState);

    return (
        <li className="flex flex-col gap-2">
            <div className={`flex items-center`}>
                <span className={`text-xl ${iconColor}`}>{calendarIcon}</span>
                <time
                    className={`ml-2 md:ml-4 font-semibold text-slate-400 min-w-[5.7rem] w-[5.7rem]`}
                >
                    {getLongUserTimeFormat(item.dateTime)}
                </time>
                <h5
                    className="ml-3 md:ml-6 font-semibold text-slate-500 cursor-pointer"
                    onClick={onShowDetail}
                >
                    {item.name}
                </h5>
                <DropDownToggler
                    onToggle={toggleDropdown}
                    showDropDown={showDropdownDetail}
                    className={iconClass}
                />
            </div>
            {showDropdownDetail && (
                <div
                    className={`pl-2 sm:pl-11 pt-1 pb-2 border-b-2 border-slate-300 flex items-center ${bgColor}`}
                >
                    <div className="flex gap-3 md:gap-6 flex-wrap mr-4 lg:flex-nowrap">
                        <div>
                            <FontAwesomeIcon icon={faCalendarCheck} className={`${iconClass}`} />
                            {status}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faStarExclamation} className={`${iconClass}`} />
                            {importance}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faHourglass} className={`${iconClass}`} />
                            <time>{getDurationFormat(item.duration || 0)}</time>
                        </div>
                        {location && (
                            <div>
                                <FontAwesomeIcon icon={faLocationDot} className={`${iconClass}`} />
                                <span>{location}</span>
                            </div>
                        )}
                        {category && (
                            <div>
                                <FontAwesomeIcon icon={faListTree} className={`${iconClass}`} />
                                <span>{category}</span>
                            </div>
                        )}
                        {subCategory && (
                            <div className="hidden md:block">
                                <FontAwesomeIcon
                                    icon={faDiagramNested}
                                    className={`${iconClass}`}
                                />
                                <span>{subCategory}</span>
                            </div>
                        )}
                    </div>
                    <div className="ml-auto flex gap-2">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={`${iconClass} text-xl !text-blue-500 transition-all hover:text-blue-700 hover:scale-110 cursor-pointer`}
                            onClick={onShowDetail}
                        />
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={`${iconClass} text-xl !text-pink-500 transition-all hover:text-pink-700 hover:scale-110 cursor-pointer`}
                            onClick={onShowEdit}
                        />
                    </div>
                </div>
            )}
        </li>
    );
};

export default AgendaItemCard;
