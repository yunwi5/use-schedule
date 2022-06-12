import React from 'react';
import {
    faHourglass,
    faLocationDot,
    faMagnifyingGlass,
    faPenToSquare,
    faStar,
    faTimer,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RecurringItem } from '../../../models/recurring-models';
import { getDurationFormat } from '../../../utilities/date-utils/date-format';

interface Props {
    item: RecurringItem;
    onShowDetail(): void;
    onShowEdit(): void;
    icon: JSX.Element;
    location?: string;
}

const RecurringItemCard: React.FC<Props> = (props) => {
    const { item, icon, location, onShowDetail, onShowEdit } = props;
    return (
        <li
            className={`relative flex flex-col text-slate-700 gap-3 px-2 lg:px-3 lg:pl-5 py-2 bg-sky-50 rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
        >
            <div className={`text-slate-500 font-bold`}>
                <FontAwesomeIcon icon={faTimer} className={`text-slate-900 icon-medium mr-2`} />
                <time>{item.intervalFormat}</time>
                <span className={`inline-block ml-4 text-slate-500/90`}>
                    <FontAwesomeIcon icon={faHourglass} className="icon-medium mr-2" />
                    {getDurationFormat(item.duration)}
                </span>
            </div>
            <div>
                <h3 className={'text-xl'}>
                    <span className={`text-sky-600`}>{icon}</span>
                    {item.name}
                </h3>
            </div>
            {/* <div className={`flex items-center gap-5 text-lg overflow-hidden`}>
                <span className={'inline-block pr-5 border-r-[3px] border-r-slate-400'}>
                    <FontAwesomeIcon icon={faStar} className={'icon-medium text-amber-500'} />{' '}
                    {item.importance}
                </span>
                {location && (
                    <span className={'inline-block'}>
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className={'icon-medium mr-2 text-sky-600/90'}
                        />
                        {location}
                    </span>
                )}
            </div> */}
            <div className={'absolute flex gap-1 bottom-2 right-2 bg-inherit z-10 text-2xl'}>
                <div
                    className={
                        'show-on-hover-parent flex items-center gap-2 px-2 py-1 hover:border-2 border-blue-400 rounded-sm hover:bg-blue-100/80'
                    }
                    onClick={onShowDetail}
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className={`icon-medium text-blue-500 transition-all hover:scale-110`}
                    />
                    <span className={'show-on-hover-child text-lg text-blue-800'}>Detail</span>
                </div>
                <div
                    className={
                        'show-on-hover-parent flex items-center gap-2 px-2 py-1 hover:border-2 border-pink-400 rounded-sm hover:bg-pink-100/80'
                    }
                    onClick={onShowEdit}
                >
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={`icon-medium text-pink-500 transition-all hover:scale-110`}
                    />
                    <span className={'show-on-hover-child text-lg text-pink-800'}>Detail</span>
                </div>
            </div>
        </li>
    );
};

export default RecurringItemCard;
