import React from 'react';
import { ITemplateInfo } from '../../../../models/template-models/TemplateInfo';
import { getShortDurationFormat } from '../../../../utilities/date-utils/date-format';

interface Props {
    templateInfo: ITemplateInfo;
    onNavigate(): void;
}

const TemplateRow: React.FC<Props> = ({ templateInfo, onNavigate }) => {
    return (
        <tr
            key={templateInfo.id}
            className={`flex text-base lg:text-lg bg-gray-50 transition-all hover:bg-slate-200 hover:scale-105 hover:shadow-md hover:-translate-y-1  cursor-pointer text-slate-600/90`}
            onClick={onNavigate}
        >
            <td
                className={`basis-2/4 sm:basis-4/12 py-1 flex justify-center whitespace-nowrap overflow-hidden`}
            >
                {templateInfo.name}
            </td>
            <td className={`hidden sm:flex basis-3/12 py-1 justify-center`}>
                {templateInfo.importance}
            </td>
            <td className={`basis-1/4 sm:basis-2/12 py-1 flex justify-center`}>
                {templateInfo.taskCount}
            </td>
            <td className={`basis-1/4 sm:basis-3/12 py-1 flex justify-center`}>
                {getShortDurationFormat(templateInfo.totalDuration)}
            </td>
        </tr>
    );
};

export default TemplateRow;
