import { CalendarFilter, FilterStorage } from './calendar-filter';
import ItemCreate from './item-create/ItemCreateButton';

import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { calendarActions } from '../../../store/redux/calendar-slice';
import Modal from '../../ui/modal/Modal';
import CalendarImportExport from './calendar-import-export/CalendarImportExport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import classes from './CalendarControl.module.scss';
import useWindowInnerWidth from '../../../hooks/useWindowInnerWidth';
import { useEffect } from 'react';
import { checkIsMobile } from '../../../utilities/device-util';

interface Props {
    onInvalidate: () => void;
    beginningPeriod: Date;
}

const SidebarCloseBtn: React.FC<{ onClose(): void }> = ({ onClose }) => (
    <div
        onClick={onClose}
        className="absolute -left-[6rem] top-5 w-[3rem] h-[3rem] rounded-full text-2xl text-gray-600 flex-center bg-white z-60 cursor-pointer transition-all hover:bg-gray-700 hover:text-gray-50"
    >
        <FontAwesomeIcon icon={faXmark} />
    </div>
);

const LAYOUT_BREAK_POINT = 1250;

const CalendarControl: React.FC<Props> = (props) => {
    const { onInvalidate, beginningPeriod } = props;

    const dispatch = useAppDispatch();
    const showSidebar = useAppSelector((state) => state.calendar.showSidebar);

    useWindowInnerWidth({
        breakPoint: LAYOUT_BREAK_POINT,
        aboveBreakPointCallback: () => dispatch(calendarActions.setShowSidebar(true)),
        belowBreakPointCallback: () => dispatch(calendarActions.setShowSidebar(false)),
    });

    useEffect(() => {
        const showSidebar = window.innerWidth > 1250;
        dispatch(calendarActions.setShowSidebar(showSidebar));
    }, [dispatch]);

    const content = (
        <>
            <ItemCreate
                onInvalidate={onInvalidate}
                beginningPeriod={beginningPeriod}
                className={classes['item-create']}
            />
            <nav className="max-h-[44.5rem] flex-1 flex flex-col gap-1 border-t-2 lg:border-slate-200">
                <CalendarImportExport
                    beginningPeriod={beginningPeriod}
                    onInvalidate={onInvalidate}
                />
                <CalendarFilter />
            </nav>
        </>
    );

    return (
        <>
            {/* Modal control sidebar in the small screens */}
            {showSidebar && (
                <Modal
                    onClose={() => {}}
                    modalClass={classes.modal}
                    backdropClass={classes.backdrop}
                >
                    <SidebarCloseBtn
                        onClose={() => dispatch(calendarActions.setShowSidebar(false))}
                    />
                    <section
                        className={`xl:min-w-[10rem] pr-3 -mt-[.47rem] flex flex-col gap-3 ${classes['calendar-control']}`}
                    >
                        {content}
                    </section>
                </Modal>
            )}
            {/* Normal component sidebar in the large screens */}
            {showSidebar && (
                <div className="control-container-parent relative">
                    <div className={`${classes['control-container']}`}>
                        <section
                            className={`flex-1 xl:min-w-[10rem] pr-3 -mt-[.47rem] flex flex-col gap-3 ${classes['calendar-control']}`}
                        >
                            {content}
                        </section>
                    </div>
                </div>
            )}
            <FilterStorage />
        </>
    );
};

export default CalendarControl;
