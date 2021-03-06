import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHourglass,
    faListTree,
    faLocationDot,
    faStar,
    faTimer,
} from '@fortawesome/pro-duotone-svg-icons';

import { RecurringItem, RecurringItemMode } from '../../../models/recurring-models';
import { getDurationFormat } from '../../../utilities/date-utils/date-format';
import { useAppSelector } from '../../../store/redux';
import ItemCardButtons from '../../ui/buttons/ItemCardButtons';

interface Props {
    item: RecurringItem;
    onShowDetail(): void;
    onShowEdit(): void;
    icon: JSX.Element;
    location?: string;
    category?: string;
}

const RecurringItemCard: React.FC<Props> = (props) => {
    const { item, icon, location, onShowDetail, onShowEdit, category } = props;

    const { mode, showDetail } = useAppSelector((state) => state.recurring);

    return (
        <li
            className={`relative flex flex-col text-slate-700 gap-3 px-2 lg:px-3 lg:pl-5 py-2 ${
                mode === RecurringItemMode.EVENT ? 'bg-sky-50' : 'bg-blue-50'
            }  rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
        >
            <div className={`text-slate-500 font-bold text-base`}>
                <FontAwesomeIcon
                    icon={faTimer}
                    className={`text-slate-900 icon-medium mr-2`}
                />
                <time>{item.intervalFormat}</time>
                <span className={`inline-block ml-4 text-slate-500/90`}>
                    <FontAwesomeIcon icon={faHourglass} className="icon-medium mr-2" />
                    {getDurationFormat(item.duration)}
                </span>
            </div>
            <div>
                <h3 className={'text-lg sm:text-xl'} onClick={onShowDetail}>
                    <span className={`text-sky-600`}>{icon}</span>
                    {item.name}
                </h3>
            </div>
            {showDetail && (
                <div
                    className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 text-base sm:text-lg overflow-hidden`}
                >
                    <span className={'inline-block'}>
                        <FontAwesomeIcon
                            icon={faStar}
                            className={'icon-medium text-amber-500'}
                        />{' '}
                        {item.importance}
                    </span>
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
                </div>
            )}
            <ItemCardButtons onShowDetail={onShowDetail} onShowEdit={onShowEdit} />
        </li>
    );
};

export default RecurringItemCard;
