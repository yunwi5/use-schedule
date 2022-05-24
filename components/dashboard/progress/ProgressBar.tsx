import React from 'react';

import { ChartData } from '../../../models/analyzer-models/helper-models';
import { round } from '../../../utilities/gen-utils/calc-util';
import classes from './ProgressBar.module.scss';

interface Props {
    progressArray: ChartData[];
}

const ProgressBar: React.FC<Props> = ({ progressArray }) => {
    const total = progressArray.reduce((acc, data) => acc + data.value, 0);
    return (
        <div className="py-2 px-0 sm:px-1 md:px-3 lg:px-6 xl:px-9 flex flex-col gap-10">
            {/* Bar */}
            <div className="flex h-[2rem] sm:h-[2.5rem] w-full shadow-md">
                {progressArray.map((chartData) => {
                    const { backgroundColor: bgc, borderColor: bc, label, value } = chartData;
                    const backgroundColor = `#${bgc}`;
                    const borderColor = `#${bc}`;
                    const proportion = (value / total) * 100;
                    const rounded = round(proportion, 1);

                    const style = {
                        backgroundColor,
                        borderColor,
                        width: `${proportion}%`,
                    };
                    return (
                        <div
                            key={chartData.label}
                            className={`flex justify-center items-center text-sm cursor-pointer text-gray-500 font-semibold ${
                                classes['bar-proportion']
                            } ${classes[`status-${label.split(' ').join('')}`]}`}
                            style={style}
                        >
                            <span className={`hidden sm:inline-block`}>
                                {rounded > 0 ? `${rounded}%` : ''}
                            </span>
                            <div className={classes['proportion-label']}>
                                {value} {label}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Lagend */}
            <ul className={`flex flex-wrap gap-2 sm:gap-4 justify-center items-center`}>
                {progressArray.map((chartData) => {
                    const { backgroundColor: bgc, borderColor: bc, label, value } = chartData;
                    const backgroundColor = `#${bgc}`;
                    const borderColor = `#${bc}`;
                    const style = { backgroundColor, borderColor };
                    return (
                        <li key={chartData.label} className={`flex gap-2 items-center`}>
                            <div
                                className={`w-[1.4rem] sm:w-[2rem] h-[1.2rem] ${
                                    classes['status-color-label']
                                } ${classes[`status-${label.split(' ').join('')}`]}`}
                                style={style}
                            ></div>
                            <p>{label}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProgressBar;
