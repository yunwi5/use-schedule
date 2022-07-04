import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getImportanceName } from '../../../../models/task-models/Status';
import { getTemplateTasksById } from '../../../../lib/templates/templates-api';
import { Template } from '../../../../models/template-models/Template';
import { ITemplateInfo } from '../../../../models/template-models/TemplateInfo';
import { useAppSelector } from '../../../../store/redux';
import { getTotalDuration } from '../../../../utilities/gen-utils/calc-util';
import { getNewTemplateLink, getTemplateTableLink } from '../../../../utilities/link-utils';
import TableCard from '../../cards/TableCard';
import TemplateRow from './TemplateRow';
import LoadingSpinner from '../../../ui/design-elements/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faLightbulbOn } from '@fortawesome/pro-duotone-svg-icons';
import CustomMUIButton from '../../../ui/buttons/CustomMUIButton';

const generateTaskInformationOfTemplates = async (templates: Template[]) => {
    const templateTaskInfoPromises = templates.map((template) => {
        const templateTaskPromise = getTemplateTasksById(template.id);
        return templateTaskPromise;
    });

    const templateTaskInfoArray = await Promise.all(templateTaskInfoPromises);
    const templateInfoArray: ITemplateInfo[] = templateTaskInfoArray.map(
        (templateTaskInfo, idx) => {
            const { message, tasks } = templateTaskInfo;
            const id: string = templates[idx].id;
            const name: string = templates[idx].name;
            const importance = getImportanceName(templates[idx].importance);
            if (!tasks) {
                console.warn('Template tasks have not been returned.');
                console.warn(message);
                return {
                    id,
                    name,
                    importance,
                    taskCount: 0,
                    totalDuration: 0,
                };
            }
            const totalDuration = getTotalDuration(tasks);
            return {
                id,
                name,
                importance,
                taskCount: tasks.length,
                totalDuration,
            };
        },
    );
    return templateInfoArray;
};

const UserRecommendation: React.FC = () => (
    <tr className="h-full flex flex-col justify-center items-center">
        <td className="flex flex-col gap-3" rowSpan={2}>
            <span className={'text-xl text-slate-600'}>
                <FontAwesomeIcon icon={faLightbulbOn} className="text-blue-500 mr-2" />
                You have to template tables yet
            </span>
            <CustomMUIButton>
                <Link href={getNewTemplateLink()}>Make One!</Link>
            </CustomMUIButton>
        </td>
    </tr>
);

const TemplateTable = () => {
    const templateTables: Template[] = useAppSelector((state) => state.template.templates);
    const router = useRouter();
    const [templateInfoArray, setTemplateInfoArray] = useState<ITemplateInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        generateTaskInformationOfTemplates(templateTables).then((templateInfoArr) => {
            setTemplateInfoArray(templateInfoArr);
            setIsLoading(false);
        });
    }, [templateTables]);

    const templateNavigationHandler = (templateId: string) => {
        const templateLink = getTemplateTableLink(templateId);
        router.push(templateLink);
    };

    // user has no template tables so display suggestion to make one
    const userHasNone = !isLoading && templateInfoArray.length === 0;

    return (
        <TableCard className={`xl:w-[70%] min-h-[10rem] overflow-hidden !border-0`}>
            {isLoading && (
                <div className="flex-center">
                    <LoadingSpinner />
                </div>
            )}
            <table className={`w-full h-full flex flex-col`}>
                <thead>
                    <tr className={`flex text-base lg:text-lg bg-blue-100 text-slate-600/90`}>
                        <th
                            className={`basis-2/4 sm:basis-4/12 font-semibold hover:bg-blue-200 py-2`}
                        >
                            <span className={`hidden sm:inline`}>
                                <FontAwesomeIcon
                                    icon={faCalendarWeek}
                                    className={`icon-medium text-xl text-blue-600/90 mr-2`}
                                />
                                Weeky
                            </span>{' '}
                            Time Tables
                        </th>
                        <th
                            className={`hidden sm:inline-block basis-3/12 font-semibold hover:bg-blue-200 py-2`}
                        >
                            Importance
                        </th>
                        <th
                            className={`basis-1/4 sm:basis-2/12 font-semibold hover:bg-blue-200 py-2`}
                        >
                            Tasks
                        </th>
                        <th
                            className={`basis-1/4 sm:basis-3/12 font-semibold hover:bg-blue-200 py-2`}
                        >
                            <span className={`hidden sm:inline`}>Total</span> Duration
                        </th>
                    </tr>
                </thead>
                <tbody
                    className={`flex-1 max-h-[20rem] overflow-x-auto overflow-y-scroll hide-scrollbar`}
                >
                    {templateInfoArray.map((templateInfo) => (
                        <TemplateRow
                            key={templateInfo.id}
                            templateInfo={templateInfo}
                            onNavigate={() => templateNavigationHandler(templateInfo.id)}
                        />
                    ))}
                    {userHasNone && <UserRecommendation />}
                </tbody>
            </table>
        </TableCard>
    );
};

export default TemplateTable;
