import { useWTableContext } from '../../../store/context/weekday-table-context';
import { generateDayTimeLine } from '../../../utilities/date-utils/timeline-util';

const DayTimeLine: React.FC = () => {
    const timeLines: string[] = generateDayTimeLine();
    const { getTopOffset, getCellHeight } = useWTableContext();

    return (
        <div
            className={`w-full h-full text-slate-500/90 border-r-2 border-r-slate-300 text-[0.9rem]`}
        >
            {timeLines.map((timeLine, idx) => {
                const offsetIndex = idx + 1; // starts at 1am so offset 1 is required
                const topOffset = getTopOffset(offsetIndex);
                const height: string = getCellHeight(offsetIndex);

                return (
                    <div
                        key={idx}
                        className={`absolute w-full border-b-2 border-slate-300`}
                        style={{ top: topOffset, height }}
                    >
                        <time
                            className={`py-2 px-1 flex text-center w-[2.5rem] h-full border-r-2 border-slate-300 pr-1`}
                        >
                            {timeLine}
                        </time>
                    </div>
                );
            })}
        </div>
    );
};

export default DayTimeLine;
