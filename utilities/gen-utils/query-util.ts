import { PlannerMode } from '../../models/planner-models/PlannerMode';

export function getRecurringPatchQueryParam(patchGenerated?: boolean, plannerMode?: PlannerMode) {
    if (plannerMode) return `plannerMode=${plannerMode}&${patchGenerated && 'patchGenerated=true'}`;
    return `${patchGenerated && 'patchGenerated=true'}`;
}

export function getRecurringDeleteQueryParam(deleteGenerated?: boolean, plannerMode?: PlannerMode) {
    if (plannerMode)
        return `plannerMode=${plannerMode}&${deleteGenerated && 'deleteGenerated=true'}`;
    return `${deleteGenerated && 'deleteGenerated=true'}`;
}

export function parseBooleanQueryParam(queryParam: string | string[] | undefined): boolean {
    const queryString = Array.isArray(queryParam) ? queryParam.join('') : queryParam;
    const queryBool: boolean = queryString?.toLowerCase().trim() === 'true';
    return queryBool;
}
