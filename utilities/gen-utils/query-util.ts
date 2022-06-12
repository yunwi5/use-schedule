export function getBooleanQueryParam(queryParam: string | string[] | undefined): boolean {
    const queryString = Array.isArray(queryParam) ? queryParam.join('') : queryParam;
    const queryBool: boolean = queryString?.toLowerCase().trim() === 'true';
    return queryBool;
}
